import numeral from "numeral";

// ----------------------------------------------------------------------

export function formatPriceInVND(price: number): string {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return formatter.format(price);
}

export function fNumber(number: number) {
  return numeral(number).format();
}
