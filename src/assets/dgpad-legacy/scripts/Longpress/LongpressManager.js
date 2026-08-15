function LongpressManager(_canvas) {
  var canvas = _canvas;
  var Cn = canvas.getConstruction();
  var me = this;
  var panel = null;
  var x = 0;
  var y = 0;

  var newExp = function(_ex) {
    var OBJ = new ExpressionObject(Cn, "_a", "", "", "", _ex, x, y);
    if (canvas.namesManager.isVisible())
      canvas.namesManager.setName(OBJ);
    else
      OBJ.setName(getName("abcdefghijklmnopqrsuvw"));
    OBJ.setT("");
    var r = Math.random() * 128;
    var g = Math.random() * 128;
    var b = Math.random() * 128;
    OBJ.setRGBColor(r, g, b);
    canvas.addObject(OBJ);
    return OBJ;
  };

  var newList = function(_ex) {
    var OBJ = new ListObject(Cn, "_l", _ex);
    OBJ.setSegmentsSize(0);
    var c = _ex.getColor();
    OBJ.setRGBColor(c.getR(), c.getG(), c.getB());
    canvas.addObject(OBJ);
    return OBJ;
  };

  var getList = function() {
    var cx = Cn.coordsSystem.x(Cn.getWidth() / 2);
    var cy = Cn.coordsSystem.y(Cn.getHeight() / 2);
    var l = Cn.coordsSystem.l(Cn.getHeight()) / 4;
    var L = l * (1 + Math.sqrt(5)) / 2;
    // var str="["+(cx-L/2)+","+(cy-l/2)+"]";
    var t = [
      [cx - L / 2, cy - l / 2],
      [cx + L / 2, cy - l / 2],
      [cx + L / 2, cy + l / 2],
      [cx - L / 2, cy + l / 2],
      [cx - L / 2, cy - l / 2]
    ];
    for (var i = 0; i < t.length; i++) {
      t[i] = "[" + t[i].toString() + "]";
    };
    return "[" + t.toString() + "]";
  };

  var createExp = function() {
    newExp("(1+sqrt(5))/2");
    Cn.compute();
    canvas.paint();
  };

  var createExpPts = function() {
    newList(newExp(getList()));
    Cn.compute();
    canvas.paint();
  };

  var createExpSegs = function() {
    var OBJ = newList(newExp(getList()));
    OBJ.setSegmentsSize(1);
    Cn.compute();
    canvas.paint();
  };

  var createTableroPuntos = function(){
    var OBJ = new ExpressionObject(Cn, "Tablero", "", "", "", "[[0,0],[1,0],[0,1],[1,1]]",x,y);
    canvas.addObject(OBJ);
    var OBJ2 = new ExpressionObject(Cn, "Control", "", "", "", "0",x,y+20);
    canvas.addObject(OBJ2);
    OBJ2.setHidden(true);
    var OBJ3 = new ExpressionObject(Cn, "Script", "", "", "", "var fichas = [];\nvar tablero = GetExpressionValue(\"Tablero\");\nvar tablero2 = tablero.slice();\ntablero2.push([-10, -10]);\n\nvar puntos = me.Z.getConstruction().getAllObjectsFromType(\"point\");\n\nfichas = puntos\n    .filter(function(p) { return p.getName().includes(\"ficha\"); })\n    .map(function(p) { return p.getName(); });\n\nvar fichasEnTablero = [];\n\nif (Control) {\n    var posicionesLibres = [];\n\n    for (var i = 0; i < tablero2.length; i++) {\n        var pos = tablero2[i];\n        var ocupada = false;\n\n        for (var j = 0; j < fichas.length; j++) {\n            var obj = Find(fichas[j]);\n            if (\n                Math.abs(obj.getx() - pos[0]) < 0.0001 &&\n                Math.abs(obj.gety() - pos[1]) < 0.0001\n            ) {\n                ocupada = true;\n                fichasEnTablero[i] = fichas[j];\n                                break;\n            }\n        }\n\n        if (!ocupada) {\n            posicionesLibres.push(pos);\n                        fichasEnTablero[i] = \"null\"; // opcional para mantener misma longitud\n        }\n    }\n\n    SetExpressionValue(\"PosLibres\", posicionesLibres);\n    \n    GLOBAL_SET(\"fichasT\", fichasEnTablero);\n};0",x,y+40);
    canvas.addObject(OBJ3);
    OBJ3.setHidden(true);
    var OBJ4 = new ExpressionObject(Cn, "PosLibres", "", "", "", "[[-10,-10],[0,0],[1,0],[0,1],[1,1]]",x,y+60);
    canvas.addObject(OBJ4);
    OBJ4.setHidden(1);
    var OBJ5 = new ListObject(Cn, "posLibres", OBJ4);
    OBJ5.setSegmentsSize(0);
    OBJ5.setHidden(1);
    canvas.addObject(OBJ5);
    

    var OBJ6 = new PointObject(Cn, "ficha1", x,y-100);
    var OBJ7 = new PointObject(Cn, "ficha2", x,y-200);
    var OBJ8 = new PointObject(Cn, "ficha3", x,y-300);
    var OBJ9 = new PointObject(Cn, "ficha4", x,y-400);

    var dibujaTablero= new PointObject(Cn, "dibujaTablero", -10,-6);

    // ---- helper para IDs únicos ----
function genId() {
  return Math.random().toString(36).slice(2,6) + Date.now().toString(36);
}

// ---- genera el XML del bloque "onlogo" (tortuga) para una ficha dada ----
function turtleXMLForFicha(nombrePunto, etiqueta, lado=0.8, offset=0.4, textDy=-0.2, fill=80) {
  const ids = Array.from({length: 17}, genId);
  // ids[0].. se usan solo para tener IDs únicos en todos los bloques del XML
  return `
    <xml xmlns="http://www.w3.org/1999/xhtml">
      <block type="turtle_pen" id="${ids[0]}" x="9" y="3">
        <field name="PEN">penUp</field>
        <next>
          <block type="turtle_join_pt" id="${ids[1]}">
            <value name="VALUE">
              <shadow type="dgpad_get_point_short_turtle" id="${ids[2]}">
                <field name="NAME">${nombrePunto}</field>
              </shadow>
              <block type="math_arithmetic" id="${ids[3]}">
                <field name="OP">ADD</field>
                <value name="A">
                  <block type="dgpad_get_object_short" id="${ids[4]}">
                    <field name="NAME">${nombrePunto}</field>
                  </block>
                </value>
                <value name="B">
                  <block type="dgpad_pt2d" id="${ids[5]}">
                    <value name="a0"><block type="math_number" id="${ids[6]}"><field name="NUM">${offset}</field></block></value>
                    <value name="a1"><block type="math_number" id="${ids[7]}"><field name="NUM">${offset}</field></block></value>
                  </block>
                </value>
              </block>
            </value>
            <next>
              <block type="turtle_reset_angles" id="${ids[8]}">
                <next>
                  <block type="turtle_pen" id="${ids[9]}">
                    <field name="PEN">penDown</field>
                    <next>
                      <block type="controls_repeat_ext" id="${ids[10]}">
                        <value name="TIMES"><block type="math_number" id="${ids[11]}"><field name="NUM">4</field></block></value>
                        <statement name="DO">
                          <block type="turtle_turn" id="${ids[12]}">
                            <field name="DIR">turnRight</field>
                            <value name="VALUE"><shadow type="turtle_angle_input" id="${ids[13]}"><field name="ANGLE">90</field></shadow></value>
                            <next>
                              <block type="turtle_move" id="${ids[14]}">
                                <field name="DIR">moveForward</field>
                                <field name="UNITS">un</field>
                                <value name="VALUE"><shadow type="math_number" id="${ids[15]}"><field name="NUM">${lado}</field></shadow></value>
                              </block>
                            </next>
                          </block>
                        </statement>
                        <next>
                          <block type="turtle_fill" id="${ids[16]}">
                            <value name="OP"><shadow type="math_number" id="${genId()}"><field name="NUM">${fill}</field></shadow></value>
                            <next>
                              <block type="turtle_pen" id="${genId()}">
                                <field name="PEN">penUp</field>
                                <next>
                                  <block type="turtle_join_pt" id="${genId()}">
                                    <value name="VALUE">
                                      <shadow type="dgpad_get_point_short_turtle" id="${genId()}">
                                        <field name="NAME">${nombrePunto}</field>
                                      </shadow>
                                      <block type="math_arithmetic" id="${genId()}">
                                        <field name="OP">ADD</field>
                                        <value name="A">
                                          <block type="dgpad_get_object_short" id="${genId()}">
                                            <field name="NAME">${nombrePunto}</field>
                                          </block>
                                        </value>
                                        <value name="B">
                                          <block type="dgpad_pt2d" id="${genId()}">
                                            <value name="a0"><block type="math_number" id="${genId()}"><field name="NUM">0</field></block></value>
                                            <value name="a1"><block type="math_number" id="${genId()}"><field name="NUM">${textDy}</field></block></value>
                                          </block>
                                        </value>
                                      </block>
                                    </value>
                                    <next>
                                      <block type="turtle_reset_angles" id="${genId()}">
                                        <next>
                                          <block type="turtle_print" id="${genId()}">
                                            <value name="TEXT">
                                              <shadow type="text" id="${genId()}">
                                                <field name="TEXT">${String(etiqueta)}</field>
                                              </shadow>
                                            </value>
                                          </block>
                                        </next>
                                      </block>
                                    </next>
                                  </block>
                                </next>
                              </block>
                            </next>
                          </block>
                        </next>
                      </block>
                    </next>
                  </block>
                </next>
              </block>
            </next>
          </block>
        </next>
      </block>
    </xml>`;
    }

    // ---- genera el SYNC equivalente (tortuga) ----
    function turtleSYNCForFicha(nombrePunto, etiqueta, lado=0.8, offset=0.4, textDy=-0.2, fill=80) {
      return `TURTLE_UP(true);
    TURTLE_JOIN_PT((Math.plus((${nombrePunto}),([${offset},${offset}]))));
    TURTLE_RESET();
    TURTLE_UP(false);
    for (var blockly_var_count = 1 ; blockly_var_count <= 4 ; blockly_var_count++){
      TURTLE_TURN(-(90));
      TURTLE_MV(${lado},false);
    };
    TURTLE_FILL(${fill});
    TURTLE_UP(true);
    TURTLE_JOIN_PT((Math.plus((${nombrePunto}),([0,${textDy}]))));
    TURTLE_RESET();
    TURTLE_PRINT(TURTLE_TEXT("${String(etiqueta)}"));`;
    }

    // ---- asigna el BLK completo (tortuga + imán + mouseup) a una ficha ----
    function setFichaBLKWithTurtle(punto, etiqueta) {
      const name = punto.getName();
      Cn.getInterpreter().BLK(name, {
        onlogo: {
          xml: turtleXMLForFicha(name, etiqueta),
          sync: turtleSYNCForFicha(name, etiqueta)
        },
        ondrag: {
          xml: (function(){
            const id1=genId(), id2=genId(), id3=genId();
            return `
    <xml xmlns="http://www.w3.org/1999/xhtml">
      <block type="dgpad_actions_iman" id="${id1}" x="6" y="127">
        <field name="TYPE">list</field>
        <field name="NAME">posLibres</field>
        <value name="OBJ1"><block type="dgpad_get_point_short" id="${id2}"><field name="NAME">${name}</field></block></value>
        <value name="im"><shadow type="math_number" id="${id3}"><field name="NUM">50</field></shadow></value>
      </block>
    </xml>`;
          })(),
          sync: `imantar("${name}","posLibres", 50);`
        },
        onmouseup: {
          xml: (function(){
            const a=genId(), b=genId(), c=genId(), d=genId(), e=genId(), f=genId(), g=genId(), h=genId(), i=genId();
            return `
    <xml xmlns="http://www.w3.org/1999/xhtml">
      <block type="dgpad_set_object" id="${a}" x="33" y="261">
        <field name="TYPE">expression</field>
        <field name="NAME">Control</field>
        <value name="obj_val"><block type="math_number" id="${b}"><field name="NUM">1</field></block></value>
        <next>
          <block type="dgpad_set_object" id="${c}">
            <field name="TYPE">expression</field>
            <field name="NAME">Control</field>
            <value name="obj_val"><block type="math_number" id="${d}"><field name="NUM">0</field></block></value>
            <next>
              <block type="dgpad_actions_iman" id="${e}">
                <field name="TYPE">list</field>
                <field name="NAME">posLibres</field>
                <value name="OBJ1"><block type="dgpad_get_point_short" id="${f}"><field name="NAME">${name}</field></block></value>
                <value name="im"><shadow type="math_number" id="${g}"><field name="NUM">0</field></shadow></value>
                <next><block type="dgpad_compute" id="${h}"><field name="OBJECT">PosLibres</field></block></next>
                <next><block type="dgpad_compute" id="${h}"><field name="OBJECT">posLibres</field></block></next>
              </block>
            </next>
          </block>
        </next>
      </block>
    </xml>`;
          })(),
          sync: `var blockly_var_temp_var = 1 ;
    SET_EXP("Control",blockly_var_temp_var);
    var blockly_var_temp_var2 = 0 ;
    SET_EXP("Control",blockly_var_temp_var2);
    imantar("${name}","posLibres", 0);
    PosLibres.compute();
    posLibres.compute();`,
          childs: ["Control"]
        },
        current: "onlogo"   // ← arrancamos mostrando la ficha dibujada
      });
    }


    // var generateBlocklyUniqueId=function () {
    //         return Math.random().toString(36).substr(2, 4) + Date.now().toString(36);
    //       }

    OBJ6.setShowName(0);
    OBJ6.setSize(18);
    OBJ6.setLayer(-1);
    OBJ6.setColor("#f6f6f9");
    OBJ7.setShowName(0);
    OBJ7.setSize(18);
    OBJ7.setLayer(-1);
    OBJ7.setColor("#f6f6f9");
    OBJ8.setShowName(0);
    OBJ8.setSize(18);
    OBJ8.setLayer(-1);
    OBJ8.setColor("#f6f6f9");
    OBJ9.setShowName(0);
    OBJ9.setSize(18);
    OBJ9.setLayer(-1);
    OBJ9.setColor("#f6f6f9");
    canvas.addObject(OBJ6);
    canvas.addObject(OBJ7);
    canvas.addObject(OBJ8);
    canvas.addObject(OBJ9);
    canvas.addObject(dibujaTablero);

    setFichaBLKWithTurtle(OBJ6, 1);   // número 1
    setFichaBLKWithTurtle(OBJ7, 2);   // número 2
    setFichaBLKWithTurtle(OBJ8, 3);   // número 3
    setFichaBLKWithTurtle(OBJ9, 4);   // número 4
    
    


// XML sin caracteres raros en los id, usando template string:
const xmlTablero = `
<xml xmlns="http://www.w3.org/1999/xhtml">
  <block type="turtle_pen" id="${genId()}" x="25" y="-8">
    <field name="PEN">penUp</field>
    <next>
      <block type="controls_for" id="${genId()}">
        <field name="VAR">i</field>

        <value name="FROM">
          <block type="math_number" id="${genId()}">
            <field name="NUM">0</field>
          </block>
        </value>

        <value name="TO">
          <block type="math_arithmetic" id="${genId()}">
            <field name="OP">MINUS</field>
            <value name="A">
              <block type="lists_length" id="${genId()}">
                <value name="VALUE">
                  <block type="dgpad_get_object_short" id="${genId()}">
                    <field name="NAME">Tablero</field>
                  </block>
                </value>
              </block>
            </value>
            <value name="B">
              <block type="math_number" id="${genId()}">
                <field name="NUM">1</field>
              </block>
            </value>
          </block>
        </value>

        <value name="BY">
          <block type="math_number" id="${genId()}">
            <field name="NUM">1</field>
          </block>
        </value>

        <statement name="DO">
          <block type="turtle_join_pt" id="${genId()}">
            <value name="VALUE">
              <!-- sombra cualquiera; el valor real es el bloque siguiente -->
              <shadow type="dgpad_get_point_short_turtle" id="${genId()}">
                <field name="NAME">ficha1</field>
              </shadow>

              <block type="math_arithmetic" id="${genId()}">
                <field name="OP">ADD</field>

                <value name="A">
                  <block type="dgpad_get_list" id="${genId()}">
                    <value name="NAME">
                      <block type="dgpad_get_object_short" id="${genId()}">
                        <field name="NAME">Tablero</field>
                      </block>
                    </value>
                    <value name="INDEX">
                      <block type="variables_get" id="${genId()}">
                        <field name="VAR">i</field>
                      </block>
                    </value>
                  </block>
                </value>

                <value name="B">
                  <block type="dgpad_pt2d" id="${genId()}">
                    <value name="a0"><block type="math_number" id="${genId()}"><field name="NUM">0.5</field></block></value>
                    <value name="a1"><block type="math_number" id="${genId()}"><field name="NUM">0.5</field></block></value>
                  </block>
                </value>

              </block>
            </value>

            <next>
              <block type="turtle_reset_angles" id="${genId()}">
                <next>
                  <block type="turtle_pen" id="${genId()}">
                    <field name="PEN">penDown</field>
                    <next>
                      <block type="controls_repeat_ext" id="${genId()}">
                        <value name="TIMES"><block type="math_number" id="${genId()}"><field name="NUM">4</field></block></value>
                        <statement name="DO">
                          <block type="turtle_turn" id="${genId()}">
                            <field name="DIR">turnRight</field>
                            <value name="VALUE"><shadow type="turtle_angle_input" id="${genId()}"><field name="ANGLE">90</field></shadow></value>
                            <next>
                              <block type="turtle_move" id="${genId()}">
                                <field name="DIR">moveForward</field>
                                <field name="UNITS">un</field>
                                <value name="VALUE"><shadow type="math_number" id="${genId()}"><field name="NUM">1</field></shadow></value>
                              </block>
                            </next>
                          </block>
                        </statement>
                        <next>
                          <block type="turtle_pen" id="${genId()}">
                            <field name="PEN">penUp</field>
                          </block>
                        </next>
                      </block>
                    </next>
                  </block>
                </next>
              </block>
            </next>

          </block>
        </statement>
      </block>
    </next>
  </block>
</xml>
`;

// Sync sin escapes raros:
const syncTablero =
  'TURTLE_UP(true);' +
  'for (var blockly_var_i=0; blockly_var_i<=Math.minus((Tablero).length,1); blockly_var_i=blockly_var_i+1){' +
    'TURTLE_JOIN_PT((Math.plus(((Tablero)[blockly_var_i]),([0.5,0.5]))));' +
    'TURTLE_RESET();' +
    'TURTLE_UP(false);' +
    'for (var blockly_var_count=1; blockly_var_count<=4; blockly_var_count++){' +
      'TURTLE_TURN(-(90));' +
      'TURTLE_MV(1,false);' +
    '};' +
    'TURTLE_UP(true);' +
  '};';

// Registrar en el punto (usa me.BLK si estás dentro de E1; si es JS “externo”, Cn.getInterpreter().BLK):
Cn.getInterpreter().BLK(dibujaTablero.getName(), {
  onlogo: { xml: xmlTablero, sync: syncTablero, parents: ["Tablero"] },
  current: "onlogo"
});



		
    OBJ11=new BlocklyButtonObject(Cn, "creaFicha", "creaNuevaFicha", x-40, y);
    Cn.getInterpreter().BLK(OBJ11.getName(),{"onprogram":{"xml":"<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"dgpad_set_object\" id=\"4xz.DRgH`cKj2@{bDg9G\" x=\"38\" y=\"159\"><field name=\"TYPE\">expression</field><field name=\"NAME\">controlFichas</field><value name=\"obj_val\"><block type=\"math_number\" id=\"d@M#xK4:wD?ySqFj{na3\"><field name=\"NUM\">1</field></block></value><next><block type=\"dgpad_set_object\" id=\"2~??AyY)0)PDhL8!*)l(\"><field name=\"TYPE\">expression</field><field name=\"NAME\">controlFichas</field><value name=\"obj_val\"><block type=\"math_number\" id=\"0b,I|omNf6R_oIxI8-@)\"><field name=\"NUM\">0</field></block></value></block></next></block></xml>","sync":"var blockly_var_temp_var = 1 ;\nSET_EXP(\"controlFichas\",blockly_var_temp_var);\nvar blockly_var_temp_var2 = 0 ;\nSET_EXP(\"controlFichas\",blockly_var_temp_var2);","childs":["controlFichas"]},"oninit":{"xml":"<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"text_alert\" id=\"[T];LA-:n48~oTHa4F2D\" x=\"81\" y=\"148\"><value name=\"TEXT\"><shadow type=\"text\" id=\"(_3DSz%U1mQC|iu%V*F-\"><field name=\"TEXT\">Bravo!</field></shadow></value></block></xml>","sync":"alertModal({\n        text: (TURTLE_TEXT(\"Tablero y Fichas.  Se crearon cuatro fichas y un tablero con cuatro casillas. Al acercar las fichas a las casillas, se pegan a ellas, y no es posible pegar dos fichas a una misma casilla. Ud puede crear más fichas con el DGScript correspondiente,  y/o modificar el contenido de cada ficha editando la tortuga del punto correspondiente.  También puede modificar la ubicación y el número de casillas del tablero editando la expresión Tablero.  Para poder evaluar lo que haga el usuario con las fichas y el tablero, se almacenará el contenido de las casillas en la variable global fichasT\")),\n        font: \"Arial\",\n        size: \"16\",\n        style: \"normal\",\n        align: \"center\"\n      });"},"current":"oninit"});
    canvas.addObject(OBJ11);
    
    var OBJ12 = new ExpressionObject(Cn, "scriptFichas", "", "", "", "0", x, y - 60);

    

    const script = `function generateBlocklyUniqueId() {
  return Math.random().toString(36).substr(2, 4) + Date.now().toString(36);
}

const lid1=generateBlocklyUniqueId();
const lid2=generateBlocklyUniqueId();
const lid3=generateBlocklyUniqueId();
const lid4=generateBlocklyUniqueId();
const lid5=generateBlocklyUniqueId();
const lid6=generateBlocklyUniqueId();
const lid7=generateBlocklyUniqueId();
const lid8=generateBlocklyUniqueId();
const lid9=generateBlocklyUniqueId();
const lid10=generateBlocklyUniqueId();
const lid11=generateBlocklyUniqueId();
const lid12=generateBlocklyUniqueId();
const lid13=generateBlocklyUniqueId();
const lid14=generateBlocklyUniqueId();
const lid15=generateBlocklyUniqueId();

id1=generateBlocklyUniqueId();
id2=generateBlocklyUniqueId();
id3=generateBlocklyUniqueId();
id4=generateBlocklyUniqueId();
id5=generateBlocklyUniqueId();
id6=generateBlocklyUniqueId();
id7=generateBlocklyUniqueId();
id8=generateBlocklyUniqueId();
id9=generateBlocklyUniqueId();
id10=generateBlocklyUniqueId();
id11=generateBlocklyUniqueId();
id12=generateBlocklyUniqueId();

if (controlFichas){
  const pto = Point("ficha", Math.random() * 3 - 4, Math.random() * 3 - 4);
  const ptoFicha = Find(pto);
  ptoFicha.setShowName(0);
  ptoFicha.setSize(18);
    ptoFicha.setLayer(-1);
    ptoFicha.setColor("#f6f6f9");

  // ===== ONLOGO: dibuja cuadrado de lado 0.8 rellenado y número (etiqueta) =====
  const onlogoXml = \`
    <xml xmlns="http://www.w3.org/1999/xhtml">
      <block type="turtle_pen" id="\${lid1}" x="9" y="3">
        <field name="PEN">penUp</field>
        <next>
          <block type="turtle_join_pt" id="\${lid2}">
            <value name="VALUE">
              <shadow type="dgpad_get_point_short_turtle" id="\${lid3}">
                <field name="NAME">\${ptoFicha.getName()}</field>
              </shadow>
              <block type="math_arithmetic" id="\${lid4}">
                <field name="OP">ADD</field>
                <value name="A">
                  <block type="dgpad_get_object_short" id="\${lid5}">
                    <field name="NAME">\${ptoFicha.getName()}</field>
                  </block>
                </value>
                <value name="B">
                  <block type="dgpad_pt2d" id="\${lid6}">
                    <value name="a0"><block type="math_number" id="\${lid7}"><field name="NUM">0.4</field></block></value>
                    <value name="a1"><block type="math_number" id="\${lid8}"><field name="NUM">0.4</field></block></value>
                  </block>
                </value>
              </block>
            </value>
            <next>
              <block type="turtle_reset_angles" id="\${lid9}">
                <next>
                  <block type="turtle_pen" id="\${lid10}">
                    <field name="PEN">penDown</field>
                    <next>
                      <block type="controls_repeat_ext" id="\${lid11}">
                        <value name="TIMES"><block type="math_number" id="\${lid12}"><field name="NUM">4</field></block></value>
                        <statement name="DO">
                          <block type="turtle_turn" id="\${lid13}">
                            <field name="DIR">turnRight</field>
                            <value name="VALUE"><shadow type="turtle_angle_input" id="\${lid14}"><field name="ANGLE">90</field></shadow></value>
                            <next>
                              <block type="turtle_move" id="\${lid15}">
                                <field name="DIR">moveForward</field>
                                <field name="UNITS">un</field>
                                <value name="VALUE"><shadow type="math_number"><field name="NUM">0.8</field></shadow></value>
                              </block>
                            </next>
                          </block>
                        </statement>
                        <next>
                          <block type="turtle_fill">
                            <value name="OP"><shadow type="math_number"><field name="NUM">80</field></shadow></value>
                            <next>
                              <block type="turtle_pen"><field name="PEN">penUp</field>
                                <next>
                                  <block type="turtle_join_pt">
                                    <value name="VALUE">
                                      <shadow type="dgpad_get_point_short_turtle"><field name="NAME">\${ptoFicha.getName()}</field></shadow>
                                      <block type="math_arithmetic"><field name="OP">ADD</field>
                                        <value name="A"><block type="dgpad_get_object_short"><field name="NAME">\${ptoFicha.getName()}</field></block></value>
                                        <value name="B"><block type="dgpad_pt2d">
                                          <value name="a0"><block type="math_number"><field name="NUM">0</field></block></value>
                                          <value name="a1"><block type="math_number"><field name="NUM">-0.2</field></block></value>
                                        </block></value>
                                      </block>
                                    </value>
                                    <next>
                                      <block type="turtle_reset_angles">
                                        <next>
                                          <block type="turtle_print">
                                            <value name="TEXT"><shadow type="text"><field name="TEXT">\${(function(){
                                              // etiqueta: cantidad de fichas existentes
                                              var puntos = me.Z.getConstruction().getAllObjectsFromType("point");
                                              var c=0, i=0, nm="";
                                              for(i=0;i<puntos.length;i++){ nm=(puntos[i].getName && puntos[i].getName())||""; if(nm.indexOf("ficha")===0) c++; }
                                              return String(c);
                                            })()}</field></shadow></value>
                                          </block>
                                        </next>
                                      </block>
                                    </next>
                                  </block>
                                </next>
                              </block>
                            </next>
                          </block>
                        </next>
                      </block>
                    </next>
                  </block>
                </next>
              </block>
            </next>
          </block>
        </next>
      </block>
    </xml>
  \`;

  const onlogoSync = \`
    TURTLE_UP(true);
    TURTLE_JOIN_PT((Math.plus((\${ptoFicha.getName()}),([0.4,0.4]))));
    TURTLE_RESET();
    TURTLE_UP(false);
    for (var i=1;i<=4;i++){TURTLE_TURN(-90);TURTLE_MV(0.8,false);}
    TURTLE_FILL(80);
    TURTLE_UP(true);
    TURTLE_JOIN_PT((Math.plus((\${ptoFicha.getName()}),([0,-0.2]))));
    TURTLE_RESET();
    TURTLE_PRINT(TURTLE_TEXT("\${(function(){
      var puntos = me.Z.getConstruction().getAllObjectsFromType('point');
      var c=0,i=0,nm=''; for(i=0;i<puntos.length;i++){ nm=(puntos[i].getName && puntos[i].getName())||''; if(nm.indexOf('ficha')===0) c++; }
      return String(c);
    })()}"));
  \`;

var LIST_NAME_LITERAL = 'po' + 'sLibres';   // "posLibres"
var EXPR_NAME_LITERAL = 'Po' + 'sLibres';   // "PosLibres"
var EXPR_NAME_LITERAL2 = 'Con'+'trol';

var ondragXml =
  '<xml xmlns="http://www.w3.org/1999/xhtml">'
+ '  <block type="dgpad_actions_iman" id="'+ id1 +'" x="6" y="127">'
+ '    <field name="TYPE">list</field>'
+ '    <field name="NAME">' + LIST_NAME_LITERAL + '</field>'  // ← importante
+ '    <value name="OBJ1">'
+ '      <block type="dgpad_get_point_short" id="'+ id2 +'">'
+ '        <field name="NAME">' + ptoFicha.getName() + '</field>'
+ '      </block>'
+ '    </value>'
+ '    <value name="im">'
+ '      <shadow type="math_number" id="'+ id3 +'">'
+ '        <field name="NUM">50</field>'
+ '      </shadow>'
+ '    </value>'
+ '  </block>'
+ '</xml>';

var onmouseupXml =
  '<xml xmlns="http://www.w3.org/1999/xhtml">'
+ '  <block type="dgpad_set_object" id="'+ id4 +'" x="33" y="261">'
+ '    <field name="TYPE">expression</field>'
+ '    <field name="NAME">' + EXPR_NAME_LITERAL2 + '</field>'
+ '    <value name="obj_val"><block type="math_number" id="'+ id5 +'"><field name="NUM">1</field></block></value>'
+ '    <next>'
+ '      <block type="dgpad_set_object" id="'+ id6 +'">'
+ '        <field name="TYPE">expression</field>'
+ '        <field name="NAME">' + EXPR_NAME_LITERAL2 + '</field>'
+ '        <value name="obj_val"><block type="math_number" id="'+ id7 +'"><field name="NUM">0</field></block></value>'
+ '        <next>'
+ '          <block type="dgpad_actions_iman" id="'+ id8 +'">'
+ '            <field name="TYPE">list</field>'
+ '            <field name="NAME">' + LIST_NAME_LITERAL + '</field>'   // ← importante
+ '            <value name="OBJ1"><block type="dgpad_get_point_short" id="'+ id9 +'">'
+ '              <field name="NAME">' + ptoFicha.getName() + '</field></block></value>'
+ '            <value name="im"><shadow type="math_number" id="'+ id10 +'"><field name="NUM">0</field></shadow></value>'
+ '            <next>'
+ '              <block type="dgpad_compute" id="'+ id11 +'">'
+ '                <field name="OBJECT">' + LIST_NAME_LITERAL + '</field>'  // computa la lista'
+ '                <next>'
+ '                  <block type="dgpad_compute" id="'+ generateBlocklyUniqueId() +'">'
+ '                    <field name="OBJECT">' + EXPR_NAME_LITERAL + '</field>' // computa la expresión (si existe)'
+ '                  </block>'
+ '                </next>'
+ '              </block>'
+ '            </next>'
+ '          </block>'
+ '        </next>'
+ '      </block>'
+ '    </next>'
+ '  </block>'
+ '</xml>';
  
  me.BLK(ptoFicha.getName(), {
    "onlogo": {
      "xml": onlogoXml,
      "sync": onlogoSync
    },
    "ondrag": {
      "xml": ondragXml,
      "sync": \`imantar("\${ptoFicha.getName()}","posLibres", 50);\`
    },
    "onmouseup": {
      "xml": onmouseupXml,
      "sync": \`
        var blockly_var_temp_var = 1 ;
        SET_EXP("Control",blockly_var_temp_var);
        var blockly_var_temp_var2 = 0 ;
        SET_EXP("Control",blockly_var_temp_var2);
        imantar("\${ptoFicha.getName()}","posLibres", 0);
        PosLibres.compute();
        posLibres.compute();
      \`,
      "childs": ["Control"]
    },
    "current": "onlogo"
  });

  nombreTortuga = "blk_turtle_list_" +ptoFicha.getName();   Find(nombreTortuga).compute(); ptoFicha.setShowName(0);
};0
`;



          // Crear expresión

          OBJ12.setE1(script);
         





 
      
      
    
    
      
      
    canvas.addObject(OBJ12);
    OBJ12.setHidden(true);
    var OBJ13 = new ExpressionObject(Cn, "controlFichas", "", "", "", "0",x,y+80);
    canvas.addObject(OBJ13);
    OBJ13.setHidden(true);
    var r = Math.round(Math.random() * 128);
        var g = Math.round(Math.random() * 128);
        var b = Math.round(Math.random() * 128);
        var op = Math.round((0.1 + Math.random() / 3) * 100) / 100;
        var stl = "c:rgba(" + r + "," + g + "," + b + "," + op + ")";
        
        
        stl += ";s:6";
        stl += ";r:50";
        
		stl += ";f:50";
		stl += ";t:16";
		stl += ";fp:false";
		stl += ";ft:false";

    
function reloadFigSameWindow(){
  var source = canvas.getSource();
  var encoded = btoa(unescape(encodeURIComponent(source)));

  var form = document.createElement('form');
  form.method = 'post';
  form.action = location.href; // mismo endpoint que procesa file_content
  form.target = '_self';

  var input = document.createElement('input');
  input.type = 'hidden';
  input.name = 'file_content';
  input.value = encoded;
  form.appendChild(input);

  document.body.appendChild(form);
  form.submit();
}

// Llamada (antes llamabas a reloadFigSameWindowAndShowHelp(...))
reloadFigSameWindow();



        
  
  }

  // Punto de entrada usado por la barra Angular. Conserva una sola
  // implementación del tablero y coloca los objetos en el centro visible.
  me.createTableroPuntos = function() {
    x = Math.round(canvas.getWidth() / 2 / 10) * 10;
    y = Math.round(canvas.getHeight() / 2 / 10) * 10;
    createTableroPuntos();
  };

  var getName = function(_t) {
    var t = _t.match(/.{1,1}/g);
    for (var i = 0; i < t.length; i++) {
      if (!Cn.find(t[i])) return t[i];
    }
    return t[0];
  }

  var createIntCursor = function() {
    var OBJ = newExp("");
    if (!canvas.namesManager.isVisible()) OBJ.setName(getName("nmkabcuvwrst"));
    OBJ.setMin("0");
    OBJ.setMax("10");
    OBJ.setIncrement(1);
    Cn.compute();
    canvas.paint();
  };

  var createContCursor = function() {
    var OBJ = newExp("0");
    if (!canvas.namesManager.isVisible()) OBJ.setName(getName("nmkabcuvwrst"));
    OBJ.setMin("-10");
    OBJ.setMax("10");
    Cn.compute();
    canvas.paint();
  };

  var createEditWidget = function() {
    canvas.addText($L.edit_widget_name + " : <input id=\"exp_name\" interactiveinput=\"replace\">\n\n\u00a7  name=\"" + $L.edit_widget_edit + "\" style=\"font-size:18px;padding: 5px 10px;background: #4479BA;color: #FFF;-webkit-border-radius: 4px;-moz-border-radius: 4px;border-radius: 4px;border: solid 1px #20538D;text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.4);-webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 1px 1px rgba(0, 0, 0, 0.2);-moz-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 1px 1px rgba(0, 0, 0, 0.2);box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 1px 1px rgba(0, 0, 0, 0.2);\"\nvar exp_n=Find(\"exp_name\");\nvar exp_e=Find(\"exp_edit\");\nexp_e.setAttribute(\"target\",exp_n.value);\nRefreshInputs();\n\n\u00a7\n\n<textarea id=\"exp_edit\" target=\"aa\" style=\"width:500px;height:400px\"></textarea>\n", x, y, 550, 530, "c:rgba(59,79,115,0.18);s:3;r:15;p:4");
  };
  
  var createConstrucWidget = function() {
    canvas.addText($L.construc_widget_help+'<textarea id="construc" style="width:300px;height:200px"></textarea> § name="Construir" style="font-size:24px;color:blue" var Objetos=me.C.getListObject(); Puntos=[]; for (let i=0; i<Objetos.length; i++) { if (Objetos[i].getCode()=="point"|Objetos[i].getCode()=="expression_cursor") {Puntos.push(Objetos[i])} } for (let i=0; i<Puntos.length; i++) { me.C.safelyDelete(Puntos[i]) } var nombres=[]; var puntos=[]; var rectas=[]; var circulos=[]; var poligonos=[]; const pto = /Punto/i; const ptocualq= /Punto cualquiera/i; const ptomedio= /Punto medio/i; const ptointer= /Punto de intersecci\u00D3n/i; const ptosobre= /Punto sobre/i; const segmento= /Segmento/i; const circulo= /C\u00EDrculo/i; const circcentro=/C\u00EDrculo de centro/i; const circ3ptos=/C\u00EDrculo por/i; const circradio=/C\u00EDrculo de radio/i; const recta=/Recta/i; const semirrecta=/Semirrecta/i; const bisect=/Bisectriz/i; const mediat=/Mediatriz/i; const arco=/Arco/i; const paralela=/Paralela/i; const perp=/Perpendicular/i; const poligo=/Pol\u00EDgono/i; const simetria=/Sim\u00E9trico de/i; const angulo=/forma un ángulo de/i; const rotacion=/Rotaci\u00D3n/i; const homotecia=/Homot\u00E9tico/i; const traslacion=/Traslaci\u00D3n/i; const vector=/Vector/i; texto=Find("construc").value; lineas=texto.split("\\n"); lineas=lineas.filter(Boolean); for (let i = 0; i < lineas.length; i++) { if (lineas[i].indexOf(":")==-1){ alert("falta el nombre en "+lineas[i]); break; } nombre=lineas[i].split(":")[0]; nombres.push(nombre); predicado=lineas[i].split(":")[1].trim(); palabrasPredicado=predicado.split(" "); if (pto.test(predicado)){ if (palabrasPredicado.length<2){alert("no entiendo "+lineas[i])} if (ptocualq.test(predicado)) { if(palabrasPredicado.length==2){ p=Point(nombre,Math.random()*10-5,Math.random()*10-5); Find(p).setShowName(1); puntos.push(nombre); }else{alert("no entiendo "+lineas[i]+$L.construc_widget_help_anyPoint);}; } if(ptosobre.test(predicado)) { if(palabrasPredicado.length==3&&(rectas.includes(predicado.split(" ")[2])|circulos.includes(predicado.split(" ")[2]))){ p=PointOn(nombre, predicado.split(" ")[2],0.5); Find(p).setShowName(1); puntos.push(nombre); } else{alert("no entiendo "+lineas[i]+$L.construc_widget_help_pointOn);}; } if (ptomedio.test(predicado)) { if(palabrasPredicado.length==6&&puntos.includes(predicado.split(" ")[3])&&puntos.includes(predicado.split(" ")[5])){ p=MidPoint(nombre,predicado.split(" ")[3],predicado.split(" ")[5]); Find(p).setShowName(1); puntos.push(nombre); }else{alert("no entiendo "+lineas[i]+$L.construc_widget_help_midPoint);}; } if (ptointer.test(predicado)) { if(palabrasPredicado.length==7&&((rectas.includes(predicado.split(" ")[4])&&rectas.includes(predicado.split(" ")[6]))|(circulos.includes(predicado.split(" ")[4])&&circulos.includes(predicado.split(" ")[6]))|(rectas.includes(predicado.split(" ")[4])&&circulos.includes(predicado.split(" ")[6]))|(circulos.includes(predicado.split(" ")[4])&&rectas.includes(predicado.split(" ")[6])))){ p=OrderedIntersection(nombre,predicado.split(" ")[4],predicado.split(" ")[6],1); Find(nombre).compute(); Find(p).setShowName(1); puntos.push(nombre); } else if(palabrasPredicado.length==10&&(predicado.includes("diferente de")&&((rectas.includes(predicado.split(" ")[4])&&rectas.includes(predicado.split(" ")[6]))|(circulos.includes(predicado.split(" ")[4])&&circulos.includes(predicado.split(" ")[6]))|(rectas.includes(predicado.split(" ")[4])&&circulos.includes(predicado.split(" ")[6]))|(circulos.includes(predicado.split(" ")[4])&&rectas.includes(predicado.split(" ")[6]))))){ p=OrderedIntersection(nombre,predicado.split(" ")[4],predicado.split(" ")[6],1,predicado.split(" ")[9]); Find(nombre).compute(); Find(p).setShowName(1); puntos.push(nombre); }else{alert("no entiendo "+lineas[i]+$L.construc_widget_help_interPoint);}; } } if (segmento.test(predicado)) { var nombres2=[]; for (let i = 0; i < nombres.length; i++) { if (predicado.includes(nombres[i])&&predicado.indexOf(nombres[i])>8) { nombres2.push(nombres[i]); } } if(palabrasPredicado.length==2&&nombres2.length==2&&puntos.includes(nombres2[0])&&puntos.includes(nombres2[1])){ Segment(nombre,nombres2[0],nombres2[1]); rectas.push(nombre); }else{alert("no entiendo "+lineas[i]+$L.construc_widget_help_segment);}; } if (vector.test(palabrasPredicado[0])) { var nombres2=[]; for (let i = 0; i < nombres.length; i++) { if (predicado.includes(nombres[i])&&predicado.indexOf(nombres[i])>6) { nombres2.push(nombres[i]); } } if(palabrasPredicado.length==2&&nombres2.length==2&&puntos.includes(nombres2[0])&&puntos.includes(nombres2[1])){ Vector(nombre,nombres2[0],nombres2[1]); rectas.push(nombre); }else{alert("no entiendo "+lineas[i]+$L.construc_widget_help_vector);}; } if (recta.test(predicado)&&predicado.indexOf("ecta")==1) { var nombres2=[]; for (let i = 0; i < nombres.length; i++) { if (predicado.includes(nombres[i])&&predicado.indexOf(nombres[i])>5) { nombres2.push(nombres[i]); } } if(palabrasPredicado.length==2&&nombres2.length==2&&puntos.includes(nombres2[0])&&puntos.includes(nombres2[1])){ Line(nombre,nombres2[0],nombres2[1]); rectas.push(nombre); }else{alert("no entiendo "+lineas[i]+$L.construc_widget_help_line);}; } if (semirrecta.test(predicado)&&palabrasPredicado.length<16) { if(palabrasPredicado.length==8&&puntos.includes(palabrasPredicado[3])&&puntos.includes(palabrasPredicado[7])){ Ray(nombre,predicado.split(" ")[3],predicado.split(" ")[7]); rectas.push(nombre); }else{alert("no entiendo "+lineas[i]+$L.construc_widget_help_ray);}; } if (bisect.test(predicado)) { var nombres2=[]; for (let i = 0; i < nombres.length; i++) { if (predicado.includes(nombres[i])&&predicado.indexOf(nombres[i])>8) { nombres2.push(nombres[i]); } } if(palabrasPredicado.length==4&&nombres2.length==3&&puntos.includes(nombres2[0])&&puntos.includes(nombres2[1])&&puntos.includes(nombres2[2])){ AngleBisector(nombre,nombres2[0],nombres2[1],nombres2[2]); rectas.push(nombre); }else{alert("no entiendo "+lineas[i]+$L.construc_widget_help_angleBis);}; } if (circcentro.test(predicado)&&predicado.includes("que pasa por")) { if(palabrasPredicado.length==8&&puntos.includes(predicado.split(" ")[3])&&puntos.includes(predicado.split(" ")[7])){ Circle(nombre,predicado.split(" ")[3],predicado.split(" ")[7]); circulos.push(nombre); }else{alert("no entiendo "+lineas[i]+$L.construc_widget_help_circle);}; } if (circcentro.test(predicado)&&predicado.includes("y radio")) { if(palabrasPredicado.length==7&&puntos.includes(predicado.split(" ")[3])&&predicado.split(" ")[6]>0){ Circle1(nombre,predicado.split(" ")[3],predicado.split(" ")[6]); circulos.push(nombre); }else{alert("no entiendo "+lineas[i]+$L.construc_widget_help_circle1);}; } if (circradio.test(predicado)) { var nombres2=[]; for (let i = 0; i < nombres.length; i++) { if (predicado.split(" ")[3].includes(nombres[i])) { nombres2.push(nombres[i]); } } if(palabrasPredicado.length==7&&puntos.includes(nombres2[0])&&puntos.includes(nombres2[1])&&puntos.includes(predicado.split(" ")[6])){ Circle3(nombre,nombres2[0],nombres2[1],predicado.split(" ")[6]); circulos.push(nombre); }else{alert("no entiendo "+lineas[i]+$L.construc_widget_help_circle3);}; } if (circ3ptos.test(predicado)) { if(palabrasPredicado.length==6&&puntos.includes(predicado.split(" ")[2].slice(0,-1))&&puntos.includes(predicado.split(" ")[3])&&puntos.includes(predicado.split(" ")[5])){ Circle3pts(nombre,predicado.split(" ")[2].slice(0,-1),predicado.split(" ")[3],predicado.split(" ")[5]); circulos.push(nombre); }else{alert("no entiendo "+lineas[i]);}; } if (arco.test(predicado)) { var nombres2=[]; for (let i = 0; i < nombres.length; i++) { if (predicado.split(" ")[1].includes(nombres[i])) { nombres2.push(nombres[i]); } } if(palabrasPredicado.length==2&&puntos.includes(nombres2[0])&&puntos.includes(nombres2[1])&&puntos.includes(nombres2[2])){ Arc3pts(nombre,nombres2[0],nombres2[1],nombres2[2]); circulos.push(nombre); }else{alert("no entiendo "+lineas[i]+$L.construc_widget_help_arc);}; } if (paralela.test(predicado)) { if(palabrasPredicado.length==5&&rectas.includes(palabrasPredicado[2])&&puntos.includes(palabrasPredicado[4])){ Parallel(nombre,palabrasPredicado[2],palabrasPredicado[4]); rectas.push(nombre); }else{alert("no entiendo "+lineas[i]+$L.construc_widget_help_parallel);}; } if (perp.test(predicado)) { if(palabrasPredicado.length==5&&rectas.includes(palabrasPredicado[2])&&puntos.includes(palabrasPredicado[4])){ Perpendicular(nombre,palabrasPredicado[2],palabrasPredicado[4]); rectas.push(nombre); }else{alert("no entiendo "+lineas[i]+$L.construc_widget_help_perp);}; } if (mediat.test(predicado)) { if(palabrasPredicado.length==5&&puntos.includes(palabrasPredicado[2])&&puntos.includes(palabrasPredicado[4])){ PerpendicularBisector(nombre,palabrasPredicado[2],palabrasPredicado[4]); rectas.push(nombre); }else{alert("no entiendo "+lineas[i]+$L.construc_widget_help_perpBis);}; } if (poligo.test(predicado)) { var nombres2=[]; poligono=predicado.split(" ")[1]; for (let i = 0; i < nombres.length; i++) { if (poligono.includes(nombres[i])&&puntos.includes(nombres[i])) { nombres2.push(nombres[i]); nombres2.push(predicado.split(" ")[1].indexOf(nombres[i])); poligono=poligono.slice(0,poligono.indexOf(nombres[i])+nombres[i].length)+","+poligono.slice(poligono.indexOf(nombres[i])+nombres[i].length) } } poligono=poligono.slice(0,poligono.length-1); p=Polygon(nombre,poligono); Find(p).setOpacity(0.2); poligonos.push(nombre); } if(simetria.test(predicado)){ if(palabrasPredicado.length==7){ if(puntos.includes(palabrasPredicado[6])){ p=Symmetry(nombre,palabrasPredicado[6],palabrasPredicado[2]); if (puntos.includes(palabrasPredicado[2])){ Find(p).setShowName(1); puntos.push(nombre); } } if(rectas.includes(palabrasPredicado[6])){ p=Reflection(nombre,palabrasPredicado[6],palabrasPredicado[2]); if (puntos.includes(palabrasPredicado[2])){ Find(p).setShowName(1); puntos.push(nombre); } } }else{alert("no entiendo "+lineas[i]+$L.construc_widget_help_csym+$L.construc_widget_help_asym);}; } if(angulo.test(predicado)){ if(palabrasPredicado.length==19){ if(puntos.includes(palabrasPredicado[3])&&nombres.includes(palabrasPredicado[15])){ amplitud=Number(palabrasPredicado[9].slice(0,-1));sentido=(palabrasPredicado[18]=="antihorario"); FixedAngle(nombre,palabrasPredicado[15],amplitud,sentido); }else{alert("no entiendo "+lineas[i]+$L.construc_widget_help_fixedAngle);}; }else{alert("no entiendo "+lineas[i]+$L.construc_widget_help_fixedAngle);}; } if(rotacion.test(predicado)){ if(palabrasPredicado.length==9){ if(puntos.includes(palabrasPredicado[5])&&palabrasPredicado[8]>0){ er=Expression("Er","","","",palabrasPredicado[8],"-13.958333333333334","5.5625"); centro=palabrasPredicado[2]; p=Rotation(nombre,Find(er).getName(),centro,palabrasPredicado[5]); if (puntos.includes(palabrasPredicado[2])){ Find(p).setShowName(1); puntos.push(nombre); } } }else{alert("no entiendo "+lineas[i]+$L.construc_widget_help_rot);}; } if(homotecia.test(predicado)){ if(palabrasPredicado.length==10){ if(puntos.includes(palabrasPredicado[6])&&palabrasPredicado[9]>0){ eh=Expression("Eh","","","",palabrasPredicado[9],"-13.958333333333334","5.5625"); centro=palabrasPredicado[2]; p=Homothety(nombre,Find(eh).getName(),centro,palabrasPredicado[6]); if (puntos.includes(palabrasPredicado[2])){ Find(p).setShowName(1); puntos.push(nombre); } } }else{alert("no entiendo "+lineas[i]+$L.construc_widget_help_homot);}; } if(traslacion.test(predicado)){ if(palabrasPredicado.length==7&&rectas.includes(palabrasPredicado[6])){ p=Translation(nombre,palabrasPredicado[6],palabrasPredicado[2]); if (puntos.includes(palabrasPredicado[2])){ Find(p).setShowName(1); puntos.push(nombre); } } if(!(palabrasPredicado.length==7&&rectas.includes(palabrasPredicado[6]))){ alert("no entiendo "+lineas[i]+$L.construc_widget_help_trans);}; } } §  ', x, y, 350, 350, "c:rgba(59,79,115,0.18);s:3;r:15;p:4");
  };

  // MEAG start
  var createFrameConstruction = function() {
    Cn.getFrame().drawFrame(_canvas, x, y);
    Cn.getFrame().draw();
  };
  // MEAG end

  var createBlocklyButton = function() {
    $U.prompt($L.create_blockly_program_change_message, $L.create_blockly_program_name, "text", function(_old, _new) {
      if (_new === "") _new = _old;
      var OBJ = new BlocklyButtonObject(Cn, "blk_btn", _new, x, y);
      OBJ.setOpacity(canvas.prefs.opacity.blockly_button);
      canvas.addObject(OBJ);
      Cn.compute();
      canvas.paint();
      canvas.blocklyManager.edit(OBJ);
    }, 450, 165, 430);
  };

var duplicateFig = function(){
	source=canvas.getSource();
	source=btoa(unescape(encodeURIComponent(source)));
	var target="popupform"+Math.random()*100000000;
	var FORM=document.createElement("form");
	FORM.target=target;
	FORM.method="post";
	// FORM.action="estudiantes"
	INPUT=document.createElement("input");
	INPUT.type="hidden";
	INPUT.name="file_content";
	
	INPUT.value=source;

	FORM.appendChild(INPUT);
	canvas.getDocObject().parentNode.appendChild(FORM);
	window.open("",target);
	FORM.submit();
	}
var leer = function (ev){
	
	canvas.load64($U.base64_encode(ev.target.result));
	}
	
var OpenFile = function (){
	
		var select=document.createElement("input");
		select.type="file";
		select.onchange = function (ev) {
			
			var arch=new FileReader();
			arch.readAsText(ev.target.files[0]);
			arch.addEventListener('load',leer,false);
			
			
		}
		
		document.body.appendChild(select);
		select.click();
		
		
		}



var SaveFile = async () => {
	const fileContent = canvas.getSource();

	if (window.showSaveFilePicker) {
		const options = {
			suggestedName: "archivo-dgpad.txt",
			types: [
				{
					description: "archivos dgpad-colombia",
					accept: { "text/plain": [".txt"] },
				},
			],
		};

		const handle = await window.showSaveFilePicker(options);
		const writable = await handle.createWritable();
		await writable.write(fileContent);
		await writable.close();
		return handle;
	} else {
		// Fallback: pedir nombre del archivo
		let fileName = prompt("Nombre del archivo:", "archivo-dgpad.txt");
		if (!fileName) return null; // cancelado

		if (!fileName.endsWith(".txt")) fileName += ".txt";

		const blob = new Blob([fileContent], { type: "text/plain" });
		const url = URL.createObjectURL(blob);

		const a = document.createElement("a");
		a.href = url;
		a.download = fileName;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);

		return null;
	}
};


	
  var tab = [];
    // MEAG start
  tab.push([$L.create_construccion_frame, createFrameConstruction]);
  tab.push([$L.create_duplicate_figure, duplicateFig]);
  tab.push([$L.create_open_file, OpenFile]);
  tab.push([$L.create_save_file, SaveFile]);
  tab.push([$L.create_widget_construc,createConstrucWidget]);
  if (canvas.version() == "profesores") {
	  
    tab.push([$L.create_blockly_button, createBlocklyButton]);
    tab.push([$L.create_exp, createExp]);
    tab.push([$L.create_exp_pts, createExpPts]);
    tab.push([$L.create_exp_segs, createExpSegs]);
    tab.push([$L.create_tableroPtos, createTableroPuntos]);
    tab.push([$L.create_cursor_int, createIntCursor]);
    tab.push([$L.create_cursor_cont, createContCursor]);
    tab.push([$L.create_widget_edit, createEditWidget]);
  }
  // MEAG end

  var close = function() {
    panel = null;
  };

  var exec = function(_proc) {
    _proc();
  };

  me.isVisible = function() {
    return (panel && panel.isVisible());
  };

  me.show = function(ev) {
    x = canvas.mouseX(ev);
    y = canvas.mouseY(ev);
    x = Math.round(x / 10) * 10;
    y = Math.round(y / 10) * 10;
    panel = new BubblePanel(canvas, exec, close, ev, tab, $L.longpress_message, 270, 240, 30);
  };




}
