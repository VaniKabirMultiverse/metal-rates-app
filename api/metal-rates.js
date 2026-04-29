export default async function handler(req, res) {
  try {
    const goldResponse = await fetch("https://api.gold-api.com/price/XAU");
    const silverResponse = await fetch("https://api.gold-api.com/price/XAG");
    const fxResponse = await fetch("https://api.frankfurter.app/latest?from=USD&to=INR");

    const goldData = await goldResponse.json();
    const silverData = await silverResponse.json();
    const fxData = await fxResponse.json();

    const usdToInr = fxData.rates.INR;

    const gold24 = (goldData.price * usdToInr) / 31.1035;
    const silver = (silverData.price * usdToInr) / 31.1035;

    res.status(200).json({
      gold_24k_per_gram: Math.round(gold24),
      gold_22k_per_gram: Math.round(gold24 * 0.916),
      gold_18k_per_gram: Math.round(gold24 * 0.75),
      silver_per_gram: Math.round(silver),
      usd_inr: usdToInr
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
