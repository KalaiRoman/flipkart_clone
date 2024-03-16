export const notFound = async (req, res, next) => {
    const error = new Error(`Not Found Api - ${req.originalUrl}`);
    res.status(404);
    next(error);
}

export const errorMiddleware = async (error, req, res, next) => {
    if (res.headerSent) {
        return next(error)
    }
    res.status(error?.code || 500).json({ message: error?.message || "An Unknow error occured" })
}