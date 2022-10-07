const { Op } = require("sequelize");
import { PhongService, BinhLuanService } from '@services';
import { sendResponse } from '@utils/response';

import Logger from '@src/logger';

class DatPhongController {
  constructor() {
    this.logger = new Logger('Dat Phong Controller');
  }

  async getBinhLuans(req, res, next) {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    const pagination = {
      order: [[ 'created_at', 'desc' ]],
      offset,
      limit: +limit,
    };
    const filter = { ...pagination };
    
    const binhLuans = await BinhLuanService.findAll(filter);

    return sendResponse(res, { binhLuans });
  }

  async createBinhLuan(req, res, next) {
    this.logger.info('Create Review');
    const { user } = req;

    const { ma_phong, noi_dung, sao_binh_luan } = req.body;

    if (!ma_phong || !noi_dung || !sao_binh_luan) {
      throw new Error('Missing params');
    }

    const phong = await PhongService.getById(ma_phong);

    if (!phong) {
      throw new Error('Not found');
    }

    const binhLuan = await BinhLuanService.create({
      ma_phong,
      noi_dung,
      ma_nguoi_binh_luan: user.id,
      sao_binh_luan,
    });

    return sendResponse(res, { binhLuan });

  }

  async updateBinhLuan(req, res, next) {
    const { id } = req.params;
    const { user } = req;

    const binhLuan = await BinhLuanService.getById(id);

    if (!binhLuan || binhLuan.ma_nguoi_binh_luan !== user.id) {
      throw new Error('Not found');
    }

    const { ma_phong, noi_dung, sao_binh_luan } = req.body;

    const phong = await PhongService.getById(ma_phong);

    if (!phong) {
      throw new Error('Not found');
    }

    await BinhLuanService.update(id, { ma_phong, noi_dung, sao_binh_luan });
    const datPhong = await BinhLuanService.getById(id);

    return sendResponse(res, { datPhong });
  }

  async getDatPhongById(req, res, next) {
    const { id } = req.params;
    if (!id) {
      throw new Error('Missing params');
    }

    const datPhong = await DatPhongService.getById(id);

    return sendResponse(res, { datPhong });
  }

  async getByRoomId(req, res, next) {
    const { roomId } = req.params;

    if (!roomId) {
      throw new Error('Missing params');
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
      ma_phong: roomId,
    }

    const binhLuans = await BinhLuanService.findAll(filter);

    return sendResponse(res, { binhLuans });
  }

  async removeById(req, res, next) {
    const { id } = req.params;
    const { user } = req;
    if (!id) {
      throw new Error('Missing params');
    }

    const binhLuan = await BinhLuanService.getById(id);

    if (!binhLuan || binhLuan.ma_nguoi_binh_luan != user.id) {
      throw new Error('Not found');
    }

    await BinhLuanService.remove(id);

    return sendResponse(res, { message: 'Success' });
  }
}

export default new DatPhongController();
