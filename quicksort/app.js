function quickSortRecursive(input) {
  const arr = [...input];

  function medianOfThreeIndex(low, high) {
    const mid = low + Math.floor((high - low) / 2);
    const a = arr[low], b = arr[mid], c = arr[high];
    if ((a <= b && b <= c) || (c <= b && b <= a)) return mid;
    if ((b <= a && a <= c) || (c <= a && a <= b)) return low;
    return high;
  }

  function partition(low, high) {
    const pivotIdx = medianOfThreeIndex(low, high);
    [arr[pivotIdx], arr[high]] = [arr[high], arr[pivotIdx]];
    const pivot = arr[high];
    let i = low;
    for (let j = low; j < high; j++) {
      if (arr[j] <= pivot) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        i++;
      }
    }
    [arr[i], arr[high]] = [arr[high], arr[i]];
    return i;
  }

  function sort(low, high) {
    if (low >= high) return;
    const pivot = partition(low, high);
    sort(low, pivot - 1);
    sort(pivot + 1, high);
  }

  sort(0, arr.length - 1);
  return arr;
}

function parseInput(value) {
  if (!value.trim()) return [];
  const parts = value.split(',').map((token) => token.trim());
  if (parts.some((part) => part === '')) throw new Error('Invalid input: remove empty values.');
  const nums = parts.map(Number);
  if (nums.some((n) => Number.isNaN(n))) throw new Error('Invalid input: use numbers only.');
  return nums;
}

document.getElementById('sortButton').addEventListener('click', () => {
  const inputEl = document.getElementById('arrayInput');
  const resultEl = document.getElementById('result');
  const errorEl = document.getElementById('error');

  try {
    errorEl.textContent = '';
    const parsed = parseInput(inputEl.value);
    const sorted = quickSortRecursive(parsed);
    resultEl.textContent = `[${sorted.join(', ')}]`;
  } catch (error) {
    resultEl.textContent = '-';
    errorEl.textContent = error.message;
  }
});
