/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function minRangeKPartition(nums, k) {
    const n = nums.length;
    const prefixSum = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        prefixSum[i + 1] = prefixSum[i] + nums[i];
    }

    const getSum = (i, j) => prefixSum[j + 1] - prefixSum[i];

    // Collect all possible subarray sums to act as potential minimum sums
    const possibleMinSums = new Set();
    for (let i = 0; i < n; i++) {
        for (let j = i; j < n; j++) {
            possibleMinSums.add(getSum(i, j));
        }
    }

    const sortedMinSums = Array.from(possibleMinSums).sort((a, b) => a - b);
    const totalSum = prefixSum[n];
    let minDiff = Infinity;

    for (const sMin of sortedMinSums) {
        // Optimization: if sMin * k > totalSum, it's impossible to have k subarrays with sum >= sMin
        if (sMin * k > totalSum) break;

        // dp[j][i] = the minimum possible value of the maximum subarray sum 
        // when partitioning the first i elements into j subarrays,
        // such that each subarray sum is >= sMin.
        const dp = Array.from({ length: k + 1 }, () => new Array(n + 1).fill(Infinity));
        
        dp[0][0] = 0;

        for (let j = 1; j <= k; j++) {
            for (let i = 1; i <= n; i++) {
                // Try splitting at index p to form the j-th subarray from nums[p...i-1]
                for (let p = j - 1; p < i; p++) {
                    const currentSubSum = getSum(p, i - 1);
                    if (currentSubSum >= sMin && dp[j - 1][p] !== Infinity) {
                        const currentMax = Math.max(dp[j - 1][p], currentSubSum);
                        if (currentMax < dp[j][i]) {
                            dp[j][i] = currentMax;
                        }
                    }
                }
            }
        }

        if (dp[k][n] !== Infinity) {
            minDiff = Math.min(minDiff, dp[k][n] - sMin);
        }
    }

    return minDiff;
}