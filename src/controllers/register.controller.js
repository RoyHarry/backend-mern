import { userModel } from "../models/user.model.js"
import bcrypt from 'bcrypt';
import { createAccessToken } from "../auth/auth.js";
import Joi from "joi";

export const registerUser = async (req, res)=> {

    const { username, email, password, role } = req.body;

    const registerSchema = Joi.object({
        username: Joi.string().min(6).max(20).required(),
        email: Joi.string().min(10).max(100).required().email(),
        password: Joi.string().min(10).max(200).required(),
        role: Joi.string().min(5).max(100).required(),
    })

    const { error } = registerSchema.validate(req.body);

    if(error) {
        return res.status(500).send({ msg : error.details[0].message})
    }

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPassword = bcrypt.hashSync(password, salt);

    try {
        const newUser = new userModel({
            username: username,
            email: email,
            password: hashPassword,
            role: role,
        });
        
        const userFound = await userModel.findOne({ email: email, username: username });
        
        if(userFound){
            res.status(500).send({ msg: "El usuario ya existe" });
        }else{
            await newUser.save();    
            const token =  await createAccessToken({
                username: newUser.username,
                role: newUser.role,
                email: newUser.email
            });
    
            res.status(200).send( {token : token} );
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({ msg : "ocurrio un error en el servidor"});
    }
    
}

export const login = async (req, res)=>{

    const { username, password } = req.body

    const user = await userModel.findOne({ username: username});
    console.log("user",user);

    if(!user) return res.status(400).send({ msg: "No existe el usuario"})

    const isTrue = await bcrypt.compare(password, user.password);
    console.log(isTrue);
    if(isTrue){
        const token = await createAccessToken({ id: user._id });
        res.cookie("token", token);
        res.status(200).send({  msg : "Login correcto"});
    }else{
        res.status(400).send({ msg: "Invalid Credentials"});
    }
    
}

export const logout = async (req, res)=>{
    
    res.cookie('token', '', {
        expires: new Date(0),
    });

    res.status(200).send({msg : "Se salio de sesión"});

}

export const myProfile = async (req, res)=>{

    const { username } = req.body;
    console.log(username);

    const user = await userModel.findOne({ username: username });
    
    if(!user){
        return res.status(400).send({ msg : "El usuario no fue encontrado" })
    }
    res.status(200).send({ username: user.username, email: user.email, role: user.role });
}