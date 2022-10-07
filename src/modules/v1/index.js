import { Router } from 'express';

import secretAuth from '@middlewares/secretAuth';

import userRoutes from './users';
import AuthRoutes from './authenticate';
import phongRoutes from './phongs';
import vitriRoutes from './vi_tri';
import datPhongRoutes from './dat_phong';
import binhLuanRoutes from './binh_luan';

const router = new Router();

router.use('/auth', AuthRoutes);
router.use('/users', userRoutes);
router.use('/phongs', phongRoutes);
router.use('/vi-tri', vitriRoutes);
router.use('/dat-phongs', datPhongRoutes);
router.use('/binh-luans', binhLuanRoutes);

export default router;
