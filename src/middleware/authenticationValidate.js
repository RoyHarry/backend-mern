import Jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../constants.js";

export const validateToken = async (req, res, next)=>{

    //const token = req.headers.cookie;
    const { token } = req.cookies;
    
    if(token === undefined){
        return res.status(500).send({ msg : "Token es obligatorio" })
    }

    console.log(typeof token);

    console.log(token);
    Jwt.verify(token, TOKEN_SECRET, (error, decoded)=>{

        if(error){
            return res.status(500).send({ msg : "Token Inválido" })
        }

        console.log('error',error);
        console.log('decoded', decoded);
        next();
    });
    

}