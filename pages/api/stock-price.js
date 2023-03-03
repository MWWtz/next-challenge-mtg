import stockprice from "../../lib/stock-price";

console.log(stockprice);
export default function handler(req, res) {
  res.status(200).json(stockprice);
}
