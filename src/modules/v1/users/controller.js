import { UserService, LikeRestaurantService, RateRestaurantService } from '@services';
import { sendResponse } from '@utils/response';

import Logger from '@src/logger';

class UserController {
  constructor() {
    this.logger = new Logger('User Controller');
  }
  async getProfile(req, res, next) {
    const {user} = req;
    this.logger.info('Get Profile');
    if (!user) {
      throw new Error('Unauthorized');
    }

    return sendResponse(res, {success: true, user });
  }

  async getMyLikes(req, res, next) {
    const { user } = req;
    const likes = await LikeRestaurantService.findAll({
      where: {
        user_id: user.id,
      },
      include: ['restaurant'],
    });

    return sendResponse(res, { success: true, likes });
  }

  async getMyRates(req, res, next) {
    const { user } = req;
    const likes = await RateRestaurantService.findAll({
      where: {
        user_id: user.id,
      },
      include: ['restaurant'],
    });

    return sendResponse(res, { success: true, likes });
  }
}

export default new UserController();
