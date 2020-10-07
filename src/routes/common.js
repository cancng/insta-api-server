import express from 'express';
const router = express.Router();

import client from '../instagram';

router.get('/feed', async (req, res) => {
  try {
    const feed = await client.getHome();
    return res.json(feed);
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ error: err.message });
  }
});

router.get('/search/:query/:context?', async (req, res) => {
  try {
    let context = '';
    switch (req.params.context) {
      case 'hashtag':
        context = 'hashtag';
        break;
      case 'place':
        context = 'place';
        break;
      case 'user':
        context = 'user';
        break;
      default:
        context = 'blended';
        break;
    }
    const result = await client.search({ query: req.params.query, context });
    return res.json(result);
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ error: err.message });
  }
});

router.get('/media/:shortcode', async (req, res) => {
  try {
    const result = await client.getMediaByShortcode({
      shortcode: req.params.shortcode,
    });
    return res.json(result);
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ error: err.message });
  }
});

export default router;
