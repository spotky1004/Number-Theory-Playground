/**
 * @param {number} n 
 * @returns {number[]} 
 */
export default function genPhi(n) {
  const isPrime = Array(n + 1).fill(true);
  const primes = [];
  const phi = Array(n + 1).fill(0);
  phi[1] = 1;

  for (let i = 2; i <= n; i++) {
    if (isPrime[i]) {
      primes.push(i);
      phi[i] = i - 1;
    }
    for (const p of primes) {
      if (i * p > n) break;
      isPrime[i * p] = false;
      if (i % p === 0) {
        phi[i * p] = phi[i] * p;
      } else {
        phi[i * p] = phi[i] * phi[p];
      }
    }
  }

  return phi;
}
