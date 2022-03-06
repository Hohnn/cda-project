
export default (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'Une erreur est survenue'
    
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    })
  }