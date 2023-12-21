/**
 * @template {number | bigint} T 
 * @param {T[][]} a 
 * @param {T[][]} b 
 * @returns {T[][]} 
*/
function matrixMult2x2(a, b) {
  return [
    [
      a[0][0] * b[0][0] + a[0][1] * b[1][0],
      a[0][0] * b[0][1] + a[0][1] * b[1][1]
    ],
    [
      a[1][0] * b[0][0] + a[1][1] * b[1][0],
      a[1][0] * b[0][1] + a[1][1] * b[1][1]
    ]
  ];
}

export default function calcFib(n, p) {
  // TODO
}
