const dotenv = require('dotenv');
const app = require('./App');

const mongoose = require('mongoose');
dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

dbConnect().catch((err) => console.log(err));

async function dbConnect() {
  await mongoose.connect(DB);
  console.log('DB connection sucessful');
}

if (process.env.NODE_ENV === 'development') {
  // console.log(process.env);
}

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Running on port: ${port} ...`);
});
