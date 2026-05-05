export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { product_id, offset = 0, limit = 20, type = 'reviews' } = req.query;
  const API_KEY = 'lx_ak_3b73e5b1b750090137cd28d37823eb7e636f7a54507bb23ccde66d72450dc8f7';

  try {
    let url;
    let headers = {
      'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1)',
      'Accept': 'text/html,application/xhtml+xml,application/json'
    };

    if (type === 'stats') {
      url = `https://loox.io/api/v1/products/${product_id}?api_key=${API_KEY}`;
    } else if (type === 'dist') {
      url = `https://loox.io/api/v1/reviews/distribution?product_id=${product_id}&api_key=${API_KEY}`;
    } else {
      url = `https://loox.io/widget/ziW7w0O4wJ/reviews/${product_id}?limit=${limit}&offset=${offset}&default_tab=automatic&language=en`;
    }

    const response = await fetch(url, { headers });
    const text = await response.text();
    return res.status(200).send(text);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
