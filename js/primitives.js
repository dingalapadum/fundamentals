/**
 * Primitive Datatypes
 * ===========================
 * 
 * These examples are inspired or come from: 
 * https://dmitripavlutin.com/6-ways-to-declare-javascript-functions/
 * 
 * run this file using 'node primitives.js'
 * 
 ####################################################################### */
/**
These six types are considered to be primitives:

    
    Undefined — a declared variable but hasn’t been given a value
    Boolean — true or false
    String — an array of characters i.e words
    Number — integers, floats, etc
    Null — no value but is actually of type Object

    A primitive is not an object. All primitives are immutable.
*/

let x;

// undefined
logType({ x });

//boolean
x = true;
logType({ x });

//string
x = "hello";
logType({ x });

// number
x = 5;
logType({ x });
x = 1.2;
logType({ x });

// null
x = null;
logType({ x });

console.log(null === undefined);     // false
console.log(null == undefined);       // true 


// arrays are objects
let cars = ["Saab", "Volvo", "BMW"];
logType({ cars });

console.log("undefined is of type " + typeof undefined);
console.log("null is of type " + typeof null);






/** ====================== utily ====================== */
function logType(x) {
    let name = Object.keys(x)[0];
    console.log(`var ${name} with value ${x[name]} is of type ${typeof x[name]}`);
}