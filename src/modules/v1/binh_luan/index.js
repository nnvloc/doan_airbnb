import { Router } from 'express';
import trycatchWrapper from '@utils/trycatchWrapper';
import Controller from './controller';

import passportJWT from '@middlewares/passportjwt';
import AdminValidate from '@middlewares/adminValidate';
import MulterInstance from '@services/Uploader/multer';

const router = new Router();

router.get('/', trycatchWrapper((req, res, next) => {
  return Controller.getBinhLuans(req, res, next);
}));

router.post('/', passportJWT.authenticate('jwt', { session: false }), trycatchWrapper((req, res, next) => {
  return Controller.createBinhLuan(req, res, next);
}));

router.put('/:id', passportJWT.authenticate('jwt', { session: false }), trycatchWrapper((req, res, next) => {
  return Controller.updateBinhLuan(req, res, next);
}))

router.get('/rooms/:roomId', trycatchWrapper((req, res, next) => {
  return Controller.getByRoomId(req, res, next);
}))

router.get('/:id', trycatchWrapper((req, res, next) => {
  return Controller.getDatPhongById(req, res, next);
}));

router.delete('/:id', passportJWT.authenticate('jwt', { session: false }), trycatchWrapper((req, res, next) => {
  return Controller.removeById(req, res, next);
}));
export default router;
