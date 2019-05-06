const express = require('express');
const router = express.Router();
const storage = require('../database/database_config')
const joi = require('joi');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const loginSchema = joi.object().keys({
    username : joi.string().required(),
    password : joi.string().required()
})
const loginSchemas = joi.object().keys({
    email : joi.string().email().required(),
    password : joi.string().required()
})

router.post('/user/login' , async(req , res) => {
    const isEmailOrUsername = req.headers['x-type'];
    const data = JSON.parse(JSON.stringify(req.body));
    if(isEmailOrUsername === 'email'){
        joi.validate(data , loginSchemas , (err , value) => {
            if(err) res.json(err);
            else {
                storage.users.findOne({
                    where : {
                        email : data.email
                    }
                }).then(result => {
                    if(result){
                        bcrypt.compare(data.password , result.password , (err , rest) => {
                            if(err) return res.json(err);
                            else {
                                if(rest == true){
                                    const payload = {
                                        username : result.username,
                                        email : result.email,
                                        id : username.id
                                    }
                                    const token = jwt.sign(payload , 'StarkIndustries' , {
                                        expiresIn : '1h'
                                    })
                                    res.status(200).json({
                                        "server_message" : "login successfully",
                                        "token" : `Bearer ${token}`,
                                        "status" : "ok",
                                        "user_data" : result
                                    })
                                } else {
                                    res.status(401).json({
                                        "server_message" : "login failure , password not matching",
                                        "status" : "failure"
                                    })
                                }
                            }
                        })
                    } else {
                        return res.status(404).json({
                            "server_message" : "account not found",
                            "status" : "failure"
                        })
                    }
                })
            }
        })
    } else if(isEmailOrUsername === 'username'){
        joi.validate(data , loginSchema , (err , value) => {
            if(err) return res.json(err)
            else {
                storage.users.findOne({
                    where : {
                        username : data.username
                    }
                }).then(username => {
                    if(username){
                        bcrypt.compare(data.password , username.password , (err , rest) => {
                            if(err) res.json(err);
                            if(rest == true){
                                const payload = {
                                    username : username.username,
                                    email : username.email,
                                    id : username.id
                                }
                                const token = jwt.sign(payload , 'StarkIndustries' , {
                                    expiresIn : '1h'
                                })
                                res.status(200).json({
                                    "server_message" : "login successfully",
                                    "token" : `Bearer ${token}`,
                                    "status" : "ok",
                                    "user_data" : username
                                })
                            } else {
                                res.status(401).json({
                                    "server_message" : "login failure , password not matching",
                                    "status" : "failure"
                                })
                            }
                        })
                    } else {
                        return res.status(404).json({
                            "server_message" : "data not found",
                            "status" : "failure"
                        })
                    }
                })
            }
        })
    }
})

module.exports = router;