import { Router } from 'express';
import trycatchWrapper from '@utils/trycatchWrapper';
import Controller from './controller';

import passportJWT from '@middlewares/passportjwt';
import MulterInstance from '@services/Uploader/multer';


const router = new Router();

router.get('/profile', trycatchWrapper((req, res, next) => {
  return Controller.getProfile(req, res, next);
}));

router.put(
  '/profile',
  MulterInstance.single('avatar'),
  trycatchWrapper((req, res, next) => {
    return Controller.updateProfile(req, res, next);
  })
)

router.post('/test-email', trycatchWrapper((req, res, next) => {
  return Controller.testSendEmail(req, res, next);
}));

router.post('/test-notification', trycatchWrapper((req, res, next) => {
  return Controller.testNotification(req, res, next);
}));

router.get('/likes', passportJWT.authenticate('jwt', { session: false }), trycatchWrapper((req, res, next) => {
  return Controller.getMyLikes(req, res, next);
}));

router.get('/rates', passportJWT.authenticate('jwt', { session: false }), trycatchWrapper((req, res, next) => {
  return Controller.getMyRates(req, res, next);
}));
export default router;
