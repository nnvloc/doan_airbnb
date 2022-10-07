const { Op } = require("sequelize");
import { PhongService, DatPhongService } from '@services';
import { sendResponse } from '@utils/response';

import Logger from '@src/logger';

class DatPhongController {
  constructor() {
    this.logger = new Logger('Dat Phong Controller');
  }

  async getDatPhongs(req, res, next) {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    const pagination = {
      order: [[ 'created_at', 'desc' ]],
      offset,
      limit: +limit,
    };
    const filter = { ...pagination };
    
    const datPhongs = await DatPhongService.findAll(filter);

    return sendResponse(res, { datPhongs });
  }

  async createDatPhong(req, res, next) {
    this.logger.info('Create Booking');
    const { user } = req;

    const { ma_phong, ngay_den, ngay_di, so_luong_khach } = req.body;

    const phong = await PhongService.getById(ma_phong);

    if (!phong) {
      throw new Error('Not found');
    }

    // Validate ngay_den ngay_di
    const existedBooking = await DatPhongService.findAll({
      where: {
        ma_phong,
        [Op.or]: [
          {
            ngay_den: {
              [Op.between]: [ngay_den, ngay_di],
            }
          },
          {
            ngay_di: {
              [Op.between]: [ngay_den, ngay_di],
            }
          }
        ]
      }
    });

    if (existedBooking.length) {
      throw new Error('Room is booked on this date')
    }

    const booking = await DatPhongService.create({
      ma_phong,
      ngay_den,
      ngay_di,
      ma_nguoi_dat: user.id,
      so_luong_khach,
    });

    return sendResponse(res, { dat_phong: booking });

  }

  async updateDatPhong(req, res, next) {
    const { id } = req.params;
    const { user } = req;

    const booking = await DatPhongService.getById(id);

    if (!booking || booking.ma_nguoi_dat !== user.id) {
      throw new Error('Not found');
    }

    const { ma_phong, ngay_den, ngay_di, so_luong_khach } = req.body;

    const phong = await PhongService.getById(ma_phong);

    if (!phong) {
      throw new Error('Not found');
    }

    const existedBooking = await DatPhongService.findAll({
      where: {
        ma_phong,
        [Op.or]: [
          {
            ngay_den: {
              [Op.between]: [ngay_den, ngay_di],
            }
          },
          {
            ngay_di: {
              [Op.between]: [ngay_den, ngay_di],
            }
          }
        ]
      }
    });

    const notSameBookingId = existedBooking.filter(item => item.id !== booking.id);
    if (notSameBookingId && notSameBookingId.length) {
      throw new Error('Room is booked on this date')
    }

    await DatPhongService.update(id, { ma_phong, ngay_den, ngay_di, so_luong_khach });
    const datPhong = await DatPhongService.getById(id);

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

  async getByUserId(req, res, next) {
    const { userId } = req.params;

    if (!userId) {
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
      ma_nguoi_dat: userId,
    }

    const datPhongs = await DatPhongService.findAll(filter);

    return sendResponse(res, { datPhongs });
  }

  async removeById(req, res, next) {
    const { id } = req.params;
    const { user } = req;
    if (!id) {
      throw new Error('Missing params');
    }

    const booking = await DatPhongService.getById(id);

    if (!booking || booking.ma_nguoi_dat != user.id) {
      throw new Error('Not found');
    }

    await DatPhongService.remove(id);

    return sendResponse(res, { message: 'Success' });
  }
}

export default new DatPhongController();
