import { USER_TYPES } from '../configs';
export default (req, res, next) => {
  const {user} = req || {};

  const {role} = user;
  if (role !== USER_TYPES.ADMIN) {
    throw new Error('Not Authorized');
  }

  next();
}
