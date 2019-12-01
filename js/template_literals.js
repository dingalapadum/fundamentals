/**
 * Template literals
 * =================
 * - are written between `` (backticks)
 * - allow expression interpolation
 * 
 * source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
 * 
 * run this file using 'node template_literals.js'
 ####################################################################### */
/**
 * Syntax
 * ------
 */
let tl_a = `string text`

let tl_b = `string text line 1
 string text line 2`

let expression = 5 + 7;
let tl_c = `string text ${expression} string text`




/**----------------------------------------------------------------------------
 * Multi-line strings
 * ------------------
 */
section("Multi-line strings");
// normal multi-line string printing
console.log('string text line 1\n' +
    'string text line 2');

// using template litearls
console.log(`string text line 1
string text line 2`);

/** expression interpolation
 * -------------------------
 */
let a = 5;
let b = 10;
console.log(`Fifteen is ${a + b} and
not ${2 * a + b}.`);
console.log();



/**----------------------------------------------------------------------------
 * Nesting
 * ------- 
 * */
section("Nesting");
console.log("on output here - this is only demonstarted directly in the code");

// ES5
let truth = true;
var classes = 'header'
classes += (truth ?
    '' : item.isCollapsed ?
        ' icon-expander' : ' icon-collapser');

// ES2015 with template literals and without nesting:
const classes2 = `header ${truth ? '' :
    (item.isCollapsed ? 'icon-expander' : 'icon-collapser')}`;

const classes3 = `header ${truth ? '' :
    `icon-${item.isCollapsed ? 'expander' : 'collapser'}`}`;

    console.log();



/**----------------------------------------------------------------------------
 * Tagged templates
 * ----------------
 */
section("Tagged templates");
function myFun(arg) {
    return `Hi ${arg}`;
}

console.log(myFun('you!'));




/**----------------------------------------------------------------------------
  * Raw strings
  * -----------
  * - 'return the evaluated template literal'
  * 
  * note that it still would evaluate the ${...} parts
  */
section("Raw strings");
let tl = `Hello \n world! ${5 + 2}`;
let str = String.raw`Hello \n world ${5 + 2}`;
console.log(tl);
console.log(str);


/** ====================== utily for this file ====================== */
function section(title) {
    console.log("----------------------------------------------------------------");
    console.log(title);
    console.log("----------------------------------------------------------------");
}