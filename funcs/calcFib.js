/**
 * @template {number | bigint} T 
 * @param {T[][]} a 
 * @param {T[][]} b 
 * @param {T} mod 
 * @returns {T[][]} 
*/
function matrixMult2x2(a, b, mod) {
  return [
    [
      (a[0][0] * b[0][0] + a[0][1] * b[1][0]) % mod,
      (a[0][0] * b[0][1] + a[0][1] * b[1][1]) % mod
    ],
    [
      (a[1][0] * b[0][0] + a[1][1] * b[1][0]) % mod,
      (a[1][0] * b[0][1] + a[1][1] * b[1][1]) % mod
    ]
  ];
}

/**
 * @param {bigint} n 
 * @param {bigint} mod 
 */
export default function calcFib(n, mod) {
  let fibMat = [
    [1n, 0n],
    [0n, 1n]
  ];
  let mul = [
    [1n, 1n],
    [1n, 0n]
  ];
  let bin = 1n;
  while (bin <= n) {
    if ((n & bin) !== 0n) {
      fibMat = matrixMult2x2(fibMat, mul, mod);
    }
    mul = matrixMult2x2(mul, mul, mod);
    bin *= 2n;
  }

  return fibMat[1][0];
}
