/**
 * QuickSort utilities with recursive + iterative implementations.
 */

function medianOfThreeIndex(arr, low, high) {
  const mid = low + Math.floor((high - low) / 2);
  const a = arr[low];
  const b = arr[mid];
  const c = arr[high];

  if ((a <= b && b <= c) || (c <= b && b <= a)) return mid;
  if ((b <= a && a <= c) || (c <= a && a <= b)) return low;
  return high;
}

function partitionLomuto(arr, low, high, choosePivotIndex = medianOfThreeIndex) {
  const pivotIndex = choosePivotIndex(arr, low, high);
  [arr[pivotIndex], arr[high]] = [arr[high], arr[pivotIndex]];

  const pivotValue = arr[high];
  let i = low;

  for (let j = low; j < high; j += 1) {
    if (arr[j] <= pivotValue) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i += 1;
    }
  }

  [arr[i], arr[high]] = [arr[high], arr[i]];
  return i;
}

function quickSortRecursive(input) {
  if (!Array.isArray(input)) {
    throw new TypeError('Input must be an array of numbers.');
  }

  const arr = [...input];

  function sort(low, high) {
    if (low >= high) return;

    const pivot = partitionLomuto(arr, low, high);
    sort(low, pivot - 1);
    sort(pivot + 1, high);
  }

  sort(0, arr.length - 1);
  return arr;
}

function quickSortIterative(input) {
  if (!Array.isArray(input)) {
    throw new TypeError('Input must be an array of numbers.');
  }

  const arr = [...input];
  if (arr.length <= 1) return arr;

  const stack = [[0, arr.length - 1]];

  while (stack.length > 0) {
    const [low, high] = stack.pop();
    if (low >= high) continue;

    const pivot = partitionLomuto(arr, low, high);

    const leftSize = pivot - 1 - low;
    const rightSize = high - (pivot + 1);

    if (leftSize > rightSize) {
      stack.push([low, pivot - 1]);
      stack.push([pivot + 1, high]);
    } else {
      stack.push([pivot + 1, high]);
      stack.push([low, pivot - 1]);
    }
  }

  return arr;
}

module.exports = {
  medianOfThreeIndex,
  partitionLomuto,
  quickSortRecursive,
  quickSortIterative,
};
