import 'dotenv/config';
import './src/config/passport.js';

import app from './src/app.js';

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
