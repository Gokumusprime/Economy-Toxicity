import dbConnect from './mongodb';
import { gql } from 'apollo-server-micro';
import mongoose from "mongoose";
import { Schema } from 'mongoose';
import fs from 'fs/promises';


const cpiSchema = new mongoose.Schema({
  year: String,
  period: String,
  periodName: String,
  latest: String,
  value: String,
  footnotes: [
    {
      type: Schema.Types.Mixed, // Allow any type (e.g., objects, strings, etc.)
    },
  ],
});

const monthData = mongoose.models.monthData || mongoose.model('monthData', cpiSchema);

const typeDefs = gql`
  type MonthData {
    year: String
    period: String
    periodName: String
    latest: String
    value: String
    footnotes: [String]
  }

  type Query {
    monthData: [MonthData]
  }
`;

const resolvers = {
  Query: {
    monthData: async () => {
      await dbConnect(); // Ensure the database connection is established
      return monthData.find();
    },
  },
};


// Seed initial data
const seedData = async () => {
  await dbConnect(); // Connect to the database
  const existingData = await monthData.find();
  if (existingData.length === 0) {
    try {
      // Read data from the data.json file
      const rawData = await fs.readFile('data.json', 'utf-8');
      const initialData = JSON.parse(rawData).map((item: { footnotes: (string | object)[] }) => ({
        ...item,
        footnotes: item.footnotes.map((note) =>
          typeof note === 'object' ? JSON.stringify(note) : note
        ),
      }));

      // Insert the data into the database
      await monthData.insertMany(initialData);
      console.log('Initial data seeded from data.json!');
    } catch (error) {
      console.error('Error seeding data:', error);
    }
  } else {
    console.log('Database already contains data.');
  }
};

// Export typeDefs, resolvers, and model
export { typeDefs, resolvers, monthData };

// Run seed function (You can call this from your server's startup logic)
seedData();

