export default async function handler(req, res) {
  try {
    const goldResponse = await fetch("https://api.gold-api.com/price/XAU");
    const silverResponse = await fetch("https://api.gold-api.com/price/XAG");

    const goldData = await goldResponse.json();
    const silverData = await silverResponse.json();

    const gold24k = goldData.price;
    const silver = silverData.price;

    res.status(200).json({
      gold_24k_per_gram: Math.round(gold24k),
      gold_22k_per_gram: Math.round(gold24k * 0.916),
      gold_18k_per_gram: Math.round(gold24k * 0.75),
      silver_per_gram: Math.round(silver)
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
