import getOne from './inventoryInstance.getOne';
import getAll from './inventoryInstance.getAll';
import register from './inventoryInstance.register';
import update from './inventoryInstance.update';
import getAnonymized from './inventoryInstance.getAnonymized';
import del from './inventoryInstance.delete';

const inventoryInstanceController = {
  getOne,
  getAll,
  register,
  update,
  getAnonymized,
  del,
};

export default inventoryInstanceController;
