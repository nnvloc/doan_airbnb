const { Op } = require("sequelize");
import { UserService } from '@services';
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

  async updateProfile(req, res, next) {
    const { user } = req;
    this.logger.info(`Update Profile ${user.id}`);

    const { name, phone, dob, gender } = req.body;

    user.name = name ?? user.name;
    user.phone = phone ?? user.phone;
    user.dob = dob ?? user.dob;
    user.gender = gender ?? user.gender;

    await user.save();

    return sendResponse(res, { user });
  }

  async getUsers(req, res, next) {
    const { name, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    const pagination = {
      order: [[ 'created_at', 'desc' ]],
      offset,
      limit: +limit,
    };
    const filter = { ...pagination };
    if (name) {
      filter.where = {
        name: {
          [Op.like]: `%${name}%`,
        }
      }
    }

    const users = await UserService.getUsers(filter);

    return sendResponse(res, { users });
  }

  async getUserById(req, res, next) {
    const { id } = req.params;

    if (!id) {
      throw new Error('Missing params');
    }

    const user = await UserService.getUserById(id);

    return sendResponse(res, { user });
  }

  async removeUserById(req, res, next) {
    const { id } = req.params;

    if (!id) {
      throw new Error('Missing params');
    }

    await UserService.removeUser(id);

    return sendResponse(res, { message: 'Remove Success' });
  }
}

export default new UserController();
