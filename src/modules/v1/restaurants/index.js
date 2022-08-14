import { Router } from 'express';
import trycatchWrapper from '@utils/trycatchWrapper';
import Controller from './controller';

import passportJWT from '@middlewares/passportjwt';

const router = new Router();

router.post('/:id/like', passportJWT.authenticate('jwt', { session: false }), trycatchWrapper((req, res, next) => {
  return Controller.likeRestaurant(req, res, next);
}));

router.post('/:id/rate', passportJWT.authenticate('jwt', { session: false }), trycatchWrapper((req, res, next) => {
  return Controller.rateRestaurant(req, res, next);
}));

router.get('/:id/likes', trycatchWrapper((req, res, next) => {
  return Controller.getLikes(req, res, next);
}));

router.get('/:id/rates', trycatchWrapper((req, res, next) => {
  return Controller.getRates(req, res, next);
}));

export default router;
