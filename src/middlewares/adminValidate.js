const ADMIN_TYPE = 'admin';
export default (req, res, next) => {
  const {user} = req || {};

  const {type} = user;
  if (type !== ADMIN_TYPE) {
    throw new Error('Not Authorized');
  }

  next();
}
