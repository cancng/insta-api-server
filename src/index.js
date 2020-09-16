import 'dotenv/config';

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

const port = process.env.PORT || 5000;
const app = express();

// routes
import users from './routes/users';
import tag from './routes/tag';

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  return res.json({ msg: '🎉' });
});

app.use('/api/tag', tag);
app.use('/api/users/', users);

app.listen(port, () => console.log(`Listening on port ${port}`));