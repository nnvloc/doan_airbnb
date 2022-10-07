import { Router } from 'express';
import trycatchWrapper from '@utils/trycatchWrapper';
import Controller from './controller';

import passportJWT from '@middlewares/passportjwt';
import AdminValidate from '@middlewares/adminValidate';
import MulterInstance from '@services/Uploader/multer';

const router = new Router();

router.get('/', trycatchWrapper((req, res, next) => {
  return Controller.getDatPhongs(req, res, next);
}));

router.post('/', passportJWT.authenticate('jwt', { session: false }), trycatchWrapper((req, res, next) => {
  return Controller.createDatPhong(req, res, next);
}));

router.put('/:id', passportJWT.authenticate('jwt', { session: false }), trycatchWrapper((req, res, next) => {
  return Controller.updateDatPhong(req, res, next);
}))

router.get('/users/:userId', trycatchWrapper((req, res, next) => {
  return Controller.getByUserId(req, res, next);
}))

router.get('/:id', trycatchWrapper((req, res, next) => {
  return Controller.getDatPhongById(req, res, next);
}));

router.delete('/:id', passportJWT.authenticate('jwt', { session: false }), trycatchWrapper((req, res, next) => {
  return Controller.removeById(req, res, next);
}));
export default router;
