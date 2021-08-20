import getOne from './comment.getOne';
import getAll from './comment.getAll';
import register from './comment.register';
import update from './comment.update';
import del from './comment.delete';

const commentController = {
  getOne,
  getAll,
  register,
  update,
  del,
};

export default commentController;
