# Maximum Bitwise AND Path in a Grid

**Language:** JavaScript | **Date:** 2024-01-03 14:02

## Description
You are given an n x n grid of non-negative integers. You start at the top-left cell (0, 0) and want to reach the bottom-right cell (n - 1, n - 1). You can only move either down or right at any point in time. The 'score' of a path is the bitwise AND of all the integers on that path. Your goal is to find the maximum possible score.

Example 1:
Input: grid = [[12, 10], [8, 14]]
Output: 8
Explanation:
Path 1: (0,0) -> (0,1) -> (1,1) => 12 & 10 & 14 = 8 (Binary: 1100 & 1010 & 1110 = 1000)
Path 2: (0,0) -> (1,0) -> (1,1) => 12 & 8 & 14 = 8 (Binary: 1100 & 1000 & 1110 = 1000)
The maximum score is 8.

Constraints:
- n == grid.length == grid[i].length
- 1 <= n <= 100
- 0 <= grid[i][j] < 2^31

## Explanation
The problem asks us to maximize the bitwise AND value of a path. A crucial property of the AND operation is that it is monotonic: (A & B) is always less than or equal to A. To maximize the final result, we should prioritize having the most significant bits set to 1.

Algorithm steps:
1. We use a greedy strategy by iterating through bit positions from 30 down to 0.
2. For each bit, we check if it is possible to form a path from (0,0) to (n-1, n-1) such that the bitwise AND of the path contains all bits currently in our 'result' plus the current 'bit'.
3. The condition for a cell (i, j) to be 'valid' for a specific bitmask is: (grid[i][j] & mask) === mask. This ensures the cell contains all the 1-bits we are trying to preserve.
4. We use Dynamic Programming to check reachability in O(N^2) time. dp[i][j] is true if there's a valid path to cell (i, j).

Complexity:
- Time Complexity: O(B * N^2), where B is the number of bits (31) and N is the grid size. For N=100, this is ~310,000 operations, which fits well within time limits.
- Space Complexity: O(N^2) to store the reachability DP table.
