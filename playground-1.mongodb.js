/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

const database = 'MonthData';
const collection = 'monthData';

// Select the database to use.
//use('MonthData');

// Create the collection
//db.createCollection(collection);


// Insert a few documents into the sales collection.
db.monthData.find();
// db.getCollection(collection).insertMany([
//   {
//     "year": "2025",
//     "period": "M03",
//     "periodName": "March",
//     "latest": "true",
//     "value": "319.799",
//     "footnotes": [
//       {

//       }
//     ]
//   },
//   {
//     "year": "2025",
//     "period": "M02",
//     "periodName": "February",
//     "value": "319.082",
//     "footnotes": [
//       {

//       }
//     ]
//   },
//   {
//     "year": "2025",
//     "period": "M01",
//     "periodName": "January",
//     "value": "317.671",
//     "footnotes": [
//       {

//       }
//     ]
//   },
//   {
//     "year": "2024",
//     "period": "M12",
//     "periodName": "December",
//     "value": "315.605",
//     "footnotes": [
//       {

//       }
//     ]
//   },
//   {
//     "year": "2024",
//     "period": "M11",
//     "periodName": "November",
//     "value": "315.493",
//     "footnotes": [
//       {

//       }
//     ]
//   },
//   {
//     "year": "2024",
//     "period": "M10",
//     "periodName": "October",
//     "value": "315.664",
//     "footnotes": [
//       {

//       }
//     ]
//   },
//   {
//     "year": "2024",
//     "period": "M09",
//     "periodName": "September",
//     "value": "315.301",
//     "footnotes": [
//       {

//       }
//     ]
//   },
//   {
//     "year": "2024",
//     "period": "M08",
//     "periodName": "August",
//     "value": "314.796",
//     "footnotes": [
//       {

//       }
//     ]
//   },
//   {
//     "year": "2024",
//     "period": "M07",
//     "periodName": "July",
//     "value": "314.540",
//     "footnotes": [
//       {

//       }
//     ]
//   },
//   {
//     "year": "2024",
//     "period": "M06",
//     "periodName": "June",
//     "value": "314.175",
//     "footnotes": [
//       {

//       }
//     ]
//   },
//   {
//     "year": "2024",
//     "period": "M05",
//     "periodName": "May",
//     "value": "314.069",
//     "footnotes": [
//       {

//       }
//     ]
//   },
//   {
//     "year": "2024",
//     "period": "M04",
//     "periodName": "April",
//     "value": "313.548",
//     "footnotes": [
//       {

//       }
//     ]
//   },
//   {
//     "year": "2024",
//     "period": "M03",
//     "periodName": "March",
//     "value": "312.332",
//     "footnotes": [
//       {

//       }
//     ]
//   },
//   {
//     "year": "2024",
//     "period": "M02",
//     "periodName": "February",
//     "value": "310.326",
//     "footnotes": [
//       {

//       }
//     ]
//   },
//   {
//     "year": "2024",
//     "period": "M01",
//     "periodName": "January",
//     "value": "308.417",
//     "footnotes": [
//       {

//       }
//     ]
//   },
// ]);

// Run a find command to view items sold on April 4th, 2014.
// const salesOnApril4th = db.getCollection('sales').find({
//   date: { $gte: new Date('2014-04-04'), $lt: new Date('2014-04-05') }
// }).count();

// Print a message to the output window.
//console.log(`${salesOnApril4th} sales occurred in 2014.`);

// Here we run an aggregation and open a cursor to the results.
// Use '.toArray()' to exhaust the cursor to return the whole result set.
// You can use '.hasNext()/.next()' to iterate through the cursor page by page.
// db.getCollection('sales').aggregate([
//   // Find all of the sales that occurred in 2014.
//   { $match: { date: { $gte: new Date('2014-01-01'), $lt: new Date('2015-01-01') } } },
//   // Group the total sales for each product.
//   { $group: { _id: '$item', totalSaleAmount: { $sum: { $multiply: [ '$price', '$quantity' ] } } } }
// ]);
