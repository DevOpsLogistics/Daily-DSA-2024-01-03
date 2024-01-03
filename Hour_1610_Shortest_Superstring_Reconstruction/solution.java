import java.util.*;

class Solution {
    public String shortestSuperstring(String[] words) {
        int n = words.length;
        int[][] overlap = new int[n][n];
        
        // Precompute overlaps: overlap[i][j] is length of suffix of words[i] 
        // that matches prefix of words[j]
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (i == j) continue;
                int m = Math.min(words[i].length(), words[j].length());
                for (int k = m; k >= 0; k--) {
                    if (words[i].endsWith(words[j].substring(0, k))) {
                        overlap[i][j] = k;
                        break;
                    }
                }
            }
        }

        // dp[mask][i] = min length of superstring using strings in mask, ending with words[i]
        int[][] dp = new int[1 << n][n];
        int[][] parent = new int[1 << n][n];
        for (int[] row : dp) Arrays.fill(row, 1000000);

        for (int i = 0; i < n; i++) {
            dp[1 << i][i] = words[i].length();
        }

        for (int mask = 1; mask < (1 << n); mask++) {
            for (int i = 0; i < n; i++) {
                if ((mask & (1 << i)) == 0) continue;
                for (int j = 0; j < n; j++) {
                    if ((mask & (1 << j)) != 0) continue;
                    int nextMask = mask | (1 << j);
                    int val = dp[mask][i] + words[j].length() - overlap[i][j];
                    if (val < dp[nextMask][j]) {
                        dp[nextMask][j] = val;
                        parent[nextMask][j] = i;
                    }
                }
            }
        }

        // Find the end node of the shortest path
        int last = -1, minLen = 1000000;
        int fullMask = (1 << n) - 1;
        for (int i = 0; i < n; i++) {
            if (dp[fullMask][i] < minLen) {
                minLen = dp[fullMask][i];
                last = i;
            }
        }

        // Reconstruct the path
        StringBuilder sb = new StringBuilder();
        int currMask = fullMask;
        Deque<Integer> stack = new ArrayDeque<>();
        while (currMask > 0) {
            stack.push(last);
            int temp = currMask;
            currMask ^= (1 << last);
            last = parent[temp][last];
        }

        int first = stack.pop();
        sb.append(words[first]);
        while (!stack.isEmpty()) {
            int next = stack.pop();
            int over = overlap[first][next];
            sb.append(words[next].substring(over));
            first = next;
        }

        return sb.toString();
    }
}