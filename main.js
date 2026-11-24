/* This assignment will give you some practice with creating arrays and using their methods. */

// ANY time you're asked to print something from the array, do it with a loop, printing each 
// item you're asked to print INDIVIDUALLY.
// 
// 
//
// Challenge 1
//
// Loop through the following array, console.logging out each value.


const students = [
  'Tre',
  'Sonny',
  'Crystal',
  'Ilyas',
  'Greg',
  'Fernando',
  'Timothy',
  'Patrick',
  'Steve',
  'Jimothy',
  'Pat',
  'Arnold',
  'Andy'
];

console.log('====challenge 1====')

for (let i = 0; i < students.length; i++) {
  console.log(students[i]);
}


// Challenge 2
// Loop through the following array BACKWARDS, console.logging out each value. 64 should be printed first and 100 last.
const grades = [100, 80, 110, 75, 83, 64];


console.log('====challenge 2====')

// start at the last index and count down to 0
for (let i = grades.length - 1; i >= 0; i--) {
  console.log(grades[i]);
}

// Challenge 3
// Console.log out only the even numbers in the following array.
const positiveNumbers = [5, 2, 13, 17, 4, 102, 3000];


console.log('====challenge 3====')

for (let i = 0; i < positiveNumbers.length; i++) {
  if (positiveNumbers[i] % 2 === 0) {
    console.log(positiveNumbers[i]);
  }
}


// Challenge 4
// Console.log out the even numbers in the following array, INCLUDING the negative ones. There should be four total printings.
const mixedSignNumbers = [3, 15, 14, -2, -3, -8, -103, 4];


console.log('====challenge 4====')


for (let i = 0; i < mixedSignNumbers.length; i++) {
  if (mixedSignNumbers[i] % 2 === 0) {
    console.log(mixedSignNumbers[i]);
  }
}

// Challenge 5
// Remove two values from the beginning and one value from the end of the following array, simply by deleting them in the following line. Then console.log out each value individually.
// 'A' and 'H' deleted from the start and 'Y' from the end, right in the array
const symmetricalCapitals = ['I', 'M', 'O', 'T', 'U', 'V', 'W', 'X'];


console.log('====challenge 5====')

for (let i = 0; i < symmetricalCapitals.length; i++) {
  console.log(symmetricalCapitals[i]);
}

// Challenge 6
// Add a value (your choice!) to the start of the following array and two values (of your choice) to the end simply by adding them in the following line, and then console.log out each value individually.
// 77 added at the start and 78, 79 at the end, right in the array
const fibonacciNumbers = [77, 1, 1, 2, 3, 5, 8, 13, 78, 79];


console.log('====challenge 6====')

for (let i = 0; i < fibonacciNumbers.length; i++) {
  console.log(fibonacciNumbers[i]);
}


// Challenge 7
// Make a NEW array with 5 values of your choice, using the same syntax as the array creation from the previous 6 challenges; that is, every value should be placed within the square brackets.  Now console.log out each value individually.


console.log('====challenge 7====')


const whyAmIMakingThisArray = ['eat', 'healthy', 'or', 'get', 'fat'];

for (let i = 0; i < whyAmIMakingThisArray.length; i++) {
  console.log(whyAmIMakingThisArray[i]);
}


// Challenge 8
// Make a new EMPTY array and fill it with five values of your choice using BOTH .push AND .unshift, and then console.log out each value individually.


console.log('====challenge 8====')

const emptyArray = [];
emptyArray.push(4, 5);
emptyArray.unshift(1, 2, 3);

for (let i = 0; i < emptyArray.length; i++) {
  console.log(emptyArray[i]);
}


// Challenge 9
// Loop through the `students` array from Challenge 1, starting at index 3 and ending at index 10 (INCLUSIVE), logging out each value individually.


console.log('====challenge 9====')

for (let i = 3; i <= 10; i++) {
  console.log(students[i]);
}

// Challenge 10
// Loop through the `students` array from Challenge 1, making a COPY of the array, starting at index 3 and ending at index 10 (INCLUSIVE). This is very similar to string building; create a new array, loop through the old one, and put values from the original in the new one. Then log out each value of the copy individually.


console.log('====challenge 10====')

const newArray = [];

// build the copy...
for (let i = 3; i <= 10; i++) {
  newArray.push(students[i]);
}

// ...then log it
for (let i = 0; i < newArray.length; i++) {
  console.log(newArray[i]);
}

// Challenge 11
// Make a COPY of the `students` array *using .slice*, starting at index 3 and ending at index 10 (INCLUSIVE), then log out each value of the copy individually. THEN log out each value of the original array. Notice that the original array didn't get any values taken out of it, because `slice` does NOT modify the original array.

console.log('====challenge 11====')

// slice's end index is NOT included, so (3, 11) gives indexes 3 through 10
const students2 = students.slice(3, 11);

for (let i = 0; i < students2.length; i++) {
  console.log(students2[i]);
}
console.log('=========');
for (let i = 0; i < students.length; i++) {
  console.log(students[i]);
}

// Challenge 12
// Pull the items at indices 4-6 (inclusive) from the following array using .splice (NOT .slice!), then console.log out each item from the ORIGINAL array. Note that .splice DOES change the original array.
const dinosaurs = ['Velociraptor', 'T-Rex', 'Stegosaurus', 'Triceratops', 'Dimetrodon', 'Allosaur', 'Spinosaurus', 'Gigantosaur']
 

console.log('====challenge 12====')


// remove 3 items starting at index 4 (indexes 4, 5 and 6)
dinosaurs.splice(4, 3);

for (let i = 0; i < dinosaurs.length; i++) {
  console.log(dinosaurs[i]);
}

// Challenge 13
// Use .join to change the dinosaur strings from the above array into one 
// string with a '*' string as the "separator". Then console.log out that string.

console.log('====challenge 13====')

const dinoJoin = dinosaurs.join('*');

console.log(dinoJoin);

// Challenge 14
// Use .reverse to reverse the dinosaur array and then log out the original array. .reverse DOES change the original array.


console.log('====challenge 14====')

dinosaurs.reverse();

for (let i = 0; i < dinosaurs.length; i++) {
  console.log(dinosaurs[i]);
}

// Challenge 15
// Use .concat to combine the following two arrays into a NEW array you make 
//(.concat RETURNS an array). Then console.log out each value of that new array 
//individually. Now console.log both the primaries and secondaries arrays, 
//noting that .concat does NOT mutate the original arrays.


console.log('====challenge 15====')

const primaries = ['red', 'yellow', 'blue'];
const secondaries = ['orange', 'green', 'purple'];
const thirdaries = primaries.concat(secondaries);

for (let i = 0; i < thirdaries.length; i++) {
  console.log(thirdaries[i]);
}

for (let i = 0; i < primaries.length; i++) {
  console.log(primaries[i]);
}

for (let i = 0; i < secondaries.length; i++) {
  console.log(secondaries[i]);
}