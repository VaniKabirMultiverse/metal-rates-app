export default async function handler(req, res) {
  try {
    const API_KEY = process.env.GOLD_API_KEY;

    const goldResponse = await fetch("https://www.goldapi.io/api/XAU/INR", {
      headers: {
        "x-access-token": API_KEY,
        "Content-Type": "application/json"
      }
    });

    const silverResponse = await fetch("https://www.goldapi.io/api/XAG/INR", {
      headers: {
        "x-access-token": API_KEY,
        "Content-Type": "application/json"
      }
    });

    const goldData = await goldResponse.json();
    const silverData = await silverResponse.json();

    res.status(200).json({
      api_key_exists: !!API_KEY,
      gold_status: goldResponse.status,
      silver_status: silverResponse.status,
      gold_response: goldData,
      silver_response: silverData
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
}
