export function numberWithCommas(x) {
  if (x === null || x === undefined) return "Rs. 0";
  return `Rs. ${x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}
