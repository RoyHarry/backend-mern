import Jwt from "jsonwebtoken";
import { TOKEN_SECRET } from '../constants.js';

export const createAccessToken = async (payload)=>{

    return new Promise ((resolve, reject)=>{

        Jwt.sign(
            payload,
            TOKEN_SECRET,
            {
                expiresIn: "1d"
            },
            (error, token)=>{
                if(error) reject("An error happened")

                resolve(token);
            }
        )
    });
}