# Shortest Superstring Reconstruction

**Language:** Java | **Date:** 2024-01-03 16:10

## Description
Given an array of n strings 'words', find the shortest string that contains every string in 'words' as a substring. If there are multiple valid strings of the minimum length, return any of them.

You may assume that no string in 'words' is a substring of another string in 'words'.

Example 1:
Input: words = ["alex","loves","leetcode"]
Output: "alexlovesleetcode"
Explanation: All permutations of "alex", "loves", "leetcode" would work.

Example 2:
Input: words = ["catg","ctaagt","gcta","ttca","atgcatc"]
Output: "gctaagttcatgcatc"

Constraints:
1 <= words.length <= 12
1 <= words[i].length <= 20
words[i] consists of lowercase English letters.

## Explanation
This problem is a variation of the Traveling Salesperson Problem (TSP), which is NP-Hard. Since the number of strings is small (N <= 12), we can use Dynamic Programming with Bitmasking. 
1. Precompute 'overlap[i][j]': the maximum length of the suffix of words[i] that is also a prefix of words[j].
2. Define 'dp[mask][i]' as the minimum length of a superstring that contains all words represented by the set bits in 'mask', ending with 'words[i]'.
3. Transition: For every mask and every string 'i' in the mask, try adding a string 'j' not in the mask. The new length is dp[mask][i] + length(words[j]) - overlap[i][j].
4. Complexity: Time O(N^2 * 2^N) to iterate through all states and transitions. Space O(N * 2^N) to store the DP table. Precomputing overlaps takes O(N^2 * L^2) where L is max word length.
