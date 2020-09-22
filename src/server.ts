import express from 'express';
import mongoose from 'mongoose';
import homeRoutes from './routes/homeRoutes';
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
// const dbURI = 'mongodb+srv://martin:Test12345@cluster0.0gbrd.mongodb.net/sample_sensors?retryWrites=true&w=majority';

// mongoose
//   .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then((result) => console.log(result))
//   .catch((err) => console.log(err));

// Bodyparser
app.use(express.urlencoded({ extended: false }));

// Homepage Routes
app.use('/', homeRoutes);

// 404
app.use((req, res) => {
  res.send('ERROR 404');
});

// start the Express server
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
