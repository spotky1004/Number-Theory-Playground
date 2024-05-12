/**
 * @param {number} n 
 * @param {number} m 
*/
export default function factMod(n, m) {
  if (m < 1.8e8) {
    const mul = (x, y) => {
      const xl = x >> 1, xr = x - xl, yl = y >> 1, yr = y - yl;
      let out = xl * yl + xl * yr + xr * yl;
      out -= m * Math.floor(out / m);
      out += xr * yr;
      out -= m * Math.floor(out / m);
      return out;
    }
  
    let out = 1;
    for (let i = 2; i <= n; i += 2) {
      out = mul(out, mul(i, i - 1));
    }
    for (let i = Math.floor(n / 2) * 2 + 1; i <= n; i++) {
      out = mul(out, i);
    }
  
    return out % P;
  } else {
    let out = 1n;
    const bigN = BigInt(n);
    const bigM = BigInt(m);
    for (let i = 2n; i <= bigN; i++) {
      out = (out * i) % bigM;
    }
    return Number(out % bigM);
  }
}
