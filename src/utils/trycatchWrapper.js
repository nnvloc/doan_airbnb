export default (excuteFunction) => async (req, res, next) => {
  try {
    return await excuteFunction(req, res, next);
  } catch(err) {
    return next(err);
  }
}