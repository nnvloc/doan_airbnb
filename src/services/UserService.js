import Models from '@models';

class UserService {
  constructor() {
    this.UserModel = Models.Users;
  }

  async getUsers(filters = {}) {
    return this.UserModel.findAll(filters);
  }

  async createUser(userParams) {
    return this.UserModel.create(userParams);
  }

  async getUserByEmail(email) {
    return this.UserModel.findOne({
      where: {
        email: email,
      }
    });
  }

  async getUserById(userId) {
    return this.UserModel.findOne({
      where: {
        id: userId
      }
    });
  }

  async removeUser(id) {
    return this.UserModel.destroy({
      where: {
        id
      }
    });
  }
}

export default new UserService();
