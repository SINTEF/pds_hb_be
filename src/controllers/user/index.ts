// Export user controller
import register from './user.register';
import login from './user.login';
import update from './user.update';
import getAll from './user.getAll';

const userController = {
  register,
  login,
  update,
  getAll,
};

export default userController;
