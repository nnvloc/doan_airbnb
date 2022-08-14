import { Router } from 'express';
import trycatchWrapper from '@utils/trycatchWrapper';
import Controller from './controller';

const router = new Router();

// Get users
router.post('/sign-up', trycatchWrapper((req, res, next) => {
  // pre-process
  return Controller.signUp(req, res, next);
}));

router.post('/login', trycatchWrapper((req, res, next) => Controller.login(req, res, next)));

export default router;