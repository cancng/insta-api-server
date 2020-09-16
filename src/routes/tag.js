import express from 'express';
const router = express.Router();

import client from '../instagram';

router.get('/', async (req, res) => {
  
  return res.json({ msg: 'tag anasayfa' });
});

export default router;
