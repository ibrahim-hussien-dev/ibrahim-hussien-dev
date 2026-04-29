# 1. QuickSort Implementation

```js
/**
 * QuickSort (recursive) - returns a new sorted array (ascending)
 * Uses median-of-three pivot selection and 3-way partitioning for duplicates.
 */
function quickSortRecursive(input) {
  if (!Array.isArray(input)) {
    throw new TypeError("Input must be an array of numbers.");
  }

  const arr = [...input];
  if (arr.length <= 1) return arr;

  for (const value of arr) {
    if (typeof value !== "number" || Number.isNaN(value)) {
      throw new TypeError("All array items must be valid numbers.");
    }
  }

  function medianOfThreeIndex(a, b, c) {
    if ((a - b) * (c - a) >= 0) return 0;
    if ((b - a) * (c - b) >= 0) return 1;
    return 2;
  }

  function sort(subArr) {
    if (subArr.length <= 1) return subArr;

    const first = subArr[0];
    const mid = subArr[Math.floor(subArr.length / 2)];
    const last = subArr[subArr.length - 1];
    const pivotCandidates = [first, mid, last];
    const pivot = pivotCandidates[medianOfThreeIndex(first, mid, last)];

    const less = [];
    const equal = [];
    const greater = [];

    for (const item of subArr) {
      if (item < pivot) less.push(item);
      else if (item > pivot) greater.push(item);
      else equal.push(item);
    }

    return [...sort(less), ...equal, ...sort(greater)];
  }

  return sort(arr);
}

/**
 * QuickSort (iterative, in-place) - bonus version
 * Uses Lomuto partition and an explicit stack to avoid recursive call depth limits.
 */
function quickSortIterative(input) {
  if (!Array.isArray(input)) {
    throw new TypeError("Input must be an array of numbers.");
  }

  const arr = [...input];
  for (const value of arr) {
    if (typeof value !== "number" || Number.isNaN(value)) {
      throw new TypeError("All array items must be valid numbers.");
    }
  }

  function partition(low, high) {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (arr[j] <= pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
  }

  const stack = [[0, arr.length - 1]];

  while (stack.length > 0) {
    const [low, high] = stack.pop();
    if (low >= high) continue;

    const pivotIndex = partition(low, high);

    if (pivotIndex - 1 > low) stack.push([low, pivotIndex - 1]);
    if (pivotIndex + 1 < high) stack.push([pivotIndex + 1, high]);
  }

  return arr;
}
```

---

# 2. Explanation

## Simple explanation
QuickSort works like this:
1. Pick one number from the array (called the **pivot**).
2. Split the other numbers into:
   - smaller than pivot
   - equal to pivot
   - bigger than pivot
3. Do the same process on the smaller and bigger groups.
4. Combine everything: smaller + equal + bigger.

It keeps dividing until each part has 0 or 1 item, which is already sorted.

## Technical explanation
QuickSort is a divide-and-conquer sorting algorithm:
- **Divide:** partition array around a pivot.
- **Conquer:** recursively sort left and right partitions.
- **Combine:** concatenation (for out-of-place) or naturally ordered segments (in-place).

### Partitioning logic
- In 3-way partitioning:
  - `less[]` holds values `< pivot`
  - `equal[]` holds values `=== pivot`
  - `greater[]` holds values `> pivot`
- This is efficient when duplicates are frequent.

### Pivot selection strategies
1. **First element**: simple, but bad for sorted inputs.
2. **Last element**: common with Lomuto partition.
3. **Random pivot**: reduces chance of worst case.
4. **Median-of-three** *(used in recursive version)*: picks median of first/middle/last; often improves practical performance.

### Time and space complexity
- **Best case:** `O(n log n)`
- **Average case:** `O(n log n)`
- **Worst case:** `O(n^2)` (poor pivot splits)
- **Space:**
  - Recursive (out-of-place above): `O(n)` extra (arrays) + recursion stack
  - In-place recursive quicksort: average stack `O(log n)`, worst `O(n)`
  - Iterative in-place: stack-based, avoids call-stack overflow

