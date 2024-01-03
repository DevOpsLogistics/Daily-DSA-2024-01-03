/**
 * @param {number[][]} grid
 * @return {number}
 */
function findMaximumANDPath(grid) {
    const n = grid.length;
    let result = 0;

    /**
     * Helper function to check if a path exists where every number
     * in the path contains all the bits set in 'targetMask'.
     * @param {number} targetMask
     * @return {boolean}
     */
    const canReachTarget = (targetMask) => {
        // If the start or end cell doesn't satisfy the mask, path is impossible
        if ((grid[0][0] & targetMask) !== targetMask) return false;

        const dp = Array.from({ length: n }, () => new Array(n).fill(false));
        dp[0][0] = true;

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (i === 0 && j === 0) continue;
                
                // A cell is reachable only if it satisfies the bitmask requirement
                // and we can come from the top or left cell.
                if ((grid[i][j] & targetMask) === targetMask) {
                    const fromAbove = i > 0 ? dp[i - 1][j] : false;
                    const fromLeft = j > 0 ? dp[i][j - 1] : false;
                    dp[i][j] = fromAbove || fromLeft;
                }
            }
        }

        return dp[n - 1][n - 1];
    };

    // Greedy approach: check bits from Most Significant to Least Significant
    // We try to keep higher bits set in our result whenever possible.
    for (let bit = 30; bit >= 0; bit--) {
        let candidateMask = result | (1 << bit);
        if (canReachTarget(candidateMask)) {
            result = candidateMask;
        }
    }

    return result;
}