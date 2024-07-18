// SCRIPT NE MARCHE PAS LORS DE LIMPORT pour grimoire8db A CAUSE DE OBJECT ID
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Book = require('./../models/bookModel');

dotenv.config({ path: './../config.env' });

dbConnect().catch((err) => console.log(err));

async function dbConnect() {
  await mongoose.connect(
    process.env.DATABASE_BOOKS_DEV.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)
  );
  console.log('DB connection successful');
}

//read the json file
const books = JSON.parse(fs.readFileSync('data.json', 'utf-8'));

// Import data into db
const importData = async () => {
  try {
    await Book.create(books);
    console.log('\n\nImporting data');
  } catch (error) {
    console.log(error);
  }
};

// Delete all data from Database
const deleteData = async () => {
  try {
    console.log('\n\nDeleting data');
    await Book.deleteMany();
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

console.log('process.argv');
console.log(process.argv);
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
  process.exit();
}
