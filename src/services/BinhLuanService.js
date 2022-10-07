import Models from '@models';

class DatPhongService {
  constructor() {
    this.Model = Models.Binh_Luans;
  }

  findAll(filters = {}) {
    return this.Model.findAll(filters);
  }

  update(id, params) {
    return this.Model.update(params, {
      where: { id }
    });
  }

  create(params) {
    return this.Model.create(params);
  }

  getById(id) {
    return this.Model.findOne({
      where: {
        id,
      }
    });
  }

  findOne(filter) {
    return this.Model.findOne(filter);
  }

  remove(id) {
    return this.Model.destroy({
      where: { id },
    });
  }
}

export default new DatPhongService();
