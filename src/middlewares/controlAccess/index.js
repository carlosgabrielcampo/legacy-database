import { handleResponseError } from "../errorHandle.js";
const authorizationToken = process.env.AUTH_TOKEN

export default (req, res, next) => {
    try{
        const { authorization } = req.headers;
        if(!authorization || authorization.split(' ')[1] !== authorizationToken) 
        throw new Error("Invalid Bearer token");
        next();
    } catch (error){
        return handleResponseError(error, res)
    }
};
