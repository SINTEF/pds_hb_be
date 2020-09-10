import express from 'express';
import mongoose from 'mongoose';
const app = express();
const port = 3000;

// Connect to MongoDB
const dbURI =
  'mongodb+srv://martin:Test12345@cluster0.0gbrd.mongodb.net/sample_sensors?retryWrites=true&w=majority';
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log(result))
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('<h1>Hello world!</h1>');
});

app.get('/test', (req, res) => {
  res.send('Test');
});

app.use((req, res) => {
  res.send('ERROR 404');
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
