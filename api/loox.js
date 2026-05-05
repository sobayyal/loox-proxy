export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { product_id, offset = 0, limit = 20, type = 'reviews' } = req.query;
  const API_KEY = 'lx_ak_3b73e5b1b750090137cd28d37823eb7e636f7a54507bb23ccde66d72450dc8f7';

  try {
    let url;
    if (type === 'stats') {
      url = `https://api.loox.app/storefront/v1/products/${product_id}`;
    } else if (type === 'reviews') {
      url = `https://api.loox.app/storefront/v1/reviews?product_id=${product_id}&page=${Math.floor(offset/limit)+1}&per_page=${limit}`;
    } else {
      url = `https://loox.io/widget/ziW7w0O4wJ/reviews/${product_id}?limit=${limit}&offset=${offset}&default_tab=automatic&language=en`;
    }

    const response = await fetch(url, {
      headers: {
        'x-loox-access-token': API_KEY,
        'Content-Type': 'application/json'
      }
    });
    const text = await response.text();
    return res.status(200).send(text);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
