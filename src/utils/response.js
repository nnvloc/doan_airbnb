export const sendResponse = (res, {success = true, error = null, ...data}, options) => {
  return res.json({
    success,
    data: {...data},
    error,
  });
}
