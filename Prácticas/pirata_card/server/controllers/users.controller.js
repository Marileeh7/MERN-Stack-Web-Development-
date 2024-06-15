const mongoose = require("mongoose");
const UserModel = require("../models/users.models");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const saltRounds = 10;

module.exports = {
    createUser: async (req, res) => {
        const data = req.body;
        console.log('Received data for createUser:', data);
        
        if (!data.password) {
            return res.status(400).json({ error: { password: "Password is mandatory" } });
        }
        if (data.password.length > 12 || data.password.length < 6) {
            return res.status(400).json({ error: { password: "Password should have between 6 and 12 chars" } });
        }

        try {
            const hash = await bcrypt.hash(data.password, saltRounds);
            const userData = { ...data, password: hash };
            await UserModel.create(userData);
            res.json({ success: true });
        } catch (error) {
            console.error('Error creating user:', error);
            if (error instanceof mongoose.Error.ValidationError) {
                const error_dict = Object.keys(error.errors).reduce((acc, key) => {
                    acc[key] = error.errors[key].message;
                    return acc;
                }, {});
                return res.status(400).json({ error: error_dict });
            }
            res.status(500).json({ error: error.message });
        }
    },
    
    loginUser: async (req, res) => {
        const data = req.body;
        console.log('Received data for loginUser:', data);
        
        if (!data.password) {
            return res.status(400).json({ error: "Password is required" });
        }

        try {
            const user = await UserModel.findOne({ email: data.email });
            if (!user) {
                return res.status(404).json({ error: "Email and password combination doesn't match" });
            }

            const match = await bcrypt.compare(data.password, user.password);
            if (!match) {
                return res.status(401).json({ error: "Email and password combination doesn't match" });
            }

            const userInfo = {
                _id: user._id,
                name: user.name,
                email: user.email
            };
            const token = jwt.sign(userInfo, process.env.SECRET, { expiresIn: '10d' });

            const cookieOptions = {
                httpOnly: true,
                expires: new Date(Date.now() + 900000000) // Adjust this as needed
            };
            res.cookie("token", token, cookieOptions).json({ success: true, user: userInfo });
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ error: error.message });
        }
    }
};
