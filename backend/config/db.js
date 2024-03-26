
const mongoose = require('mongoose');
const connectDB = async () => {
  mongoose.connect(process.env.MONGO_URI)
  .then(
    console.log(`Connected to database`)
  )
  .catch(e => {
    console.log(`Database connection failed\n${e}.message`);
  })
}


module.exports =  connectDB;