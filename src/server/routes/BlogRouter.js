import { Router } from 'express';
import * as BlogController from '../controllers/BlogController';


export default () => {
  const router = Router();

  router.get('/', BlogController.index());
  router.get('/:id', BlogController.show());

  return router;
};