---

# 3. Comparison Table

| Algorithm | Best Time | Avg Time | Worst Time | Extra Space | Stable | Typical Real-World Use |
|---|---:|---:|---:|---:|---|---|
| QuickSort | O(n log n) | O(n log n) | O(n²) | O(log n) stack (in-place avg) | No | General-purpose high-performance sorting, systems code |
| MergeSort | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes | Stable sorting, linked lists, external sorting (disk) |
| HeapSort | O(n log n) | O(n log n) | O(n log n) | O(1) | No | Memory-constrained environments requiring worst-case guarantees |
| Built-in `sort()` (JS) | Engine-dependent (typically O(n log n)) | O(n log n) | O(n log n) typical | Engine-dependent | Usually stable in modern engines | Production app sorting with optimized engine internals |

---

# 4. Test Cases

```js
function arraysEqual(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function runQuickSortTests() {
  const testCases = [
    { name: "Normal case", input: [5, 3, 8, 4, 2], expected: [2, 3, 4, 5, 8] },
    { name: "Empty array", input: [], expected: [] },
    { name: "Single element", input: [42], expected: [42] },
    { name: "Already sorted", input: [1, 2, 3, 4, 5], expected: [1, 2, 3, 4, 5] },
    { name: "Reverse sorted", input: [5, 4, 3, 2, 1], expected: [1, 2, 3, 4, 5] },
    { name: "With duplicates", input: [4, 2, 4, 1, 2, 4], expected: [1, 2, 2, 4, 4, 4] },
    { name: "Negative values", input: [0, -1, 7, -3, 2], expected: [-3, -1, 0, 2, 7] }
  ];

  const results = [];

  for (const t of testCases) {
    const recursiveOut = quickSortRecursive(t.input);
    const iterativeOut = quickSortIterative(t.input);
    const recursivePass = arraysEqual(recursiveOut, t.expected);
    const iterativePass = arraysEqual(iterativeOut, t.expected);

    results.push({
      name: t.name,
      recursivePass,
      iterativePass,
      recursiveOut,
      iterativeOut
    });
  }

  // Stress test
  const size = 100000;
  const stressInput = Array.from({ length: size }, () => Math.floor(Math.random() * 1_000_000));
  const start = performance.now();
  const sortedStress = quickSortIterative(stressInput);
  const end = performance.now();

  let stressValid = true;
  for (let i = 1; i < sortedStress.length; i++) {
    if (sortedStress[i - 1] > sortedStress[i]) {
      stressValid = false;
      break;
    }
  }

  return {
    results,
    stress: {
      size,
      sortedCorrectly: stressValid,
      timeMs: Number((end - start).toFixed(2))
    }
  };
}
```

### Sample output
```js
{
  results: [
    { name: 'Normal case', recursivePass: true, iterativePass: true, ... },
    { name: 'Empty array', recursivePass: true, iterativePass: true, ... },
    ...
  ],
  stress: { size: 100000, sortedCorrectly: true, timeMs: 78.41 }
}
```

---

# 5. Debugging Section

## Bug 1: Missing base case (infinite recursion risk)
### Buggy code
```js
function brokenQuickSort(arr) {
  // Missing: if (arr.length <= 1) return arr;
  const pivot = arr[0];
  const left = arr.filter(x => x < pivot);
  const right = arr.filter(x => x >= pivot);
  return [...brokenQuickSort(left), pivot, ...brokenQuickSort(right)];
}
```
### Issue
Without base case, recursion never stops for empty or single-item partitions.

### Fixed version
```js
function fixedQuickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[0];
  const left = arr.slice(1).filter(x => x < pivot);
  const right = arr.slice(1).filter(x => x >= pivot);
  return [...fixedQuickSort(left), pivot, ...fixedQuickSort(right)];
}
```

