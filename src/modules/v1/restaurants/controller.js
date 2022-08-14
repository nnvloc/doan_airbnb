import Logger from '@src/logger';
import Models from '@models';
import { sendResponse } from '@utils/response';

import { RestaurantService, LikeRestaurantService, RateRestaurantService } from '@services';

class RestaurantController {
  constructor() {
    this.logger = new Logger('Restaurant Controller');
  }
  async likeRestaurant(req, res, next) {
    const { user } = req;
    const { id } = req.params;

    const restaurant = await RestaurantService.getById(id);

    if (!restaurant) {
      throw new Error('Not found restaurant');
    }

    const likeRes = {
      user_id: user.id,
      res_id: restaurant.id,
      date_like: Date.now(),
    }

    await LikeRestaurantService.create(likeRes);

    return sendResponse(res, {success: true });
  }

  async rateRestaurant(req, res, next) {
    const { user } = req;
    const { id } = req.params;
    const { amount } = req.body;

    const restaurant = await RestaurantService.getById(id);

    if (!restaurant) {
      throw new Error('Not found restaurant');
    }

    const rateRes = {
      user_id: user.id,
      res_id: restaurant.id,
      date_rate: Date.now(),
      amount,
    }

    await RateRestaurantService.create(rateRes);

    return sendResponse(res, {success: true });
  }

  async getLikes(req, res, next) {
    const { id } = req.params;
    const likes = await LikeRestaurantService.findAll({
      where: {
        res_id: id,
      },
      include: [{
        model: Models.Users,
        as: 'user',
        attributes: { exclude: ["password"] },
      }],
    });

    return sendResponse(res, { success: true, likes });
  }

  async getRates(req, res, next) {
    const { id } = req.params;
    const likes = await RateRestaurantService.findAll({
      where: {
        res_id: id,
      },
      include: [{
        model: Models.Users,
        as: 'user',
        attributes: { exclude: ["password"] },
      }],
    });

    return sendResponse(res, { success: true, likes });
  }
}

export default new RestaurantController();
