import mongoose from 'mongoose';
export const initializeMongoDb = () => {
  const mongoDB = `${process.env.MONGO_URI}`;
  mongoose.set('strictQuery', false);
  mongoose.connect(mongoDB);
  const db = mongoose.connection;
  console.log('Connected to MongoDB');
  db.on('error', console.error.bind(console, 'MongoDB connection Error'));

  process.on('SIGINT', () => {
    db.close()
      .then(() => {
        console.log('MongoDB connection closed due to app termination');
        process.exit(0);
      })
      .catch((err) => {
        console.error('Error while closing MongoDB connection:', err);
        process.exit(1);
      });
  });
};
