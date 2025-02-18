import mongoose from 'mongoose';
const topicSchema = require('./topicSchema'); 

const chapterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  topics: [topicSchema], // Array of topics
  progress: {
    type: Number, // Percentage of topics completed
    default: 0,
  },
});

module.exports = chapterSchema;