import dft from "./dft.js";

/**
 * @param {bigint} a 
 * @param {bigint} b 
 * @param {bigint} m 
*/
export default function multiply(a, b, m) {
  // bigint multiply is too slow!
  const mul = dft(Array.from(a.toString()).reverse().map(Number), Array.from(b.toString()).reverse().map(Number));
  /** @type {number[]} */
  const out = Array(2000020).fill(0);
  for (let i = 0; i < mul.length; i++) {
    const value = out[i] + mul[i];
    out[i] = value % 10;
    let rem = (value - value % 10) / 10;
    let d = 1;
    while (0 < rem) {
      out[i + d] += rem % 10;
      rem = (rem - rem % 10) / 10;
      d++;
    }
  }
  while (out[out.length - 1] === 0) out.pop();
  if (out.length === 0) out.push(0);

  return BigInt(out.reverse().join("")) % m;
}
