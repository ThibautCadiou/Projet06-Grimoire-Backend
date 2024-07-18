const dotenv = require('dotenv');
const app = require('./App');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });

let DB_BOOKS = process.env.DATABASE_BOOKS.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
if (process.env.NODE_ENV === 'development') {
  console.log('\n\n MODE DEVELOPPEMENT');
  DB_BOOKS = process.env.DATABASE_BOOKS_DEV.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
} else if (process.env.NODE_ENV === 'production') {
  console.log('\n\n MODE PRODUCTION');
  DB_BOOKS = process.env.DATABASE_BOOKS_PRODUCTION.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
  );
}

dbConnect().catch((err) => console.log(err));

async function dbConnect() {
  await mongoose.connect(DB_BOOKS);
  console.log('DB connection successful');
}

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`\n\nRunning on port: ${port} ...`);
});
