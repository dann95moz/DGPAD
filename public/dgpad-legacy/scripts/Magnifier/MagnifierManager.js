function MagnifierManager(_canvas) {
    var me = this;
    var magnifierPanel = null;
    var monkeyPanel = null;
    me.setMagnifierMode = function(_magn) {
        if (_magn && !magnifierPanel) {
            magnifierPanel = new MagnifierPanel(_canvas);
            magnifierPanel.show();
        } else if (!_magn && magnifierPanel) {
            magnifierPanel.close();
            magnifierPanel = null;
        }
    };
	me.setMonkeyMode = function(_magn) {
        if (_magn && !monkeyPanel) {
            monkeyPanel = new MonkeyPanel(_canvas);
            monkeyPanel.show();
        } else if (!_magn && monkeyPanel) {
            monkeyPanel.close();
            monkeyPanel = null;
        }
    };
    me.getMagnifierMode = function() {
        return (magnifierPanel !== null);
    };
	me.getMonkeyMode = function() {
        return (monkeyPanel !== null);
    };
    me.hide = function() {
        if (magnifierPanel) magnifierPanel.setStyle("visibility", "hidden");
        if (monkeyPanel) monkeyPanel.setStyle("visibility", "hidden");
    };
    me.show = function() {
        if (magnifierPanel) magnifierPanel.setStyle("visibility", "visible");
        if (monkeyPanel) monkeyPanel.setStyle("visibility", "visible");
    };
    me.magnifierPaint = function(coords) {
        if (magnifierPanel) {
            magnifierPanel.magnifierPaint(coords);
        }
    };
    me.setMagnifierMode(Object.touchpad);
}
