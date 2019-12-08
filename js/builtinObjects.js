/**
 * Built in Objects
 * ================
 * 
 * These examples are inspired or come from: 
 * 
 * run this file using 'node builtinObjects.js'
 * 
 ####################################################################### */
/**
 * Array Object
 * ============
 * - Object
 * - elements of an array do not neccessarily have the same type.
 * */
section("Array Object")

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
    console.log("Negative length init raised an exception:");
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

console.log(" => you can also pass a custom comparator (should return a number");

p1 = {name: "p1", age: 20};
p2 = {name: "p2", age: 21};
p3 = {name: "p3", age: 24};
p4 = {name: "p4", age: 11};
p5 = {name: "p5", age: 41};
p6 = {name: "p6", age: 19};

a=new Array(p1, p2, p3,p4,p5,p6);
console.log("for instance these persons by age");
console.log(a);
console.log(" by age");
a.sort((x1, x2) => x1.age - x2.age);
console.log(a)

/** ====================== utily ====================== */
function section(title) {
    console.log("================================================================");
    console.log(title);
    console.log("================================================================");
}

function subSection(title) {
    console.log("----------------------------------------------------------------");
    console.log(title);
    console.log("----------------------------------------------------------------");
}

function logType(x) {
    let name = Object.keys(x)[0];
    console.log(`var ${name} with value ${x[name]} is of type ${typeof x[name]}`);
}