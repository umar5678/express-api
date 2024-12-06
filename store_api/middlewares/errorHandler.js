export const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err)
    return res.status(500).json({msg: "Something went wrong"})
}

// as compared to tasks error handler, it is different, fot this project, i will use express-async-errors package