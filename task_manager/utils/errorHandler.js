import { customApiError } from "./customApiError.js";
const errorHandler = (err, req, res, next) => {
  if (err instanceof customApiError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  return res.status(500).json({ msg: err });
};

export default errorHandler;

//
// asyncHandler is doing try-catch stuff, if there is an error, in the catch block, will be handed oer to the next method, which will eventually handled by errorHandler

// if there an error occure in controller that we want ot sent to the user, like error in a querry, or 404 error responses in 2-3 routes, for that i will make another error class
// then merge those two errors functionality
