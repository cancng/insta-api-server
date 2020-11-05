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

router.get('/search/:query', async (req, res) => {
  try {
    const users = await client.search({
      query: req.params.query,
      context: 'user',
    });
    const hashtag = await client.search({
      query: req.params.query,
      context: 'hashtag',
    });
    const places = await client.search({
      query: req.params.query,
      context: 'place',
    });
    return res.json({ users, hashtag, places });
    // const result = await client.search({ query: req.params.query, context });
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
