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
section("GLOBAL PROPERTY");
function hello_global() {
    nasty_var = "I am nasty";
    console.log(nasty_var);
}
console.log("calling hello_global");
hello_global();

console.log("accessing nasty_var from outside the function where it was declared");
console.log(nasty_var);

console.log();




/**----------------------------------------------------------------------------
 * var 
 * ---
 * - These declarations are _function_ scoped (not block!!!!)
 * - They are _hoisted_ (i.e to say, any declararation gets moved to the beginning of the function in which they are declared)
 */
section("VAR");
function hello_var() {

    // variable _declaration_
    var message;

    // variable initialization
    message = "hello";

    console.log(message);

    // decl and init in one line works too of course
    var message2 = "bye";
    console.log(message2);
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
    for (var i = 0; i < 3; i++) {
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

    for (i = 0; i < 3; i++) {
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

console.log();




/** ----------------------------------------------------------------------------
 * let 
 * ---
 * - Available since ES6
 * - Is _block_ scoped!
 * - Is _hoisted_ but _can't_ be used before declaration: results in a reference error
 */
section("LET");

function hello_let() {
    // console.log(message)
    // message="bye";
    // the above two lines would result in a reference error because variable hasn't been declared yet


    let message = "hello";
    console.log(message);

    for (let i = 0; i < 3; i++) {
        let message2 = "hello " + i;
        console.log(message2);
    }

    // console.log(message2)
    // the above line would result in a reference error because the message2 is not available in this scope
}

hello_let();

console.log();




/** ----------------------------------------------------------------------------
 * const 
 * -----
 * - Available since ES6
 * - Is _block_ scoped!
 * - Is _hoisted_ but _can't_ be used before declaration: results in a reference error
 * - Can only be assigned once!
 * - Note that the objects properties can still be modified! It doesn't make the whole object immutable
 */
section("CONST");

function hello_const() {
    const message = "hello";
    console.log(message);

    // message = "bye"
    // the above line would result in an error 'Assingment to constant variable"
}

hello_const();




/** ====================== utily for this file ====================== */
function section(title) {
    console.log("----------------------------------------------------------------");
    console.log(title);
    console.log("----------------------------------------------------------------");
}