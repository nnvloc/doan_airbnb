import Models from '@models';
class OrderService {
  constructor() {
    this.Model = Models.orders;
  }

  async findAll(filters = {}) {
    return await this.Model.findAll(filters);
  }

  create(params) {
    return this.Model.create(params);
  }

  getById(id, filters = {}) {
    
    const defaultFilter = {
      id,
    }

    const {where, ...rest} = filters;

    const options = {
      where: {
        ...defaultFilter,
        ...where,
      },
      ...rest
    }

    return this.Model.findOne(options)
  }
}

export default new OrderService();
