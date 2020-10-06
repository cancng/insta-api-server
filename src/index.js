import 'dotenv/config';

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

const port = process.env.PORT || 5000;
const app = express();

// routes
import users from './routes/users';
import hashtag from './routes/hashtag';
import place from './routes/place';
import common from './routes/common';

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  return res.json({ msg: '🎉' });
});

app.use('/api/hashtag', hashtag);
app.use('/api/users', users);
app.use('/api/common', common);
app.use('/api/place', place);

app.listen(port, () => console.log(`Listening on port ${port}`));
