import { asyncHandler } from './asyncHandler.js';

export const createCtrl = (serviceFn, statusCode = 200) =>
  asyncHandler(async (req, res) => {
    const result = await serviceFn(req.body, req.params, req.query, req);

    if (statusCode === 204) {
      return res.sendStatus(204);
    }
    return res.status(statusCode).json(result);
  });
