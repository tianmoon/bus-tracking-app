export function errorHandler(err, req, res, next) {
    console.error("Error:", err.message);

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        status: 'error',
        message: err.message || 'Lỗi máy chủ nội bộ',
    });
}