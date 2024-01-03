# Minimum Range of K-Subarray Sums

**Language:** JavaScript | **Date:** 2024-01-03 15:24

## Description
Given an array of positive integers `nums` and an integer `k`, you need to partition the array into exactly `k` contiguous subarrays. Let the sums of these `k` subarrays be S1, S2, ..., Sk. Your goal is to minimize the difference between the maximum and the minimum of these sums, i.e., minimize (max(Si) - min(Si)) for i from 1 to k.

Constraints:
- 1 <= nums.length <= 50
- 1 <= k <= nums.length
- 1 <= nums[i] <= 10^6

Example 1:
Input: nums = [3, 1, 4, 2, 2, 1], k = 3
Output: 1
Explanation: The optimal partition is [3, 1], [4], [2, 2, 1]. The sums are 4, 4, and 5. The difference is 5 - 4 = 1.

Example 2:
Input: nums = [10, 10, 10, 10], k = 2
Output: 0
Explanation: Partition as [10, 10], [10, 10]. Sums are 20, 20. Difference is 0.

## Explanation
This problem is solved using Dynamic Programming combined with a search over possible minimum sums. 

1. First, we observe that the minimum subarray sum (S_min) must be equal to the sum of some contiguous subarray in the input. There are at most O(N^2) such possible sums.
2. We iterate through each unique subarray sum and treat it as a fixed lower bound (S_min). 
3. For a fixed S_min, we need to find a partition into K subarrays such that every subarray sum is >= S_min and the maximum subarray sum (S_max) is minimized. 
4. We use DP: dp[j][i] is the minimum possible S_max using j subarrays for the first i elements. The transition checks all previous split points p and ensures the new subarray sum(p, i-1) is at least S_min.
5. The overall complexity is O(N^2 * K * N^2) = O(K * N^4). Given N=50 and K=50, this results in approximately 31 million operations, which is efficient enough for JavaScript engines like V8.
