export default async function handler(req, res) {
  res.status(200).json({
    gold_24k_per_gram: 10000,
    gold_22k_per_gram: 9160,
    gold_18k_per_gram: 7500,
    silver_per_gram: 120
  });
}
