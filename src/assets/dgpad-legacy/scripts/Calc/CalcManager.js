function CalcManager(_canvas) {
    var me = this;
    var canvas = _canvas;
    var maincalc = null;
    var digitcalc = null;
    var externalPanel = false;

    var notifyParent = function() {
        if (externalPanel && window.parent !== window) window.parent.postMessage({ type: "dgpad-calculator-state" }, window.location.origin);
    };


    me.keypressed = function(ev) {
        var target = ev.target || ev.srcElement;
        maincalc.insertText(target.txt);
    };


    // On a cliqué sur l'icône Macro :
    me.showPanel = function() {
        if (!maincalc) {
            maincalc = new MainCalcPanel(me, canvas);
            digitcalc = new DigitCalcPanel(me, canvas);
            if (externalPanel) {
                maincalc.setStyle("display", "none");
                digitcalc.setStyle("display", "none");
            }
        }
    };

    me.hidePanel = function() {
        if (maincalc) {
            maincalc.close();
            digitcalc.close();
            maincalc = null;
            digitcalc = null;
        }
    };

    me.getCustomKB = function() {
        return digitcalc;
    };

    me.activateBtns = function(_b) {
        digitcalc.activateBtns(_b);
    };

    me.edit = function(_obj) {
        maincalc.edit(_obj);
        notifyParent();
    };

    me.setExternalPanel = function(_value) { externalPanel = !!_value; };
    me.getExternalState = function() { return maincalc ? maincalc.getExternalState() : null; };
    me.ensureExternalObject = function() { if (maincalc) { maincalc.ensureExternalObject(); notifyParent(); } };
    me.setExternalField = function(_field, _value) { if (maincalc) { maincalc.setExternalField(_field, _value); notifyParent(); } };
    me.setExternalDegrees = function(_value) { if (maincalc) maincalc.setExternalDegrees(_value); notifyParent(); };
    me.validateExternal = function() { if (maincalc) maincalc.valid(); notifyParent(); };
    me.cancelExternal = function() { if (maincalc) maincalc.cancel(); notifyParent(); };

}
