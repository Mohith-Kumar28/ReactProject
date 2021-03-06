const ErrorHandler=require("../utils/errorhandler");

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error";

    // Wrong Mongodb ID error
if(err.name==="CastError"){
    const message=`Resource not found. Invalid: ${err.path}`;
    err= new ErrorHandler(message,400);

}

// mongoose duplicate key error
if(err.code===11000){
    const message=`Duplicate ${Object.keys(err.keyValue)} Entered`;
    err= new ErrorHandler(message,400)
}

// wrong JWT error
if(err.name==="jsonWebTokenError"){
    const message=`jsonWebTokenError is invalid, try again`;
    err= new ErrorHandler(message,400)
}

// Jwt expire
// wrong JWT error
if(err.name==="TokenExpiredError"){
    const message=`jsonWebTokenError is expired, try again`;
    err= new ErrorHandler(message,400)
}
    res.status(err.statusCode).json({
        success:false,
        message:err.message,
        
    });
}