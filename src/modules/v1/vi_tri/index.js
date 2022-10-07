import { Router } from 'express';
import trycatchWrapper from '@utils/trycatchWrapper';
import Controller from './controller';

import passportJWT from '@middlewares/passportjwt';
import AdminValidate from '@middlewares/adminValidate';
import MulterInstance from '@services/Uploader/multer';


const router = new Router();

router.get('/', trycatchWrapper((req, res, next) => {
  return Controller.getViTris(req, res, next);
}));

router.post('/', passportJWT.authenticate('jwt', { session: false }), AdminValidate, trycatchWrapper((req, res, next) => {
  return Controller.createViTri(req, res, next);
}));

router.get('/phan-trang-tim-kiem', trycatchWrapper((req, res, next) => {
  return Controller.getViTris(req, res, next);
}))

router.put('/:id', passportJWT.authenticate('jwt', { session: false }), AdminValidate, trycatchWrapper((req, res, next) => {
  return Controller.updateViTri(req, res, next);
}));

router.get('/:id', trycatchWrapper((req, res, next) => {
  return Controller.getViTriById(req ,res, next);
}));

router.delete('/:id', passportJWT.authenticate('jwt', { session: false }), AdminValidate, trycatchWrapper((req, res, next) => {
  return Controller.removeViTriById(req, res, next);
}));

export default router;
