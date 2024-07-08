const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

dbConnect().catch((err) => console.log(err));

// JONAS CODE
// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//   })
//   .then((con) => {
//     console.log('DB connection sucessful');
//     console.log(con.connections);
//   });
async function dbConnect() {
  await mongoose.connect(DB);
  console.log('DB connection sucessful');
  // console.log(con.connections);
}

const app = require('./App');

if (process.env.NODE_ENV === 'development') {
  console.log(process.env);
}

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Running on port: ${port} ...`);
});
