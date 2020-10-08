import express from 'express';
import homeRoutes from './routes/index.routes';
import userRoutes from './routes/user.routes';
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

// Initialize jwt session with passport
require('./config/passport');

// Routes
app.use('/', homeRoutes);
app.use('/user', userRoutes);
app.use('/company', companyRoutes);
app.use('/data-instance', dataInstanceRoutes);
app.use('/component', componentRoutes);

// 404
app.use((req, res) => {
  res.status(404).send('404 Page does not exist');
});

// start the Express server
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
