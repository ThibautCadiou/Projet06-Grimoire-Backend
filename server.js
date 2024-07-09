const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

dbConnect().catch((err) => console.log(err));

async function dbConnect() {
  await mongoose.connect(DB);
  console.log('DB connection sucessful');
}

const bookSchema = new mongoose.Schema({
  userId: String,
  title: {
    type: String,
    required: [true, 'A Book must have a title'],
    unique: true,
  },
  author: String,
  imageUrl: String,
  year: Number,
  genre: String,
  ratings: { userId: String, grade: Number },
  averageRatings: Number,
});

const Book = mongoose.model('Book', bookSchema);

const testBook = new Book({
  userId: '4',
  title: 'My Super Book That I Love 02',
  author: 'This is me, Mario !',
  imageUrl:
    'https://static.wikia.nocookie.net/mario/images/a/a1/NSMBUDX-Mario-1.png/revision/latest?cb=20190130012618&path-prefix=fr',
  year: 2024,
  genre: 'freaky funny',
});

testBook
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log('errorrr    !!!!', err);
  });

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

const app = require('./App');

if (process.env.NODE_ENV === 'development') {
  console.log(process.env);
}

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Running on port: ${port} ...`);
});
