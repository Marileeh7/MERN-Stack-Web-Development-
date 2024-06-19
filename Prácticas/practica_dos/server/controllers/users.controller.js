const mongoose = require("mongoose");
const UserModel = require("../models/users.models");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const saltRounds = 10;

module.exports = {
    createUser: (req, res) => {
        let data = req.body;
        if (!data.password) {
            return res.status(400).json({ error: { password: "Password is mandatory" } });
        }
        if (data.password.length > 12 || data.password.length < 6) {
            return res.status(400).json({ error: { password: "Password should have between 6 and 12 chars" } });
        }
        bcrypt.hash(data.password, saltRounds, function (err, hash) {
            if (err) {
                console.error("Error hashing password:", err);
                return res.status(500).json({ error: err });
            }
            data = { ...data, password: hash };
            UserModel.create(data)
                .then(() => {
                    res.json({ success: true, message: "Usuario registrado exitosamente" }); // Agrega el mensaje aquí
                })
                .catch((error) => {
                    if (error instanceof mongoose.Error.ValidationError) {
                        let keys = Object.keys(error.errors);
                        let error_dict = {};
                        keys.forEach((key) => {
                            error_dict[key] = error.errors[key].message;
                        });
                        res.status(400).json({ error: error_dict });
                    } else {
                        console.error("Error creating user:", error);
                        res.status(500).json({ error: "Internal server error" });
                    }
                });
        });
    },
    loginUser: (req, res) => {
        let data = req.body;
        if (!data.password) {
            return res.status(400).json({ error: "Password is mandatory" });
        }
        UserModel.findOne({ email: data.email })
            .then((user) => {
                if (user) {
                    bcrypt.compare(data.password, user.password, function (err, result) {
                        if (err) {
                            console.error("Error comparing passwords:", err);
                            return res.status(500).json({ error: "Internal server error" });
                        }
                        if (result) {
                            let userInfo = {
                                _id: user._id,
                                first_name: user.first_name,
                                last_name: user.last_name,
                                email: user.email
                            };
                            const token = jwt.sign(userInfo, process.env.SECRET, { expiresIn: '1h' });

                            const cookieOptions = {
                                httpOnly: true,
                                expires: new Date(Date.now() + 900000000)
                            };
                            return res.cookie("token", token, cookieOptions).json({ success: true, user: userInfo });
                        } else {
                            res.status(401).json({ error: "Email and password combination doesn't match" });
                        }
                    });
                } else {
                    res.status(404).json({ error: "Email and password combination doesn't exist" });
                }
            })
            .catch((error) => {
                console.error("Error finding user:", error);
                res.status(500).json({ error: "Internal server error" });
            });
    }
};
