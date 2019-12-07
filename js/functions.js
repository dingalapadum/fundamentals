/**
 * 6 Ways to declare functions
 * ===========================
 * 
 * These examples are inspired or come from: 
 * https://dmitripavlutin.com/6-ways-to-declare-javascript-functions/
 * 
 * run this file using 'node functions.js'
 * 
 ####################################################################### */
/**
 * 0. Cheatsheet
 * -------------
 * Here just some typical and plain examples. 
 * Explanations are further down
 */

function hello(subject) {
    return 'hello ' + subject;
}

count = function (array) {
    return array.length;
}

foo = function bar(arg) {
    return 'bar' + arg;
}

helloArrow = (arg) => {
    let msg = 'Arrow says: ' + arg;
    return msg;
}

function* indexGenerator() {
    var index = 0;
    while (true) {
        yield index++;
    }
}




/** ----------------------------------------------------------------------------
 * 1. Function declartion
 * ----------------------
 * - starts with _function_ keyword
 * - obligatory function _name_
 * - a list of parameters in (arg1, arg2, ..., argN)
 * - Body in curly braces
 */
section("Function declartion");
// is hoisted, i.e. it can be used before declaration
console.log(hello('hoisting'));

function hello(subject) {
    return 'hello ' + subject;
}
// regular call
console.log(hello('javascript'));

// named
console.log(hello.name)

// Variable holds the function object
console.log('type of \'hello\' is: ' + typeof hello);

// nested functions
function nested() {
    function inner() {
        console.log('inner');
    }
    inner();
}

// nested().inner(); //TypeError: Cannot read property 'inner' of undefined
nested();

console.log();




/** ----------------------------------------------------------------------------
 * 2. Function expressions
 * -----------------------
 * (everything that is not a function declaration is a function expression. 
 * I.e. if it does not start with the 'function' keyword) but usually it
 * is assigned to a variable
 */
section("Function expressions");
count = function (array) {
    return array.length;
}


let x = [1, 2, 3];
console.log(count(x));

// named function expression
foo = function bar(arg) {
    return 'bar' + arg;
}

console.log(foo.name);
console.log(foo('man'));

console.log();




/** ----------------------------------------------------------------------------
 * 3. Shorthand method definition
 * ------------------------------
 * ... in object literals
 */
section("Shorthand method definition");
myObject = {
    a: 'someprop',
    sayHi() {
        console.log('Hi ' + this.a);
    }
}

myObject.sayHi();


// Computed property names and methods
const addMethod = 'add',
    getMethod = 'get';
const collection = {
    items: [],
    [addMethod](...items) {
        this.items.push(...items);
    },
    [getMethod](index) {
        return this.items[index];
    }
};
collection[addMethod]('C', 'Java', 'PHP');
console.log(collection[getMethod](1)); // => 'Java'
console.log();




/** ----------------------------------------------------------------------------
 * 4. Arrow function
 * -----------------
 * General form
 * (param1, param2, ..., paramN) => {...}
 */
section("Arrow function");
helloArrow = (arg) => {
    let msg = 'Arrow says: ' + arg;
    return msg;
}

console.log(helloArrow('hello!'));
console.log();




/** ----------------------------------------------------------------------------
 * 5. Generator function
 * ---------------------
 * - Generator functions use 'yield' instead of 'return'
 * - You get there 'yield' value by calling <functionName>.next().value
 * the example is a function declaration, but this also works for function expressions
 */
section("Generator function");
// note the * and note it is 'yield' instead of return
function* indexGenerator() {
    var index = 0;
    while (true) {
        yield index++;
    }
}

const g = indexGenerator();
console.log(g.next().value); // => 0
console.log(g.next().value); // => 1




/** ----------------------------------------------------------------------------
 * 6. new Function
 * ---------------
 * not very relevant.
 * Think of it as creating 'as a runtime function instance'
 * Remember that functions almost never should be declared using 
 * new Function(). Because the function body is evaluated on runtime, 
 * this approach inherits many eval() usage problems: security risks, 
 * harder debugging, no way to apply engine optimizations, 
 * no editor auto-complete.
 */


 /** ====================== utily ====================== */
 function section(title) {
    console.log("================================================================");
    console.log(title);
    console.log("================================================================");
}
