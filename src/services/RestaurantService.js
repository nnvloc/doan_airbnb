import Models from '@models';
class RestaurantService {
  constructor() {
    this.Model = Models.Restaurants;
  }

  findAll(filters = {}) {
    return this.Model.findAll(filters);
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

export default new RestaurantService();
