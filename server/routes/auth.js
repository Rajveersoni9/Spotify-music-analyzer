const express = require('express');
const querystring = require('querystring');
const axios = require('axios');
const router = express.Router();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const FRONTEND_URI = process.env.FRONTEND_URI || 'http://localhost:5173';

const generateRandomString = (length) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

router.get('/login', (req, res) => {
  const state = generateRandomString(16);
  const scope = 'user-top-read user-read-recently-played user-read-currently-playing';

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: CLIENT_ID,
      scope: scope,
      redirect_uri: REDIRECT_URI,
      state: state,
      show_dialog: true
    })
  );
});

router.get('/callback', async (req, res) => {
  const code = req.query.code || null;
  
  try {
    const response = await axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: querystring.stringify({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
      },
    });

    const { access_token, refresh_token } = response.data;

    // Redirect to frontend with tokens
    res.redirect(`${FRONTEND_URI}/dashboard?access_token=${access_token}&refresh_token=${refresh_token}`);
  } catch (error) {
    console.error('Error during callback:', error.response?.data || error.message);
    res.redirect(`${FRONTEND_URI}/?error=invalid_token`);
  }
});

module.exports = router;
