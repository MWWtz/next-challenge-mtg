import stockprice from "../../lib/stock-price";

export default function handler(req, res) {
  res.status(200).json(stockprice);
}
