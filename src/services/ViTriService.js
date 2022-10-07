import Models from '@models';

class ViTriService {
  constructor() {
    this.Model = Models.Vi_tris;
  }

  findAll(filters = {}) {
    return this.Model.findAll(filters);
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

  removeViTri(id) {
    return this.Model.destroy({
      where: { id },
    });
  }
}

export default new ViTriService();
