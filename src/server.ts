import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import moduleRoutes from './routes/module.routes';
import companyRoutes from './routes/company.routes';
import dataInstanceRoutes from './routes/dataInstance.routes';
import componentRoutes from './routes/component.routes';
import pdsHandbookRoutes from './routes/pdsHandbook.routes';
import notificationRoutes from './routes/notification.routes';
import inventoryInstanceRoutes from './routes/inventoryInstance.routes';
import db from './db';
const app = express();
const PORT = process.env.PORT || 5000;

// // Connect to MongoDB
db.connect();

// Bodyparser (now inlcuded in express)
app.use(express.json());
app.use(cors());

// Initialize jwt session with passport
require('./middleware/passport');

// Routes
app.use('/user', userRoutes);
app.use('/company', companyRoutes);
app.use('/data-instances', dataInstanceRoutes);
app.use('/components', componentRoutes);
app.use('/modules', moduleRoutes);
app.use('/pds-handbook', pdsHandbookRoutes);
app.use('/notifications', notificationRoutes);
app.use('/inventoryInstances', inventoryInstanceRoutes);

// 404
app.use((req, res) => {
  res.status(404).send('404 Page does not exist');
});

// start the Express server
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
