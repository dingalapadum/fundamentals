/**
 * Built in Objects
 * ================
 * 
 * - Some of the built in objects are the 'object'-counterpart of a primitive type
 * 
 * These examples are inspired or come from: 
 * http://hepunx.rl.ac.uk/~adye/jsspec11/builtin.htm
 * 
 * run this file using 'node builtinObjects.js'
 * 
 * 
 * Content:
 * - Array Object
 * - Date Object
 * - Boolean Object
 * - Math Object
 * - String Object
 ####################################################################### */
/**
 * Array Object
 * ============
 * - Object
 * - elements of an array do not neccessarily have the same type.
 * */
section("Array Object");

/**
 * Constructors
 * ------------
 */
subSection("Constructors");
// constructors
let empty=new Array();
console.log(empty);

let a5=new Array(5);
console.log(a5);
a5[3]='d';
console.log(a5);

a5[8]='x'; // a5 gets resized automatically
console.log(a5);

// An Array object has one property: length.
console.log(a5.length);

console.log(a5[10]); // undefined: There is no index out of bounds exception!!!
console.log(a5);
console.log(a5[2]); // undefined


let a=new Array(1,2,3,4);
console.log(a);
let b=new Array(5,6,7,8);
console.log(b);
let matrix=new Array(a, b);
console.log(matrix);

// An arrayLength specified to be zero or less results in a run-time error
try {
    let error = new Array(-1);
}catch(e){
    console.log("'let error = new Array(-1);' Negative length init raised an exception:");
    console.log(e)
}

/**
 * Methods
 * -------
 * - The Array object has three methods:
 * - join: Joins all elements of an array into a string.
 * - reverse: Reverses elements of an array
 * - sort: Sorts elements of an array based on a specified comparison function.
 * */
subSection("Methods");
console.log("in this section we will work with the array 'a':");
a=[1, 2, 3, 4, 5];
console.log(a);
console.log();

// push
console.log(" => push() an element (6) into an array");
a.push(6);
console.log(a);
console.log();

// pop
console.log(" => pop() an element");
console.log("we get: " + a.pop());
console.log(" and 'a' is now:");
console.log(a);
console.log();

// join
console.log(" => join() returns a string with the given separator between the elemets");
let joiner =  a.join("/");
console.log(joiner)
logType({joiner});
console.log();

// reverse
console.log(" => reverse() it reverses the array we call the mehtod on - and returns a pointer to the array we call the method on");
let reverser=a.reverse();
console.log(reverser);
console.log(a);
console.log();

// sort
console.log(" => sort() sorts the array we call the mehtod on - and returns a pointer to the array we call the method on");
//arrayName.sort(compareFunction)
let sorter=a.sort();
console.log(sorter);

sorter=a.sort();
console.log(a);

console.log(" => you can also pass a custom comparator (it should return a number)");

p1 = {name: "p1", age: 20};
p2 = {name: "p2", age: 21};
p3 = {name: "p3", age: 24};
p4 = {name: "p4", age: 11};
p5 = {name: "p5", age: 41};
p6 = {name: "p6", age: 19};

a=new Array(p1, p2, p3,p4,p5,p6);
console.log("for instance lets sort these persons");
console.log(a);
console.log(" by age");
a.sort((x1, x2) => x1.age - x2.age);
console.log(a)






//===================================================================================================
/**
 * Boolean Object
 * ==============
 * - has no properties
 * */
section("Boolean Object");
/**
 * Constructors
 * ------------
 */
subSection("Constructors");

// all these yield false
let u=new Boolean(false);
logType({u});
u=new Boolean();
logType({u});
u=new Boolean(null);
logType({u});
u=new Boolean(undefined);
logType({u});
u=new Boolean(0);
logType({u});

// everything else is true
u= new Boolean(true);
logType({u});
u=new Boolean(-1);
logType({u});
u=new Boolean("hello");
logType({u});


/**
 * Methods
 * -------
 * - The Array object has two methods:
 * - toString 
 * - valueOf 
 * */
subSection("Methods");
// toString is kinda obvious
console.log(u);
console.log(u.toString());

// valueOf returns the corresponding primitve boolean
console.log(u===true);
console.log(u.valueOf()===true);
// note that == would always return true for these






//===================================================================================================
/**
 * Date Object
 * ===========
 * - The Date object provides a system-independent abstraction of dates and times. 
 * - Dates may be constructed from a year, month, day of the month, hour, minute, and second, 
 *   and those six components, as well as the day of the week, may be extracted from a date. 
 * - Dates may be compared and converted to a readable string form. 
 * - A Date is represented to a precision of one millisecond. 
 * - Dates as Strings are according to IETF https://tools.ietf.org/rfc/rfc3339.txt (Internet Engineering Task Force)
 * - See also: ISO 8601 
 * */
section("Date Object");
/**
 * Constructors
 * ------------
 */
subSection("Constructors");
let date = new Date();

console.log("In Greenwich it is:")
console.log(date);

console.log("\nBut here it is (you even get the location!):")
console.log(date.toString());
/*
Other constructors are (won't use them all here)
new Date(StringDate)
new Date(year, month, day)
new Date(year, month, day, hours, minutes, seconds)
new Date(year, month, day, hours, minutes)
new Date(year, month, day, hours)
new Date(IntegerLiteral)
*/



/**
 * Methods
 * -------
 * - now (sinceECMAScript 5). parse and UTC are static methods
 * */
subSection("Methods");
 //parse
 date.setTime(Date.parse("Aug 9, 1995"));
 console.log(date.toString());

 // note that
 let dateInMillis = Date.parse("Aug 9, 1995"); // time in millis!
 console.log(dateInMillis + " millis since epoch");
date = new Date(dateInMillis);
console.log(date.toLocaleDateString());

// setDate sets the day of the month
console.log("\nSetting day of 'Aug 9, 1995' to 15");
date.setTime(Date.parse("Aug 9, 1995"));
date.setDate(15);
console.log("As String: " + date.toString());

// toGMTString 'basically pretty print'
console.log("As GMT String: " + date.toGMTString());

// toGMTString 'basically pretty print'
console.log("As Locale String: " + date.toLocaleString());

/* These should be more or less clear:
getFullYear 	Get the year as a four digit number (yyyy)
getMonth 	Get the month as a number (0-11)
getDate 	Get the day as a number (1-31)
getHours 	Get the hour (0-23)
getMinutes 	Get the minute (0-59)
getSeconds 	Get the second (0-59)
getMilliseconds 	Get the millisecond (0-999)
getTime 	Get the time (milliseconds since January 1, 1970)
getDay 	    Get the weekday as a number (0-6)
setHours
setMinutes
setMonth
setSeconds
setTime
setYear
 */





//===================================================================================================
/**
 * Math Object
 * ===========
 * */
section("Math Object");
/**
 * Constructors
 * ------------
 */
subSection("Constructors");
/**
 * Methods
 * -------
 * */

/** ====================== utily ====================== */
function section(title) {
    console.log();
    console.log();
    console.log();
    console.log();
    console.log();
    console.log();
    console.log();
    console.log("================================================================");
    console.log(title);
    console.log("================================================================");
}

function subSection(title) {
    console.log();
    console.log();
    console.log("----------------------------------------------------------------");
    console.log(title);
    console.log("----------------------------------------------------------------");
}

function logType(x) {
    let name = Object.keys(x)[0];
    console.log(`var ${name} with value ${x[name]} is of type ${typeof x[name]}`);
}