const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const storage = require('../database/database_config');
const joi = require('joi');
const loginUsername = joi.object().keys({
    username : joi.string().required(),
    password : joi.string().required()
})
const loginEmail = joi.object().keys({
    email : joi.string().required(),
    password : joi.string().required()
})

router.post('/admin/login' , async(req , res) => {
    const isEmailOrUsername = req.headers['x-type'];
    const data = JSON.parse(JSON.stringify(req.body))
    if(isEmailOrUsername === 'username'){
        joi.validate(data , loginUsername , (err , value) => {
            if(err) return res.json(err);
            else {
                storage.admins.findOne({
                    where : {
                        username : data.username
                    }
                }).then(username => {
                    if(username){
                        bcrypt.compare(data.password , username.password , (err , rest) => {
                            if(err) return res.json(err);
                            else {
                                if(rest === true){
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
                                        "admin_data" : username
                                    })
                                } else {
                                    res.status(401).json({
                                        "server_message" : "login failure , password not matching",
                                        "status" : "ok"
                                    })
                                }
                            }
                        })
                    } else {
                        res.status(404).json({
                            "server_message" : "data not found",
                            "status" : "ok"
                        })
                    }
                })
            }
        })
    } else if(isEmailOrUsername === 'email'){
        joi.validate(data , loginEmail , (err , value) => {
            if(err) return res.json(err);
            else {
                storage.admins.findOne({
                    where : {
                        email : data.email
                    }
                }).then(email => {
                    if(email){
                        bcrypt.compare(data.password , email.password , (err , rest) => {
                            if(err) return res.json(err);
                            else {
                                if(rest === true){
                                    const payload = {
                                        username : email.username,
                                        email : email.email,
                                        id : email.id
                                    }
                                    const token = jwt.sign(payload , 'StarkIndustries' , {
                                        expiresIn : '1h'
                                    })
                                    res.status(200).json({
                                        "server_message" : "login successfully",
                                        "token" : `Bearer ${token}`,
                                        "status" : "ok",
                                        "admin_data" : email
                                    })
                                } else {
                                    res.status(401).json({
                                        "server_message" : "login failure , password not matching",
                                        "status" : "ok"
                                    })
                                }
                            }
                        })
                    } else {
                        res.status(404).json({
                            "server_message" : "data not found",
                            "status" : "ok"
                        })
                    }
                })
            }
        })
    }
})

module.exports = router;