/**
 * Variables
 * =========
 * 
 * These examples are inspired or come from: 
 * https://tylermcginnis.com/var-let-const/
 * 
 * run this file using 'node variables.js'
 * 
 ####################################################################### */
 /**
  * declaring _without_ any keyword
  * -------------------------------
  * will result in a new property being attached to the _global_ scope
  * -> don't do this! It pollutes the global scope
  */
 console.log("----------------------------------------------------------------");
 console.log("GLOBAL PROPERTY");
 console.log("----------------------------------------------------------------");
function hello_global(){
    nasty_var = "I am nasty";
    console.log(nasty_var);
}
console.log("calling hello_global");
hello_global();

console.log("accessing nasty_var from outside the function where it was declared");
console.log(nasty_var);

console.log("----------------------------------------------------------------");
console.log("VAR");
console.log("----------------------------------------------------------------");

/**
 * var 
 * ---
 * - These declarations are _function_ scoped (not block!!!!)
 * - They are _hoisted_ (i.e to say, any declararation gets moved to the beginning of the function in which they are declared)
 */

function hello_var(){

    // variable _declaration_
    var message;

    // variable initialization
    message="hello";

    console.log(message);
 }
 console.log("calling hello_var");
 hello_var();
 // here the variable 'message' is not available anymore

 console.log("--------------------");
 function hello_var2() {
    // using 'message2' before declaration! (will print 'undefined' but no error))
    console.log(message2)
 
    // decl this gets _hoisted_ that's why the previous console.log will just not give a reference error! -- remove this declaration and you will get an error
    var message2;
 }
console.log("calling hello_var2");
hello_var2();

console.log("--------------------");
function hello_var3_1() {
    for (var i=0; i<3; i++){
        var message = "hello " + i;
        console.log(message);
    }
    console.log(message); // will print "hello 2"!!!
}
// why can console log even if not in the same block-scope as message or i?
// --> because var is _function_ scoped and vars get hoisted to the top - so it is the same as:
function hello_var3_2() {
    var i;
    var message;

    for (i=0; i<3; i++){
        message = "hello " + i;
        console.log(message);
    }

    console.log(message);
 }

console.log("calling hello_var3_1");
hello_var3_1();
console.log("");
console.log("calling hello_var3_2");
hello_var3_2();


console.log("--------------------");