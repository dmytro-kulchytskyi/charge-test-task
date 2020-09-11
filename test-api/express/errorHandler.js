export default function(err, req, res, next) {
  if(err) {
    const { statusCode, message } = err;
    console.error(err.stack);
    res.status(statusCode || 400).json({
      error: message,
    });   
  };
};