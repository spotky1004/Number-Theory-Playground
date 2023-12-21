/**
 * @param {number} n
 * @param {number} p
*/
export default function genFactroialMod(n, p) {
  n = BigInt(n);
  p = BigInt(p);
  
  const arr = [1];
  let out = 1n;
  for (let i = 1n; i <= BigInt(n); i++) {
    out = (out*i) % p;
    arr.push(Number(out));
  }

  return arr;
}
