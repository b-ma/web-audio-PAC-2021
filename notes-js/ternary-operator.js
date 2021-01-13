// > ternary operator
const flag = true;
let str;

if (flag) {
  str = 'true';
} else {
  str = 'false';
}

// other way to write
const flag = true;
const str = flag ? 'true' : 'false';


// > compare stuff
// `==` vs. `===`

'0' == 0 // true
'0' === 0 // false

// --> then use `===`


// > conditions
// logical AND -> &&
//
// 0 0 | 0
// 0 1 | 0
// 1 0 | 0
// 1 1 | 1
//
if (true && true) { /* executed */ }
if (true && false) { /* never executed */ }
if (false && true) { /* never executed */ }
if (false && false) { /* never executed */ }

// logical OR -> ||
//
// 0 0 | 0
// 0 1 | 1
// 1 0 | 1
// 1 1 | 1
//
if (true && true) { /* executed */ }
if (true && false) { /* executed */ }
if (false && true) { /* executed */ }
if (false && false) { /* never executed */ }


