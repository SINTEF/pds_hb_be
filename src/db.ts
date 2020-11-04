import Mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, './config/.env') });

let database: Mongoose.Connection;

const getDatabase = () => {
  return database;
};

const connect = (): void => {
  if (database) return;

  const mongoURI = process.env.mongoURI;
  if (!mongoURI) throw Error('Cannot find mongo URI environment variable');

  Mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  database = Mongoose.connection;
  database.once('open', async () => {
    console.log('Connected to database');
  });
  database.on('error', () => {
    console.log('Error connecting to database');
  });
};

const connectTest = (): void => {
  if (database) return;

  const mongoURITest = process.env.mongoURITest;
  if (!mongoURITest) throw Error('Cannot find mongo URI environment variable');

  Mongoose.connect(mongoURITest, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  database = Mongoose.connection;
  database.once('open', async () => {
    console.log('Connected to testing database');
  });
  database.on('error', () => {
    console.log('Error connecting to testing database');
  });
};

const disconnect = (): void => {
  if (!database) {
    return;
  }
  Mongoose.disconnect();
};

export default {
  getDatabase,
  connect,
  connectTest,
  disconnect,
};
