const { Op } = require("sequelize");
import { PhongService, ViTriService } from '@services';
import { sendResponse } from '@utils/response';

import Logger from '@src/logger';

class PhongController {
  constructor() {
    this.logger = new Logger('Phongs Controller');
  }

  async getRooms(req, res, next) {
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
        ten_phong: {
          [Op.like]: `%${keyword}%`,
        }
      }
    }
    const rooms = await PhongService.getPhongs(filter);

    return sendResponse(res, { rooms });
  }

  async createPhong(req, res, next) {
    this.logger.info('Create room');
    const { ten_phong, khach, phong_ngu, giuong, phong_tam, gia_tien, hinh_anh, vi_tri } = req.body;

    if (!ten_phong || !khach || !phong_ngu || !giuong || !phong_tam || !gia_tien || !hinh_anh || !vi_tri) {
      throw new Error('Missing params');
    }

    const phong = await PhongService.create(req.body);

    return sendResponse(res, { phong });

  }

  async updatePhong(req, res, next) {
    const { id } = req.params;

    const phong = await PhongService.getById(id);

    if (!phong) {
      throw new Error('Not found');
    }

    const updated = await PhongService.update(id, req.body);
    const updatedPhong = await PhongService.getById(id);

    return sendResponse(res, { phong: updatedPhong });
  }

  async getRoomById(req, res, next) {
    const { id } = req.params;
    if (!id) {
      throw new Error('Missing params');
    }

    const room = await PhongService.getById(id);

    return sendResponse(res, { room });
  }

  async getRoomsByViTri(req, res, next) {
    const { viTriId } = req.params;

    if (!viTriId) {
      throw new Error('Missing params');
    }

    const vitri = await ViTriService.getById(viTriId);

    if (!vitri) {
      throw new Error('Not found');
    }

    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    const pagination = {
      order: [[ 'created_at', 'desc' ]],
      offset,
      limit: +limit,
    };
    const filter = { ...pagination };
    filter.where = {
      vi_tri: viTriId,
    }
    const rooms = await PhongService.getPhongs(filter);

    return sendResponse(res, { rooms });
  }
}

export default new PhongController();
