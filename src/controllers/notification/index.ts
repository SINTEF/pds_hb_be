import getOne from './notification.getOne';
import getAll from './notification.getAll';
import register from './notification.register';
import update from './notification.update';
import getAnonymized from './notification.getAnonymized';
import del from './notification.delete';

const notificationController = {
  getOne,
  getAll,
  register,
  update,
  getAnonymized,
  del,
};

export default notificationController;
