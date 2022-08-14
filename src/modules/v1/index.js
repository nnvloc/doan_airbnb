import { Router } from 'express';

import secretAuth from '@middlewares/secretAuth';

import userRoutes from './users';
import AuthRoutes from './authenticate';
import restaurantRoutes from './restaurants';
import orderRoutes from './orders';

const router = new Router();

router.use('/', AuthRoutes);
router.use('/users', userRoutes);
router.use('/restaurants', restaurantRoutes);
router.use('/orders', orderRoutes);

export default router;
