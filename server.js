const express = require('express');
const https = require('https');
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

  const options = {
    hostname: 'api.loox.app',
    path: `/storefront/v1/reviews?product_id=${product_id}&page=${page}&per_page=${per_page}`,
    method: 'GET',
    headers: {
      'x-loox-store-id': 'ziW7w0O4wJ.b03ea943edf5f13aeb92373c039827c4da0589f14e31a469477525e39c57ca64'
    }
  };

  const request = https.request(options, (response) => {
    let data = '';
    response.on('data', (chunk) => { data += chunk; });
    response.on('end', () => {
      try {
        res.json(JSON.parse(data));
      } catch (e) {
        res.status(500).json({ error: 'Parse error', raw: data });
      }
    });
  });

  request.on('error', (err) => {
    res.status(500).json({ error: err.message });
  });

  request.end();
});

app.listen(process.env.PORT || 3000, () => console.log('Proxy running'));
