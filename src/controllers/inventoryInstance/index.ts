import getOne from './inventoryInstance.getOne';
import getAll from './inventoryInstance.getAll';
import register from './inventoryInstance.register';
import update from './inventoryInstance.update';
import getAnonymized from './inventoryInstance.getAnonymized';

const inventoryInstanceController = {
  getOne,
  getAll,
  register,
  update,
  getAnonymized,
};

export default inventoryInstanceController;
