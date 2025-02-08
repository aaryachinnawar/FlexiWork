import userSchema from '../models/userModel.js';
import { hashPassword , comparePassword} from '../helpers/authHelper.js';
import jwt from 'jsonwebtoken';

export const registerController =  async(req, res) => {
    try{
        const {name, email, password,phone,role} = req.body;
        if(!name){
            return res.status(400).json({message: 'Name is required'});
        }
        if(!email){
            return res.status(400).json({message: 'Email is required'});
        }
        if(!password){
            return res.status(400).json({message: 'Password is required'});
        }
        if(!phone){
            return res.status(400).json({message: 'Phone is required'});
        }
        if(!role){
            return res.status(400).json({message: 'Role is required'});
        }
        const existingUser = await userSchema.findOne({email});
        if(existingUser){
            return res.status(400).json({message: 'User already exists'});
        }
        const hashedPassword = await hashPassword(password);
        const user = new userSchema({
            name,
            email,
            password: hashedPassword,
            phone,
            role,
        });
        await user.save();
        res.status(201).json({message: 'User registered successfully'});
    }catch(error){
        res.status(500).json({error: error.message});

    }
}

export const loginController = async(req, res) => {
    try{
        const {email, password,} = req.body;
        if(!email){
            return res.status(400).json({message: 'Email is required'});
        }
        if(!password){
            return res.status(400).json({message: 'Password is required'});
        }
        const user = await userSchema.findOne({email});
        if(!user){
            return res.status(400).json({message: 'User does not exist'});
        }
        const isMatch = await comparePassword(password,user.password);
        if(!isMatch){
            return res.status(400).json({message: 'Invalid credentials'});
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
        res.status(200).send({
            token,
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
            }
        });
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

