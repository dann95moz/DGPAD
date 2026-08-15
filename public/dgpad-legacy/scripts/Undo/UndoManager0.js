

function UndoManager(_canvas) {
    var canvas = _canvas;
    var Cn = canvas.getConstruction();
    var actions = [];
    var cursor = 0;
    var me = this;
    var Cmarker = null;
    var Tmarker = null;

    var ADD = true, REMOVE = false;

    var isLeft = function() {
        return (cursor === 0);
    };

    var isRight = function() {
        return (cursor === actions.length);
    };

    var refreshCanvas = function() {
        var simulatedEvent = document.createEvent("MouseEvent");
        simulatedEvent.initMouseEvent("mouseup", true, true, window, 1, -100, -100, -100, -100, false,
            false, false, false, 0, null);
        Cn.validate(simulatedEvent);
        Cn.computeAll();
        canvas.paint(simulatedEvent);
        me.setBtns();
    };

    var add = function(_o) {
        var _el = _o;
        if (_o instanceof TextObject) {
            _el = canvas.textManager.add(_o);
        } else {
            Cn.add(_o);
            _o.setParentList(_o.getParent());
        }
        return _el;
    };

    var remove = function(_o) {
        if (_o instanceof TextObject) {
            canvas.textManager.deleteTeX(_o);
        } else {
            Cn.remove(_o);
        }
    };

    me.clear = function() {
                actions = [];
                cursor = 0;
                refreshCanvas();
            };

    var undo_redo = function(k) {
        var t = actions[k]; // Obtenemos la acción en el índice `k`
        var tab = ($U.isArray(t.target)) ? t.target : [t.target]; // Aseguramos que `t.target` sea un array
        var len = tab.length;
        
        // Recorremos los elementos de la acción
        for (var i = 0; i < len; i++) {
            if (t.add) {
                // Si la acción fue agregar, al deshacer se elimina
                remove(tab[i]);
            } else {
                // Si la acción fue eliminar, al deshacer se agrega
                tab[i] = add(tab[i]);
            }
        }
        
        // Invertimos el estado de la acción
        t.add = !t.add; 
    };

    this.swap = function(_o) {
        for (var i = 0; i < actions.length; i++) {
            var tab = ($U.isArray(actions[i].target)) ? actions[i].target : [actions[i].target];
            if ((tab.length === 1) && (tab[0] === _o))
                actions[i].add = !actions[i].add;
        }
    };

    this.record = function(_t, _add) {
        // Limpiar acciones después del cursor si se ha hecho un undo
        if (cursor < actions.length) {
            actions = actions.slice(0, cursor); // Limpiar lo que está adelante del cursor
        }

        // Registrar la acción
        actions.push({
            add: _add,
            target: _t
        });

        // Mover el cursor al final
        cursor++;
        
        // Actualizar los botones
        this.setBtns();
    };

    this.undo = function() {
        if (cursor > 0) {
            cursor--;  // Retrocede el cursor
            undo_redo(cursor);  // Aplica la acción inversa
            refreshCanvas();  // Refresca el canvas para reflejar los cambios
            this.setBtns();  // Actualiza los botones de undo/redo
        }
    };

    this.redo = function() {
        if (cursor < actions.length) {
            undo_redo(cursor); // Ejecuta la acción en la posición actual del cursor
            cursor++; // Mueve el cursor hacia adelante después de aplicar la acción
            refreshCanvas();  // Actualiza el canvas para reflejar los cambios
            this.setBtns();    // Actualiza los botones de deshacer/rehacer
        }
    };

    this.beginAdd = function() {
        Cmarker = Cn.elements().length;
        Tmarker = canvas.textManager.elements().length;
    };

    this.endAdd = function() {
        if ((Cmarker === null) && (Tmarker === null)) return;

        var v = Cn.elements();
        var t = canvas.textManager.elements();
        var elts = [];
        for (var m = Cmarker; m < v.length; m++) {
            elts.push(v[m]);
        }
        for (var m = Tmarker; m < t.length; m++) {
            elts.push(t[m]);
        }
        if (elts.length > 0) {
            this.record(elts, ADD);
        }

        Cmarker = null;
        Tmarker = null;
    };

    this.deleteObjs = function(_t) {
        if (_t.length > 0) {
            this.record(_t, REMOVE);
        }
    };

    this.setBtns = function() {
        canvas.setUndoBtn(cursor > 0);  // Activa deshacer si el cursor no está en el inicio
        canvas.setRedoBtn(cursor < actions.length);  // Activa rehacer si hay acciones por rehacer
    };
}

