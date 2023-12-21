/**
 * @typedef {[divisor: bigint, divisorFactors: [factor: bigint, pow: bigint][]]} Divisor 
 */

/**
 * @param {bigint[]} factors 
 * @returns {Divisor[]} 
*/
export default function calcDivisors(factors) {
  /** @type {Divisor[]} */
  const divisors = [];
  const factorCounts = [];
  for (const factor of [...factors].sort((a, b) => Number(a - b))) {
    if ((factorCounts[factorCounts.length - 1] ?? [])[0] !== factor) {
      factorCounts.push([factor, 1n]);
    } else {
      factorCounts[factorCounts.length - 1][1]++;
    }
  }

  const len = factorCounts.reduce((a, b) => a * (b[1] + 1n), 1n);
  const divs = [1n];
  for (const [, count] of factorCounts) {
    divs.push(divs[divs.length - 1] * (count + 1n));
  }

  for (let i = 0n; i < len; i++) {
    let divisor = 1n;

    const divisorFactors = [];
    for (let j = 0; j < factorCounts.length; j++) {
      const [factor, count] = factorCounts[j];
      const pow = (i / divs[j]) % (count + 1n);
      if (pow === 0n) continue;

      divisor *= factor**pow;
      divisorFactors.push([factor, pow]);
    }

    divisors.push([divisor, divisorFactors]);
  }

  return divisors.sort((a, b) => Number(a[0] - b[0]));
}
