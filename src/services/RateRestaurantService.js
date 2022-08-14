import Models from '@models';
class RateRestaurantService {
  constructor() {
    this.Model = Models.rate_res;
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

export default new RateRestaurantService();
