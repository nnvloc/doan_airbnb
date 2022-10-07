const { Op } = require("sequelize");

import { ViTriService } from '@services';
import { sendResponse } from '@utils/response';

import Logger from '@src/logger';

class ViTriController {
  constructor() {
    this.logger = new Logger('Vi Tri Controller');
  }
  async createViTri(req, res, next) {
    this.logger.info('Create vi tri');
    const { ten, tinh, quoc_gia, hinh_anh } = req.body;

    if (!ten || !tinh || !quoc_gia) {
      throw new Error('Missing params');
    }

    const viTri = await ViTriService.create(req.body);

    return sendResponse(res, { viTri });
  }

  async getViTris(req, res, next) {
    const { keyword, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    const pagination = {
      order: [[ 'created_at', 'desc' ]],
      offset,
      limit: +limit,
    };
    const filter = { ...pagination };
    if (keyword) {
      filter.where = {
        ten: {
          [Op.like]: `%${keyword}%`,
        }
      }
    }

    const data = await ViTriService.findAll(filter);

    return sendResponse(res, { data });
  }

  async getViTriById(req, res, next) {
    const { id } = req.params;

    const viTri = await ViTriService.getById(id);

    return sendResponse(res, { viTri });
  }

  async updateViTri(req, res, next) {
    const { id } = req.params;
    const { ten, tinh, quoc_gia, hinh_anh } = req.body;

    let viTri = await ViTriService.getById(id);
    if (!viTri) {
      throw new Error('Not found');
    }

    const exsitedName = await ViTriService.findOne({
      where: {
        ten: ten,
      }
    });

    console.log('exited: ', exsitedName);

    if (exsitedName && exsitedName.id != id) {
      throw new Error('Name already existed');
    }

    viTri.ten = ten ?? viTri.ten;
    viTri.tinh = tinh ?? viTri.tinh;
    viTri.quoc_gia = quoc_gia ?? viTri.quoc_gia;
    viTri.hinh_anh = hinh_anh ?? viTri.hinh_anh;

    await viTri.save();
    return sendResponse(res, { viTri });
  }

  async removeViTriById(req, res, next) {
    const { id } = req.params;
    if (!id) {
      throw new Error('Missing params');
    }

    await ViTriService.removeViTri(id);

    return sendResponse(res, { message: 'Success' });
  }
}

export default new ViTriController();
