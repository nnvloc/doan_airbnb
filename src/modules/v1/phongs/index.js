import { Router } from 'express';
import trycatchWrapper from '@utils/trycatchWrapper';
import Controller from './controller';

import passportJWT from '@middlewares/passportjwt';
import AdminValidate from '@middlewares/adminValidate';
import MulterInstance from '@services/Uploader/multer';

const router = new Router();

router.get('/', trycatchWrapper((req, res, next) => {
  return Controller.getRooms(req, res, next);
}));

router.post('/', passportJWT.authenticate('jwt', { session: false }), AdminValidate, trycatchWrapper((req, res, next) => {
  return Controller.createPhong(req, res, next);
}));

router.put('/:id', passportJWT.authenticate('jwt', { session: false }), AdminValidate, trycatchWrapper((req, res, next) => {
  return Controller.updatePhong(req, res, next);
}));

router.get('/by-vi-tri/:viTriId', trycatchWrapper((req, res, next) => {
  return Controller.getRoomsByViTri(req, res, next);
}))

router.get('/:id', trycatchWrapper((req, res, next) => {
  return Controller.getRoomById(req, res, next);
}));

export default router;
