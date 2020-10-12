import express from 'express';
import cors from 'cors';
import indexRoutes from './routes/index.routes';
import userRoutes from './routes/user.routes';
import moduleRoutes from './routes/module.routes';
import companyRoutes from './routes/company.routes';
import dataInstanceRoutes from './routes/dataInstance.routes';
import componentRoutes from './routes/component.routes';
import db from './db';
const app = express();
const PORT = process.env.PORT || 3000;

// // Connect to MongoDB
db.connect();

// Bodyparser (now inlcuded in express)
app.use(express.json());
app.use(cors());
// Initialize jwt session with passport
require('./middleware/passport');

// Routes
app.use('/', indexRoutes);
app.use('/user', userRoutes);
app.use('/company', companyRoutes);
app.use('/data-instance', dataInstanceRoutes);
app.use('/component', componentRoutes);
app.use('/module', moduleRoutes);

// 404
app.use((req, res) => {
  res.status(404).send('404 Page does not exist');
});

// start the Express server
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
