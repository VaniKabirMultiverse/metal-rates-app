export default async function handler(req, res) {
  try {
    const API_KEY = process.env.GOLD_API_KEY;

    const goldResponse = await fetch("https://www.goldapi.io/api/XAU/INR", {
      headers: { "x-access-token": API_KEY }
    });

    const silverResponse = await fetch("https://www.goldapi.io/api/XAG/INR", {
      headers: { "x-access-token": API_KEY }
    });

    const goldData = await goldResponse.json();
    const silverData = await silverResponse.json();

    const gold24k = goldData.price / 31.1035;
    const silver = silverData.price / 31.1035;

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
