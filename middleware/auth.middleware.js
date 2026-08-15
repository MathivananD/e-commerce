const { ERROR } = require('../constants/error-code.constants')
const AppError = require('../utils/app-error')
const passwordUtils = require('../utils/jwt')

const authMiddleWare = (req, res,next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        throw new AppError(ERROR.UNAUTHORIZED);
    }
    const [type, token] = authorization.split(" ")
    if (type != 'Bearer' || !token) {
        throw new AppError(ERROR.INVALIDTOken);
    }
    const decoded = passwordUtils.verifyToken(token);
    console.log("Token details", decoded)
    req.user = decoded;
    req.userId=decoded.userId

    next();
}

const authRefreshMiddleWare = (req, res,next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        throw new AppError(ERROR.UNAUTHORIZED);
    }
    const [type, token] = authorization.split(" ")
    if (type != 'Bearer' || !token) {
        throw new AppError(ERROR.INVALIDTOken);
    }
    const decoded = passwordUtils.verifyToken(token);
    console.log("Token details", decoded)
    req.user = decoded;
    req.userId=decoded.userId

    next();
}



module.exports={authMiddleWare,authRefreshMiddleWare}