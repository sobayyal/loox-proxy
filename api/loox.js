export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { product_id, offset = 0, limit = 20, type = 'reviews' } = req.query;

  try {
    let url;
    if (type === 'dist') {
      url = `https://loox.io/widget/ziW7w0O4wJ/dist/${product_id}`;
    } else {
      url = `https://loox.io/widget/ziW7w0O4wJ/reviews/${product_id}?limit=${limit}&offset=${offset}&default_tab=automatic&language=en`;
    }

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1)',
        'Accept': 'text/html,application/xhtml+xml'
      }
    });
    const html = await response.text();
    return res.status(200).send(html);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