## Bug 2: Wrong partition boundary
### Buggy code
```js
for (let j = low; j <= high; j++) { // should be j < high
  if (arr[j] <= pivot) {
    i++;
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
```
### Issue
Loop includes the pivot index (`high`), corrupting partition logic and causing incorrect swaps.

### Fixed version
```js
for (let j = low; j < high; j++) {
  if (arr[j] <= pivot) {
    i++;
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
```

## Bug 3: Lexicographic built-in sort bug
### Buggy code
```js
[10, 2, 30].sort(); // -> [10, 2, 30]
```
### Issue
Default JS sort compares strings, not numbers.

### Fixed version
```js
[10, 2, 30].sort((a, b) => a - b); // -> [2, 10, 30]
```

---

# 6. Web UI Code

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>QuickSort Demo</title>
  <style>
    :root {
      --bg: #0f172a;
      --card: #1e293b;
      --text: #e2e8f0;
      --accent: #22d3ee;
      --error: #f87171;
      --ok: #4ade80;
    }
    body {
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;
      background: linear-gradient(135deg, #0f172a, #111827);
      font-family: Inter, system-ui, sans-serif;
      color: var(--text);
    }
    .card {
      width: min(700px, 92vw);
      background: var(--card);
      border: 1px solid #334155;
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
    }
    h1 { margin: 0 0 8px; font-size: 1.4rem; }
    p { margin: 0 0 16px; color: #94a3b8; }
    input {
      width: 100%;
      padding: 12px;
      border-radius: 10px;
      border: 1px solid #475569;
      background: #0b1220;
      color: var(--text);
      font-size: 0.95rem;
      box-sizing: border-box;
    }
    button {
      margin-top: 12px;
      padding: 10px 14px;
      border: none;
      border-radius: 10px;
      background: var(--accent);
      color: #06202a;
      font-weight: 700;
      cursor: pointer;
    }
    .output {
      margin-top: 16px;
      padding: 12px;
      border-radius: 10px;
      background: #0b1220;
      border: 1px solid #334155;
      min-height: 42px;
      white-space: pre-wrap;
    }
    .error { color: var(--error); }
    .success { color: var(--ok); }
  </style>
</head>
<body>
  <main class="card">
    <h1>QuickSort Playground</h1>
    <p>Enter numbers separated by commas. Example: <code>5, 3, 8, 4, 2</code></p>

    <input id="arrayInput" type="text" placeholder="e.g. 5, 3, 8, 4, 2" />
    <button id="sortBtn">Sort</button>

    <div id="output" class="output"></div>
  </main>

  <script>
    function quickSortRecursive(input) {
      const arr = [...input];
      if (arr.length <= 1) return arr;

      const pivot = arr[Math.floor(arr.length / 2)];
      const less = [];
      const equal = [];
      const greater = [];

      for (const num of arr) {
        if (num < pivot) less.push(num);
        else if (num > pivot) greater.push(num);
        else equal.push(num);
      }

      return [...quickSortRecursive(less), ...equal, ...quickSortRecursive(greater)];
    }

    function parseInput(value) {
      if (!value.trim()) return [];
      const parts = value.split(",").map(s => s.trim());
      const numbers = parts.map(part => Number(part));
      if (numbers.some(n => Number.isNaN(n))) {
        throw new Error("Invalid input: use comma-separated numbers only.");
      }
      return numbers;
    }

    const inputEl = document.getElementById("arrayInput");
    const outputEl = document.getElementById("output");
    const sortBtn = document.getElementById("sortBtn");

    sortBtn.addEventListener("click", () => {
      try {
        const numbers = parseInput(inputEl.value);
        const sorted = quickSortRecursive(numbers);
        outputEl.className = "output success";
        outputEl.textContent = `Sorted: [${sorted.join(", ")}]`;
      } catch (error) {
        outputEl.className = "output error";
        outputEl.textContent = error.message;
      }
    });
  </script>
</body>
</html>
```
