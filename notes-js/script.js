// variables
const a; // portée de block {} --> constante
let b;    // portée de block

function() {
  const a = 'test';
  // var inner = undefined;
  // inner does not exists

  for (let i = 0; i < 10; i++) {
    const inner = i;

  }
}

let a = 'test';
a = 'abc'; // Error

// primitives

// valeur indefinie
const unknown = undefined;
const unknown = null;

// boolean
const flag = true; // false

// number
const number = Math.PI; // Float64
const int = 3;

// string
const str1 = 'bonjour';
const str2 = "bonjour";
const str3 = `bonjour ${str1}`; // bonjour bonjour

// Array
const arr = [false, 'blahblah', 3]; // liste de choses
arr[0]; // false
arr[1]; // 'blahblah'
arr[2]; // 3

// const buffer = new Float32Array();
// const buffer = new Float64Array();
// const buffer = new Int8Array();
// const buffer = new Int16Array();
// const buffer = new Int32Array();

for (let i = 0; i < arr.length; i++) {
  const value = arr[i];
  console.log(value);
}

arr.forEach(function(value, index) {
  console.log(value, index);
});

// Object
const obj = {
  key1: false,
  key2: 'blahblah',
  key3: 3,
}

obj['key1']; // false
// etc...

for (let key in obj) {
  const value = obj[key];
  console.log(key, value);
}


// Object.keys(obj).sort().forEach(function(key) {
//   const value = obj[key];
// });

// function

function add(a, b) {
  return a + b;
}

const add = function(a, b) {
  return a + b;
}

// prefer this syntax for reasons you don't want to know about...
const add = (a, b) => {
  return a + b;
}

const add = (a, b) => a + b;

const increment = a => a + 1;
// example:
// arr = [1, 3, 5];
// const dbl = arr.map(value => value * 2);

add(2, 2);




