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

    Boolean — true or false
    Null — no value
    Undefined — a declared variable but hasn’t been given a value
    Number — integers, floats, etc
    String — an array of characters i.e words
    Symbol — a unique value that's not equal to any other value

A primitive is not an object. All primitives are immutable.
*/

let x;

// undefined
logType({x});

//boolean
x = true;
logType({x});

//string
x = "hello";
logType({x});

// number
x = 5;
logType({x});
x = 1.2;
logType( {x});


// arrays are objects
let cars = ["Saab", "Volvo", "BMW"];
logType({cars});

console.log("undefined is of type " + typeof undefined);
console.log("null is of type " + typeof null);

console.log(null === undefined);     // false
console.log(null == undefined);       // true 




 /** ====================== utily ====================== */
 function section(title) {
    console.log("----------------------------------------------------------------");
    console.log(title);
    console.log("----------------------------------------------------------------");
}

function logType(x) {
    let name = Object.keys(x)[0];
    console.log(`var ${name} with value ${x[name]} is of type ${typeof x}`);
}