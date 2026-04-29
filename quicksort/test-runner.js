const { quickSortRecursive, quickSortIterative } = require('./quicksort');

function arraysEqual(a, b) {
  return a.length === b.length && a.every((value, idx) => value === b[idx]);
}

function runTestCase(name, input, expected) {
  const recursiveResult = quickSortRecursive(input);
  const iterativeResult = quickSortIterative(input);

  const recursiveOk = arraysEqual(recursiveResult, expected);
  const iterativeOk = arraysEqual(iterativeResult, expected);

  const status = recursiveOk && iterativeOk ? 'PASS' : 'FAIL';
  console.log(`[${status}] ${name}`);
  if (!recursiveOk || !iterativeOk) {
    console.log('  input      :', input);
    console.log('  expected   :', expected);
    console.log('  recursive  :', recursiveResult);
    console.log('  iterative  :', iterativeResult);
  }
}

function generateRandomArray(size, min = -100000, max = 100000) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

function main() {
  runTestCase('Normal case', [5, 3, 8, 4, 2], [2, 3, 4, 5, 8]);
  runTestCase('Empty array', [], []);
  runTestCase('Duplicates', [4, 2, 4, 1, 2, 4], [1, 2, 2, 4, 4, 4]);
  runTestCase('Already sorted', [1, 2, 3, 4, 5], [1, 2, 3, 4, 5]);
  runTestCase('Single element', [7], [7]);

  const stressInput = generateRandomArray(50000);
  const expected = [...stressInput].sort((a, b) => a - b);

  const start = Date.now();
  const actual = quickSortRecursive(stressInput);
  const duration = Date.now() - start;

  const ok = arraysEqual(actual, expected);
  console.log(`[${ok ? 'PASS' : 'FAIL'}] Stress test (50,000 items) in ${duration}ms`);
}

main();
