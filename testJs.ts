import ErrorHandler from './src/middlewares/error'

const errObj = new ErrorHandler("this is Eror", 400)

console.log("errObj", errObj)