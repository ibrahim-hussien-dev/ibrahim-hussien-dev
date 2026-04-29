1. QuickSort Implementation
- See `quicksort.js` for recursive and iterative implementations.
- Includes median-of-three pivot selection and Lomuto partitioning.

2. Explanation
Simple:
QuickSort picks a pivot, then places smaller numbers to the left and bigger numbers to the right. It repeats that idea on each side until everything is ordered.

Technical:
- Partitioning scans once and places the pivot at its final sorted index.
- Recurrence: T(n) = T(k) + T(n-k-1) + O(n).
- Median-of-three pivot reduces chance of consistently poor partitions on partially sorted data.

Complexities:
- Best: O(n log n)
- Average: O(n log n)
- Worst: O(n^2)
- Extra space: O(log n) average recursion stack, O(n) worst recursion stack.

3. Comparison Table
| Algorithm | Best | Average | Worst | Extra Space | Stable | Typical Use |
|---|---|---|---|---|---|---|
| QuickSort | O(n log n) | O(n log n) | O(n^2) | O(log n) avg | No | In-memory fast general-purpose sort |
| MergeSort | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes | Linked lists, stable external sorting |
| HeapSort | O(n log n) | O(n log n) | O(n log n) | O(1) | No | Memory-constrained predictable performance |
| JS built-in sort() | Engine dependent | Engine dependent | Engine dependent | Engine dependent | Usually stable in modern engines | Production convenience for many workloads |

4. Test Cases
- Implemented in `test-runner.js`:
  - Normal case
  - Empty array
  - Duplicates
  - Already sorted
  - Single element
  - Stress test (50,000 random items)

5. Debugging Section
Bug #1 (off-by-one):
```js
for (let j = low; j <= high; j++) { ... }
```
Issue: includes pivot index in loop and corrupts partition invariants.
Fix:
```js
for (let j = low; j < high; j++) { ... }
```

Bug #2 (lost right side recursion):
```js
sort(low, pivot - 1);
sort(pivot, high);
```
Issue: pivot can repeat and cause infinite recursion.
Fix:
```js
sort(low, pivot - 1);
sort(pivot + 1, high);
```

Bug #3 (string compare in sort baseline):
```js
arr.sort();
```
Issue: lexical ordering (`10` before `2`).
Fix:
```js
arr.sort((a, b) => a - b);
```

6. Web UI Code
- Implemented with `index.html`, `style.css`, and `app.js`.
- Provides input validation, sort button, and sorted output rendering.
