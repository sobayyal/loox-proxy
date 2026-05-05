const express = require('express');
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  next();
});

app.get('/reviews', async (req, res) => {
  const { product_id, page = 1, per_page = 6 } = req.query;
  try {
    const response = await fetch(
      `https://api.loox.app/storefront/v1/reviews?product_id=${product_id}&page=${page}&per_page=${per_page}`,
      {
        headers: {
          'x-loox-store-id': 'ziW7w0O4wJ.b03ea943edf5f13aeb92373c039827c4da0589f14e31a469477525e39c57ca64'
        }
      }
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT || 3000, () => console.log('Proxy running'));
