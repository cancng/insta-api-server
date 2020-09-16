import express from 'express';
const router = express.Router();

import client from '../instagram';

router.get('/:username', async (req, res) => {
  try {
    const user = await client.getUserByUsername({
      username: req.params.username,
    });
    const photosData = await client.getPhotosByUsername({
      username: req.params.username,
    });
    const stories = await client.getStoryItemsByUsername({
      username: req.params.username,
    });
    const photos = photosData.user.edge_owner_to_timeline_media;
    return res.json({
      user,
      stories,
      photos,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ error: err.message });
  }
});

router.get('/:username/followers/:count?', async (req, res) => {
  try {
    const user = await client.getUserByUsername({
      username: req.params.username,
    });
    const followers = await client.getFollowers({
      userId: user.id,
      first: req.params.count ? req.params.count : 20,
    });
    return res.json({ followers });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ error: err.message });
  }
});

router.get('/:username/following/:count?', async (req, res) => {
  try {
    const user = await client.getUserByUsername({
      username: req.params.username,
    });
    const following = await client.getFollowings({
      userId: user.id,
      first: req.params.count ? req.params.count : 20,
    });
    return res.json({ following });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ error: err.message });
  }
});

export default router;
