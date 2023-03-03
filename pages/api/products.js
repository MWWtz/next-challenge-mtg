import products from "../../lib/products";

export default function handler(req, res) {
  res.status(200).json(products);
}
