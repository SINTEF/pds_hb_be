import Mongoose from 'mongoose';
import key from './config/keys';
//import { UserModel } from "./users/users.model";

let database: Mongoose.Connection;

const connect = (): void => {
  // Only make new connection if a connection doesn't exist
  if (database) return;

  const uri = key.mongoURI;
  Mongoose.connect(uri, {
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

const disconnect = (): void => {
  if (!database) {
    return;
  }
  Mongoose.disconnect();
};

export default {
  connect,
  disconnect,
};
