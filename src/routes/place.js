import express from 'express';
const router = express.Router();

import client from '../instagram';

router.get('/:place/:lng/:lat', async (req, res) => {
  try {
    const result = await client.locationSearch({
      latitude: req.params.lat,
      longitude: req.params.lng,
      query: req.params.place,
    });
    return res.json({ result });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ error: err.message });
  }
});

export default router;
