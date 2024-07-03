const fs = require('fs');

const books = JSON.parse(fs.readFileSync(`${__dirname}/../data/data.json`));

exports.getBooks = (req, res) => {
  console.log('Get Books !!!');

  res.status(200).json({
    status: 'success',
    results: books.length,
    data: {
      books: books,
    },
  });
};

// exports.getTours = (req, res) => {
//   console.log(req.requestTime);

//   res.status(200).json({
//     status: 'success',
//     results: tours.length,
//     data: {
//       tours: tours,
//     },
//   });
// };

// exports.getOneTour = (req, res) => {
//   console.log(req.params);
//   const id = req.params.id * 1;

//   if (id > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid Id',
//     });
//   } else {
//     const tour = tours.find((el) => el.id === id);

//     res.status(200).json({
//       status: 'success',
//       data: {
//         tour: tour,
//       },
//     });
//   }
// };

// exports.createTour = (req, res) => {
//   console.log(req.body);
//   const newId = tours[tours.length - 1].id + 1;
//   const newTour = Object.assign({ id: newId }, req.body);

//   tours.push(newTour);
//   fs.writeFile(`${__dirname}/dev-data/data/tours.json`, JSON.stringify(tours), (err) => {
//     res.status(201).json({ status: 'success', data: { tour: newTour } });
//   });
// };

// exports.updateTour = (req, res) => {
//   res.status(200).json({
//     status: 'Success',
//     data: {
//       tour: '<Updated Tour here ...>',
//     },
//   });
// };

// exports.deleteTour = (req, res) => {
//   res.status(204).json({
//     status: 'success',
//     data: null,
//   });
// };
