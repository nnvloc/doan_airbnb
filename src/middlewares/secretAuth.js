export default (req, res, next) => {
  const key = req.headers['x-api-key'];
  if (!key) {
    throw new Error('Not authorized');
  }
  if (key !== process.env.API_KEY) {
    throw new Error('Not authorized');
  }
  next();
}
