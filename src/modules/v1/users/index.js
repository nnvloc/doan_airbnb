import { Router } from 'express';
import trycatchWrapper from '@utils/trycatchWrapper';
import Controller from './controller';

import passportJWT from '@middlewares/passportjwt';
import AdminValidate from '@middlewares/adminValidate';
import MulterInstance from '@services/Uploader/multer';


const router = new Router();

router.get('/', passportJWT.authenticate('jwt', { session: false }), AdminValidate, trycatchWrapper((req, res, next) => {
  return Controller.getUsers(req, res, next);
}))

router.get('/profile', passportJWT.authenticate('jwt', { session: false }), trycatchWrapper((req, res, next) => {
  return Controller.getProfile(req, res, next);
}));

router.put(
  '/profile',
  MulterInstance.single('avatar'),
  passportJWT.authenticate('jwt', { session: false }),
  trycatchWrapper((req, res, next) => {
    return Controller.updateProfile(req, res, next);
  })
);

router.get('/:id', passportJWT.authenticate('jwt', { session: false }), AdminValidate, trycatchWrapper((req, res, next) => {
  return Controller.getUserById(req, res, next);
}));

router.delete('/:id', passportJWT.authenticate('jwt', { session: false }), AdminValidate, trycatchWrapper((req, res, next) => {
  return Controller.removeUserById(req, res, next);
}))

export default router;
