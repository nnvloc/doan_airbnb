import Logger from '@src/logger';
import Models from '@models';
import { sendResponse } from '@utils/response';

import { OrderService } from '@services';

class OrdersController {
  constructor() {
    this.logger = new Logger('Orders Controller');
  }
  async createOrder(req, res, next) {
    const { user } = req;
    const { amount, food_id, sub_ids } = req.body;

    if (!amount || !food_id) {
      throw new Error('Missing params');
    }

    const order = {
      user_id: user.id,
      food_id,
      amount,
      arr_sub_id: sub_ids || JSON.stringify([]),
    }

    order.code = Date.now();

    await OrderService.create(order);

    return sendResponse(res, {success: true, order });
  }
}

export default new OrdersController();
