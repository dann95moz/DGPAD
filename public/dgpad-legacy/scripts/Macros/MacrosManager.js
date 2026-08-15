/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function MacrosManager(_canvas) {
    var me = this;
    var canvas = _canvas;
    // Macros de bibliothèque :
    var plugins = [];
    // Macros personnelles :
    var tools = [];
    var currentTool = null;
    var macroPanel = null;
    var externalPanel = false;
    var draft = null;
    var activeExternal = null;

    var notifyParent = function(type) {
        if (externalPanel && window.parent !== window) {
            window.parent.postMessage({ type: type }, window.location.origin);
        }
    };

    var macrosSortFilter = function(a, b) {
        if (a.name.toUpperCase() < b.name.toUpperCase())
            return -1;
        else if (a.name === b.name)
            return 0;
        else
            return 1;
    };

    //Modificación para controlar cuáles macros se cargan
	var loadPluginsList = function() {
		
        for (var i = 0, len = plugins.length; i < len; i++) {
			pos= canvas.gethidePlugins().indexOf(plugins[i].id);
            
			if (pos===-1) {
				macroPanel.addPlugins(plugins[i]);
			}
        }
        macroPanel.showPlugins();
    };
    //fin MEAG
    var loadToolsList = function() {
        tools.sort(macrosSortFilter);
        for (var i = 0, len = tools.length; i < len; i++) {
            macroPanel.addTool(tools[i]);
        }
        macroPanel.addBlankLI();
        macroPanel.showTools();
    };


    me.clearTools = function() {
        tools = [];
    };

    me.refreshToolList = function() {
        if (macroPanel) {
            macroPanel.clearToolList();
            loadToolsList();
        }
        notifyParent("dgpad-macro-catalog");
    };

    me.refreshMacro = function() {
        if (currentTool)
            currentTool.tagPossibleInitials();
    }

    // Pour l'execution de macros :
	// Para la ejecución de macros:
    var startMacro = function(_li, _m) {
        if (currentTool === _m) {
            me.endMacro();
        } else {
            currentTool = _m;
            canvas.getConstruction().setMode(5);
            _m.init(_li, canvas.getConstruction());
            canvas.paint();
        }
    };

    me.endMacro = function() {
        currentTool = null;
        activeExternal = null;
        notifyParent("dgpad-macro-progress");
        if (macroPanel) macroPanel.deselectMacros();
        canvas.getConstruction().setMode(4);
        canvas.paint();
    };

    me.addParam = function(_n) {
        if (currentTool) {
            currentTool.addParam(_n);
        }
    };

    //Pour la construction de macros :
	//Para la construcción de macros:
    me.refreshConstructionPanel = function(_p, _t, _e) {
        //        console.log(_p.length+_e);
        if (_p.length === 0) {
            if (macroPanel) macroPanel.hideMacroProps();
            draft = null;
            notifyParent("dgpad-macro-draft");
            return;
        }
        draft = { params: _p.slice(), targets: _t.slice(), exec: _e };
        if (externalPanel) {
            notifyParent("dgpad-macro-draft");
            return;
        }
        macroPanel.showMacroProps();
        macroPanel.refreshConstructionPanel(_p, _t, _e);
    };


    // On a cliqué sur l'icône Macro :
	// al hacer clic sobre el icono Macro:
    me.showPanel = function() {
        currentTool = null;
        if (externalPanel) {
            notifyParent("dgpad-macro-catalog");
            return;
        }
        if (!macroPanel) {
            macroPanel = new MacroPanel(canvas, startMacro);
            loadPluginsList();
            loadToolsList();
        } else {
            macroPanel.deselectMacros();
        }
    };

    me.hidePanel = function() {
        if (macroPanel) {
            macroPanel.close();
            macroPanel = null;
        }
    };

    me.setExternalPanel = function(_value) {
        externalPanel = !!_value;
        if (externalPanel && macroPanel) {
            macroPanel.close();
            macroPanel = null;
        }
    };

    me.getCatalog = function() {
        var hidden = canvas.gethidePlugins ? (canvas.gethidePlugins() || []) : [];
        var pluginItems = [];
        var toolItems = [];

        for (var i = 0; i < plugins.length; i++) {
            if (hidden.indexOf(plugins[i].id) === -1) {
                pluginItems.push({ key: "plugin:" + i, name: plugins[i].name });
            }
        }
        for (var j = 0; j < tools.length; j++) {
            toolItems.push({ key: "tool:" + j, name: tools[j].name });
        }
        return { plugins: pluginItems, tools: toolItems };
    };

    me.startExternal = function(_key) {
        var parts = _key.split(":");
        var list = parts[0] === "plugin" ? plugins : tools;
        var macro = list[parseInt(parts[1], 10)];
        if (!macro) return;

        activeExternal = {
            key: _key,
            name: macro.shortname,
            prompt: "",
            types: macro.getParamTypes ? macro.getParamTypes() : []
        };
        var label = {};
        Object.defineProperty(label, "innerHTML", {
            set: function(_html) {
                if (!activeExternal || activeExternal.key !== _key) return;
                var plain = String(_html)
                    .replace(/<[^>]*>/g, " ")
                    .replace(/\s+/g, " ")
                    .trim();
                if (plain.indexOf(macro.shortname) === 0) {
                    plain = plain.substring(macro.shortname.length).replace(/^\s*:\s*/, "");
                }
                activeExternal.prompt = plain;
                notifyParent("dgpad-macro-progress");
            },
            get: function() { return activeExternal ? activeExternal.prompt : ""; }
        });
        var fakeLi = { macro: macro, o: function() { return label; } };
        startMacro(fakeLi, macro);
    };

    me.getActiveExternal = function() {
        if (!activeExternal) return null;
        return {
            key: activeExternal.key,
            name: activeExternal.name,
            prompt: activeExternal.prompt,
            types: activeExternal.types.slice()
        };
    };

    me.getDraft = function() {
        if (!draft) return null;
        return { params: draft.params.slice(), targets: draft.targets.slice() };
    };

    me.saveDraft = function(_name) {
        if (!draft || !_name) return;
        var codes = [];
        var cn = canvas.getConstruction();
        for (var i = 0; i < draft.params.length; i++) {
            var obj = cn.find(draft.params[i]);
            if (obj) codes.push(obj.getFamilyCode());
        }
        me.addTool(_name, codes, draft.exec);
        cn.clearMacroMode();
        canvas.paint();
        draft = null;
        notifyParent("dgpad-macro-draft");
        notifyParent("dgpad-macro-catalog");
    };

    me.addTool = function(_n, _p, _e) {
        var m = new Macro(canvas, _n, _p, _e);
        tools.push(m);
        return m;
    };
    
    me.addPlugin = function(_n, _p, _e, _id) {
        var m = new Macro(canvas, _n, _p, _e, _id);
        plugins.push(m);
        return m;
    };


    me.getSource = function() {
        if (tools.length === 0)
            return "";
        var txt = "// Macros :\n";
        txt += "$macros={};\n";
        for (var i = 0, len = tools.length; i < len; i++) {
            txt += "$macros[\"" + $U.leaveAccents(tools[i].name) + "\"]={\n";
            txt += tools[i].getSource();
            txt += "};\n\n";
        }
        return txt;
    };

};
