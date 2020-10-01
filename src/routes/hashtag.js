import express from 'express';
const router = express.Router();

import client from '../instagram';

router.get('/:hashtag', async (req, res) => {
  try {
    const result = await client.getPhotosByHashtag({
      hashtag: req.params.hashtag,
    });
    return res.json({ result });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ error: err.message });
  }
});

export default router;
