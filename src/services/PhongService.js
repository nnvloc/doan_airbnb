import Models from '@models';

class PhongService {
  constructor() {
    this.Model = Models.Phongs;
  }

  getPhongs(filters = {}) {
    return this.Model.findAll(filters);
  }

  create(params) {
    return this.Model.create(params);
  }

  async update(id, params) {
    return this.Model.update(params, {
      where: {
        id,
      }
    });
  }

  getById(id) {
    return this.Model.findOne({
      where: {
        id,
      }
    });
  }
}

export default new PhongService();
