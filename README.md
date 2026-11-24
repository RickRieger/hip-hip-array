# Hip Hip Array — Creating, Looping and Changing Arrays

[![Tests](https://github.com/RickRieger/hip-hip-array/actions/workflows/tests.yml/badge.svg)](https://github.com/RickRieger/hip-hip-array/actions/workflows/tests.yml)

A JavaScript exercise from the **Code Immersives** web development bootcamp in New York City (March 2021): **15 small challenges** on creating arrays, looping through them (forwards, backwards and over part of an array), and using the main array methods. Each challenge prints its result with `console.log`. This repo is my fork of the assignment. Everything is in [`main.js`](main.js), with the instructor's directions as comments above each challenge.

**Skills practiced:** `for` loops (forwards, backwards and over a range), `%` for even numbers, `.push` / `.unshift`, `.slice` vs. `.splice`, `.join`, `.reverse` and `.concat`, and which methods **change** the original array and which **return a new one**.

**Built with:** JavaScript (Node.js). The 2026 cleanup added Jest tests; the badge above shows whether they pass on GitHub.

---

## Contents

- [Run it](#run-it)
- [The 15 challenges](#the-15-challenges)
- [Methods that change the array vs. return a new one](#methods-that-change-the-array-vs-return-a-new-one)
- [Run the tests](#run-the-tests)
- [Cleanup log (November 2026)](#cleanup-log-november-2026)

---

## Run it

You need [Node.js](https://nodejs.org/).

```bash
git clone https://github.com/RickRieger/hip-hip-array.git
cd hip-hip-array
node main.js        # or: npm start
```

Each challenge prints a `====challenge N====` header followed by its output.

## The 15 challenges

Written on **2021-03-02** (commit *"finished"*). *(Described as they work after the 2026 cleanup; see the log below.)*

| # | Task | How |
|---|---|---|
| 1 | Print every student | `for (let i = 0; i < students.length; i++)` |
| 2 | Print grades **backwards** (64 first, 100 last) | Start at the last index and count down: `for (let i = grades.length - 1; i >= 0; i--)` |
| 3 | Print only even numbers | `if (positiveNumbers[i] % 2 === 0)`. An even number has remainder 0 when divided by 2 |
| 4 | Even numbers, including negatives | Same check; `-8 % 2` is `-0`, and `-0 === 0` is `true` |
| 5 | Remove 2 from the start and 1 from the end *by editing the array* | Delete them right in the brackets: `['I', 'M', 'O', 'T', 'U', 'V', 'W', 'X']` |
| 6 | Add 1 to the start and 2 to the end *by editing the array* | `[77, 1, 1, 2, 3, 5, 8, 13, 78, 79]` |
| 7 | Make an array of 5 values | `['eat', 'healthy', 'or', 'get', 'fat']` |
| 8 | Fill an empty array with **`.push` and `.unshift`** | `.push(4, 5)` adds to the end; `.unshift(1, 2, 3)` adds to the start → `[1, 2, 3, 4, 5]` |
| 9 | Print students at indexes 3–10 (inclusive) | `for (let i = 3; i <= 10; i++)` |
| 10 | **Copy** indexes 3–10 with a loop, then print the copy | `newArray.push(students[i])` inside the loop, then a second loop to print |
| 11 | Copy indexes 3–10 with **`.slice`**, print the copy, *then* the original | `students.slice(3, 11)`. The end index is **not** included |
| 12 | Remove indexes 4–6 with **`.splice`**, print the original | `dinosaurs.splice(4, 3)` means "starting at 4, remove 3 items" |
| 13 | Join the dinosaurs into one string with `*` | `dinosaurs.join('*')` |
| 14 | Reverse the dinosaurs, print the original | `dinosaurs.reverse()` |
| 15 | Combine two arrays with **`.concat`**, print the new one and both originals | `primaries.concat(secondaries)` |

## Methods that change the array vs. return a new one

This is the main idea challenges 11–15 are built to show:

| Changes the original array | Leaves the original alone, returns something new |
|---|---|
| `.push`, `.unshift`, `.pop`, `.splice`, `.reverse` | `.slice`, `.concat`, `.join` |

That's why challenge 11 prints the original after slicing (it's unchanged), while challenge 12 prints the original after splicing (it's shorter).

## Run the tests

```bash
npm ci
npm run test:ci   # runs all tests once and exits
npm test          # watch mode: re-runs on every save
```

Expected result: `Tests: 20 passed, 20 total`. [`main.test.js`](main.test.js) runs `node main.js` and checks what each challenge prints. It also runs the script in a sandbox to check the arrays themselves, catching mistakes that *print* correctly but are wrong underneath (see challenge 10 below). [`.github/workflows/tests.yml`](.github/workflows/tests.yml) runs the tests on GitHub after every push, and the badge at the top shows the result.

---

## Cleanup log (November 2026)

All changes below were made on **2026-11-24** on the branch `cleanup-and-tests`, checked by comparing the printed output before and after each step and by the new tests, and merged into `master`. Each is its own commit.

### 1. Challenge 10 made a real copy; challenge 11 prints in the right order

**Why (challenge 10):** the copy was built with `newArray[i] = students[i]` while `i` went from 3 to 10, so each name landed at its *original* index. The "copy" was **11 items long with 3 empty slots** at the start: `[ , , , 'Ilyas', 'Greg', …]`. It looked right on screen only because each value was printed as it was copied. `.push()` adds to the end, so the copy is now exactly the 8 names. It's printed in a separate loop afterwards, as the instructions say ("Then log out each value of the copy").

```js
// Before
const newArray = [];
for (i = 3; i < students.length && i < 11; i++){
  newArray[i]= students[i];      // index 3 → slot 3, index 4 → slot 4, ...
  console.log(newArray[i]);
}
// newArray: length 11, slots 0-2 empty

// After
const newArray = [];
for (let i = 3; i <= 10; i++){
  newArray.push(students[i]);    // always adds to the end
}
for (let i = 0; i < newArray.length; i++){
  console.log(newArray[i]);
}
// newArray: length 8, no empty slots
```

**Why (challenge 11):** the instructions say to print the slice copy first, *then* the original, to show that `.slice` didn't change it. It printed the original first. The two loops are now swapped.

### 2. Challenges 2, 5 and 6 done the way the instructions ask

**Why:**
- **Challenge 2** says to *loop backwards*. It called `grades.reverse()` and then looped forwards. The printout was the same, but it skipped the backwards-loop practice and permanently reversed `grades`. It now counts down from the last index.
- **Challenges 5 and 6** say to remove and add values *"simply by deleting / adding them in the following line"*, meaning by editing the array as it's written. They used `.splice`/`.pop` and `.unshift`/`.push`, which is the method practice saved for challenge 8. The array literals are edited directly now, keeping my chosen values (77 at the start, 78 and 79 at the end).

```js
// Before (challenge 2)
grades.reverse();
for (i = 0; i < grades.length; i++){ console.log(grades[i]); }

// After
for (let i = grades.length - 1; i >= 0; i--){ console.log(grades[i]); }

// Before (challenge 5)
const symmetricalCapitals = ['A', 'H', 'I', 'M', 'O', 'T', 'U', 'V', 'W', 'X', 'Y'];
symmetricalCapitals.splice(0,2);
symmetricalCapitals.pop();

// After
const symmetricalCapitals = ['I', 'M', 'O', 'T', 'U', 'V', 'W', 'X'];
```

The printed output was identical for all 15 challenges.

### 3. Declared loop variables with `let`, and tidied up

**Why:**
- **Every loop used `i` without declaring it** (`for (i = 0; …)`). That quietly creates a *global* variable shared by every loop in the file. In strict mode, which modern JavaScript modules use automatically, it's an error. I confirmed the original file fails with `ReferenceError: i is not defined` in strict mode. `let i` keeps each loop's counter to itself.
- **Challenges 9–10:** `i < students.length && i < 11` became `i <= 10`, which reads like the instructions ("ending at index 10, INCLUSIVE").
- **Removed a broken commented-out "Another solution"** for challenge 10. It had a typo (`i ,= 10`) and would have created a new empty array on every pass.
- **Formatting:** challenges 11–15 drifted further right with each loop, and there were blank lines inside loop bodies and long runs of empty lines.
- **Comments:** added to explain `.slice`'s end index and `.splice`'s (start, count) arguments.

```js
// Before
for (i = 0; i < thirdaries.length; i++){
  console.log(thirdaries[i]); 
   }

   for (i = 0; i < primaries.length; i++){
    console.log(primaries[i]); 
     }

// After
for (let i = 0; i < thirdaries.length; i++){
  console.log(thirdaries[i]);
}

for (let i = 0; i < primaries.length; i++){
  console.log(primaries[i]);
}
```

The printed output was identical.

### 4. Added tests and automatic test runs on GitHub

**Why:** the assignment had no tests, and two of the problems above (the holey copy and the reversed `grades`) don't show up in the printout at all. [`main.test.js`](main.test.js) checks every challenge's output *and* the arrays themselves. Against the original 2021 file, **3 of the 20 tests fail**, matching those problems plus the challenge 11 order. `package.json` adds Jest 29 and three commands: `npm start`, `npm test` and `npm run test:ci`. A GitHub Actions workflow runs the tests after every push.

### 5. Added this README

The repo had none; the instructions are the comments in `main.js`.
