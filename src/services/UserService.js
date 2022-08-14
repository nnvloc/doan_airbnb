import Models from '@models';

class UserService {
  constructor() {
    this.UserModel = Models.Users;
  }

  getUsers(filters = {}) {
    return this.UserModel.findAll(filters);
  }

  createUser(userParams) {
    return this.UserModel.create(userParams);
  }

  getUserByEmail(email) {
    return this.UserModel.findOne({
      where: {
        email: email,
      }
    });
  }

  getUserById(userId) {
    return this.UserModel.findOne({
      where: {
        id: userId
      }
    });
  }
}

export default new UserService();
