// Blockly.JavaScript['dgpad_create_list'] = function(block) {
//     var variable_varname = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
//     return 'blockly_var_' + variable_varname + ' = [];\n';
// };
// Blockly.JavaScript['dgpad_create_list'] = function(block) {
//     var varBlock = Blockly.JavaScript.valueToCode(block, 'VAR', Blockly.JavaScript.ORDER_ATOMIC) || 'undefined';
//     return ` ${varBlock} = []; // Create list variable\n`;
// };
Blockly.JavaScript['dgpad_create_list'] = function(block) {
    // Retorna el valor "[]"
    return ["[]", Blockly.JavaScript.ORDER_ATOMIC];
};

// Blockly.JavaScript['dgpad_stop_list'] = function(block) {
//     var variable_name = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
//     // TODO: Assemble JavaScript into code variable.
//     var code = 'blockly_var_' + variable_name + '.push([NaN,NaN,NaN]);\n';
//     return code;
// };
Blockly.JavaScript['dgpad_stop_list'] = function(block) {
    // Obtener el nombre de la variable desde la entrada dinámica "NAME"
    var variable_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC) || 'undefined';
    
    // Generar el código JavaScript
    var code = variable_name + '.push([NaN, NaN, NaN]);\n';
    return code;
};

Blockly.JavaScript['dgpad_get_list'] = function(block) {
    var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
    var value_index = Blockly.JavaScript.valueToCode(block, 'INDEX', Blockly.JavaScript.ORDER_ATOMIC);
    var code = value_name + '[' + value_index + ']';
    
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['dgpad_set_list'] = function(block) {
    var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
    var value_index = Blockly.JavaScript.valueToCode(block, 'INDEX', Blockly.JavaScript.ORDER_ATOMIC);
    var value_value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);
    var code = value_name + '[' + value_index + '] = ' + value_value + ';\n';
    return code;
};
// Blockly.JavaScript['dgpad_push'] = function(block) {
//     var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
//     var variable_varname = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VARNAME'), Blockly.Variables.NAME_TYPE);
//     value_name = value_name.replace(/^\((.*)\)$/, "$1");
//     value_name=value_name.replace(/^"setRGBColor",\[(\d*),(\d*),(\d*)\]$/,"[0,$1,$2,$3]");
//     var code = 'blockly_var_' + variable_varname + '.push(' + value_name + ');\n';
//     return code;
// };
Blockly.JavaScript['dgpad_push'] = function(block) {
    var listVar = Blockly.JavaScript.valueToCode(block, 'LIST', Blockly.JavaScript.ORDER_ATOMIC) || 'undefined';
    var itemVar = Blockly.JavaScript.valueToCode(block, 'ITEM', Blockly.JavaScript.ORDER_ATOMIC) || 'undefined';
    
    
    return `${listVar}.push(${itemVar}); // Push item to list\n`;
};

Blockly.JavaScript['remove_item_from_named_list'] = function(block) {
    var index = Blockly.JavaScript.valueToCode(block, 'INDEX', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var listName = Blockly.JavaScript.valueToCode(block, 'LIST_NAME', Blockly.JavaScript.ORDER_ATOMIC) || '""';
  
    // Genera el código JavaScript para eliminar el elemento
    var code = listName + '.splice(' + index + ', 1);\n';
    return code;
  };
  
  

// Blockly.JavaScript['dgpad_lista_objetos_tipo'] = function(block) {
// 	var variable_varname = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
// 	var type = block.getFieldValue('OBJECTTYPE');
// 	return 'blockly_var_' + variable_varname + ' = me.Z.getConstruction().getAllObjectsFromType("'+type+'");\n';
	
	
// };
Blockly.JavaScript['dgpad_lista_objetos_tipo'] = function(block) {
    // Obtener el nombre de la variable conectada
    

    // Obtener el tipo de objeto seleccionado
    var type = block.getFieldValue('OBJECTTYPE');

    // Generar el código que retorna la lista de objetos del tipo seleccionado
    var code = `me.Z.getConstruction().getAllObjectsFromType("${type}")`;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// Blockly.JavaScript['dgpad_lista_NombresObjetos_tipo'] = function(block) {
// 	var variable_varname = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
// 	var type = block.getFieldValue('OBJECTTYPE');
    
// 	return 'blockly_var_' + variable_varname + ' = me.Z.getConstruction().getAllObjectsNamesFromType("'+type+'");\n';
	
	
// };
Blockly.JavaScript['dgpad_lista_NombresObjetos_tipo'] = function(block) {
    

    // Obtener el tipo de objeto seleccionado
    var type = block.getFieldValue('OBJECTTYPE');

    // Generar el código que retorna los nombres de los objetos del tipo seleccionado
    var code = `me.Z.getConstruction().getAllObjectsNamesFromType("${type}")`;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['shuffle_list'] = function(block) {
    var list = Blockly.JavaScript.valueToCode(block, 'LIST', Blockly.JavaScript.ORDER_ATOMIC) || '[]';
  
    var code = `(() => {
      let array = ${list}.slice(); // Copia la lista para evitar modificar la original
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    })()`;
  
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
  };

  Blockly.JavaScript['order_list'] = function(block) {
    const lista = Blockly.JavaScript.valueToCode(block, 'LISTA', Blockly.JavaScript.ORDER_ATOMIC);
    const orden = block.getFieldValue('ORDEN');
  
    let codigo = '';
    if (orden === 'ASC') {
      codigo = `${lista}.slice().sort(function(a, b) { return a - b; })`;
    } else {
      codigo = `${lista}.slice().sort(function(a, b) { return b - a; })`;
    }
  
    return [codigo, Blockly.JavaScript.ORDER_FUNCTION_CALL];
  };
  

  Blockly.JavaScript['for_each'] = function(block) {
  var list = Blockly.JavaScript.valueToCode(block, 'LIST', Blockly.JavaScript.ORDER_ATOMIC) || '[]';
  var variable = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var statements = Blockly.JavaScript.statementToCode(block, 'DO');

  var code = `${list}.forEach((${variable}) => {\n${statements}});\n`;
  console.log(code);
  return code;
};