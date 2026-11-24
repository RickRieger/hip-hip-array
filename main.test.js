// Tests added during the 2026 cleanup (the assignment had no tests).
// 1. Run main.js like `node main.js` and check what each challenge prints.
// 2. Run it in a sandbox and check the arrays themselves, because some
//    mistakes (like a "copy" with empty slots) print correctly but are wrong.
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const file = path.join(__dirname, 'main.js');

// Split the printed output into { 1: [...lines], 2: [...lines], ... }
const output = execFileSync(process.execPath, [file], { encoding: 'utf8' }).trim().split(/\r?\n/);
const challenges = {};
let current = null;
for (const line of output) {
  const m = line.match(/^====challenge (\d+)====$/);
  if (m) {
    current = Number(m[1]);
    challenges[current] = [];
  } else if (current !== null) {
    challenges[current].push(line);
  }
}

// Run the script silently with its top-level `const`s turned into `var`s so we can inspect them
const sandbox = { console: { log() {} } };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(file, 'utf8').replace(/^const /gm, 'var '), sandbox);

const students = ['Tre', 'Sonny', 'Crystal', 'Ilyas', 'Greg', 'Fernando', 'Timothy', 'Patrick', 'Steve', 'Jimothy', 'Pat', 'Arnold', 'Andy'];
const index3to10 = students.slice(3, 11);

describe('printed output', () => {
  it('prints all 15 challenges', () => {
    expect(Object.keys(challenges).map(Number)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
  });

  it('1: every student', () => expect(challenges[1]).toEqual(students));
  it('2: grades backwards, 64 first and 100 last', () =>
    expect(challenges[2]).toEqual(['64', '83', '75', '110', '80', '100']));
  it('3: only the even positive numbers', () => expect(challenges[3]).toEqual(['2', '4', '102', '3000']));
  it('4: the four even numbers, including negatives', () => expect(challenges[4]).toEqual(['14', '-2', '-8', '4']));
  it('5: two removed from the start and one from the end', () =>
    expect(challenges[5]).toEqual(['I', 'M', 'O', 'T', 'U', 'V', 'W', 'X']));
  it('6: one added at the start and two at the end', () => {
    expect(challenges[6]).toHaveLength(10);
    expect(challenges[6].slice(1, 8)).toEqual(['1', '1', '2', '3', '5', '8', '13']);
  });
  it('7: five values of my choice', () => expect(challenges[7]).toHaveLength(5));
  it('8: five values', () => expect(challenges[8]).toHaveLength(5));
  it('9: students at indexes 3 to 10', () => expect(challenges[9]).toEqual(index3to10));
  it('10: the copy of indexes 3 to 10', () => expect(challenges[10]).toEqual(index3to10));
  it('11: the slice copy FIRST, then the original', () =>
    expect(challenges[11]).toEqual([...index3to10, '=========', ...students]));
  it('12: dinosaurs with indexes 4-6 spliced out', () =>
    expect(challenges[12]).toEqual(['Velociraptor', 'T-Rex', 'Stegosaurus', 'Triceratops', 'Gigantosaur']));
  it('13: one string joined with *', () =>
    expect(challenges[13]).toEqual(['Velociraptor*T-Rex*Stegosaurus*Triceratops*Gigantosaur']));
  it('14: the spliced dinosaurs reversed', () =>
    expect(challenges[14]).toEqual(['Gigantosaur', 'Triceratops', 'Stegosaurus', 'T-Rex', 'Velociraptor']));
  it('15: the combined array, then primaries, then secondaries', () =>
    expect(challenges[15]).toEqual([
      'red', 'yellow', 'blue', 'orange', 'green', 'purple',
      'red', 'yellow', 'blue',
      'orange', 'green', 'purple',
    ]));
});

describe('the arrays themselves', () => {
  it('2: looping backwards does not reverse the grades array', () => {
    expect(Array.from(sandbox.grades)).toEqual([100, 80, 110, 75, 83, 64]);
  });

  it('5 and 6: the values were changed right in the array literals', () => {
    expect(Array.from(sandbox.symmetricalCapitals)).toEqual(['I', 'M', 'O', 'T', 'U', 'V', 'W', 'X']);
    expect(sandbox.fibonacciNumbers).toHaveLength(10);
  });

  it('10: the copy has exactly 8 items and no empty slots', () => {
    const copy = sandbox.newArray;
    expect(copy).toHaveLength(8);
    expect(Object.keys(copy)).toHaveLength(8); // an empty slot has no key
    expect(Array.from(copy)).toEqual(index3to10);
  });

  it('11: slice did not change the original students array', () => {
    expect(Array.from(sandbox.students)).toEqual(students);
  });
});
