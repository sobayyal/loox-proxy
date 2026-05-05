export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const PUBLIC_STORE_ID = 'ziW7w0O4wJ.b03ea943edf5f13aeb92373c039827c4da0589f14e31a469477525e39c57ca64';
  const { product_id, page = 1, limit = 10, type = 'reviews' } = req.query;

  try {
    let url;
    if (type === 'bottomline') {
      url = `https://storefrontapi.loox.io/storefront/v1/store/${PUBLIC_STORE_ID}/product-reviews/bottomline/${product_id}`;
    } else {
      url = `https://storefrontapi.loox.io/storefront/v1/store/${PUBLIC_STORE_ID}/product-reviews?product_id=${product_id}&page=${page}&limit=${limit}&sort=featured`;
    }

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Origin': 'https://nobltravel.myshopify.com'
      }
    });
    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
