const express = require('express');
const router = express.Router();
const storage = require('../database/database_config');
const bcrypt = require('bcryptjs');
const joi = require('joi');
const path = require('path');
const fs = require('fs');
const formidable = require('formidable')
const readChunk = require('read-chunk')
const fileType = require('file-type')
const passport = require('passport')
const postSchema = joi.object().keys({
    id : joi.string().required(),
    fullname : joi.string().required(),
    username : joi.string().required(),
    password : joi.string().required(),
    email : joi.string().email().required(),
    alamat : joi.string().required(),
    createdAt : joi.string().required(),
    updatedAt : joi.string().required(),
    number_phone : joi.string().required(),
    users_detail : joi.object().keys({
        user_id : joi.string().required(),
        profile_image : joi.string().required(),
        budget_users : joi.number().required(),
        createdAt : joi.string().required(),
        updatedAt : joi.string().required()
    })
})

const putSchema = joi.object().keys({
    id : joi.string().required(),
    fullname : joi.string().required(),
    username : joi.string().required(),
    password : joi.string().required(),
    email : joi.string().email().required(),
    alamat : joi.string().required(),
    number_phone : joi.string().required(),
    image_to_delete : joi.string().allow('',null),
    updatedAt : joi.string().required(),
    users_detail : joi.object().keys({
        id : joi.number().required(),
        user_id : joi.string().required(),
        profile_image : joi.string().required(),
        budget_users : joi.number().required(),
        updatedAt : joi.string().required()
    })
})

router.get('/users' , passport.authenticate('jwt' , { session : false }) , async(req , res) => {
    let data = await storage.users.findAll({include: [{ model : storage.users_details , where : {
        user_id : storage.Sequelize.col('users.id')
    }}]})
    res.json(data);
})

router.get('/users/:id' , passport.authenticate('jwt' , { session : false }) , async(req , res) => {
    let data = await storage.users.findOne({
        id : req.params.id
    },{
        include : [{
            model : storage.users_details,
            where : {
                user_id : storage.Sequelize.col('users.id')
            }
        }]
    })
    res.json(data)
})

router.get('/users/products/:id' , passport.authenticate('jwt' , { session : false}) , async(req , res) => {
    let data = await storage.users.findOne({
        where : {
            id : req.params.id
        },
        include : [{
            model : storage.product,
            where : { user_id : storage.Sequelize.col('users.id') }
        }]
    })
    res.json(data)
})

router.get('/users/products' , passport.authenticate('jwt' , { session : false }) , async(req , res) => {
    let data = await storage.users.findAll({
        include : [
            {
                model : storage.product,
                where : { user_id : storage.Sequelize.col('users.id') }
            }  
        ]
    })
    res.json(data)
})

router.post('/users' , async(req , res) => {
    const form = new formidable.IncomingForm();
    form.multiples = true;
    form.uploadDir = path.join(__dirname , '../upload_dir')
    form.on('file' , (name , file) => {
        let buffer = null;
        let type = null;
        let filename = '';
        buffer = readChunk.sync(file.path , 0 , 262);
        type = fileType(buffer);
        if(type !== null && (type.ext === 'png' || type.ext === 'jpg' || type.ext === 'bmp')){
            filename = file.name;
            const arrays = filename.split("-");
            const dir = path.join(__dirname , '../uploaded_files/images/' + arrays[0])
            if(fs.existsSync(dir)){
                fs.rename(file.path , dir + '/' + arrays[1] , (err) => {
                    if(err) console.error(err);
                    else {
                        console.log('[+]FILE RENAMED[+]');
                    }
                })
            } else {
                fs.mkdirSync(dir)
                fs.rename(file.path , dir + '/' + arrays[1] , (err) => {
                    if(err) console.error(err);
                    else {
                        console.log('[+]FILE RENAMED[+]');
                    }
                })
            }
        }
    })
    form.parse(req , (error , fields , files) => {
        const data = JSON.parse(JSON.stringify(fields.json_data))
        joi.validate(data , postSchema , (err , value) => {
            if(err) return res.json(err);
            else {
                storage.users.findOne({
                    where : {
                        id : value.id
                    }
                }).then(user => {
                    if(user){
                        return res.status(302).json({
                            "server_message" : "data already exist",
                            "status" : "failure"
                        })
                    } else if(user == null){
                        bcrypt.genSalt(12 , (err , salt) => {
                            if(err) console.error(err);
                            else {
                                bcrypt.hash(value.password , salt , (err , hash) => {
                                    if(err) console.error(err);
                                    else {
                                        value.password = hash;
                                        storage.users.create(value , {
                                            include : [{ model : storage.users_details }]
                                        }).then(() => {
                                            res.status(200).json({
                                                "server_message" : "data saved",
                                                "status" : "ok"
                                            })
                                        }).catch(err => res.json(err))
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    })
    form.on('error' , (err) => {
        console.error(err);
    })
    form.on('end' , () => {
        console.log('[+]All requested file and data have been processed[+]');
    })
})

router.put('/users' , passport.authenticate('jwt' , { session : false }) ,  async(req , res) => {
    const form = new formidable.IncomingForm();
    form.multiples = true;
    form.uploadDir = path.join(__dirname , '../upload_dir')
    form.on('file' , (name , file) => {
        let buffer = null;
        let type = null;
        let filename = '';
        buffer = readChunk.sync(file.path , 0 , 262);
        type = fileType(buffer);
        if(type !== null && (type.ext === 'png' || type.ext === 'jpg' || type.ext === 'bmp')){
            filename = file.name;
            const arrays = filename.split("-");
            const dirOld = path.join(__dirname , '../uploaded_files/images/' + arrays[0])
            if(fs.existsSync(dirOld)){
                const dirNew = path.join(__dirname , '../uploaded_files/images/' + arrays[1])
                fs.rename(dirOld , dirNew , (err) => {
                    if(err) console.error(err)
                    else {
                        fs.rename(file.path , dirNew + '/' + arrays[2] , (err) => {
                            if(err) console.error(err);
                            else {
                                console.log('[+]File Renamed[+]')
                            }
                        })
                    }
                })
            } else {
                const dirNew = path.join(__dirname , '../uploaded_files/images/' + arrays[1])
                fs.mkdirSync(dirNew)
                fs.rename(file.path , dirNew + '/' + arrays[2] , (err) => {
                    if(err) console.error(err);
                    else {
                        console.log('[+]File Renamed[+]')
                    }
                })
            }
        }
    })
    form.parse(req , (error , fields , files) => {
        const data = JSON.parse(JSON.stringify(fields.json_data))
        joi.validate(data , putSchema , (err , value) => {
            if(err) return res.json(err);
            else {
                const values = {
                    fullname : value.fullname,
                    username : value.username,
                    password : value.password,
                    email : value.email,
                    alamat : value.alamat,
                    number_phone : value.number_phone,
                    updatedAt : value.updatedAt
                }
                const users_detail = {
                    user_id : value.users_detail.user_id,
                    profile_image : value.users_detail.profile_image,
                    budget_users : value.users_detail.budget_users,
                    updatedAt : value.users_detail.updatedAt
                }
                bcrypt.genSalt(12 , (err , salt) => {
                    if(err) console.error(err);
                    else {
                        bcrypt.hash(values.password , salt , (err , hash) => {
                            if(err) console.error(err);
                            else {
                                values.password = hash;
                                storage.users.update(values , {
                                    where : {
                                        id : value.id
                                    }
                                }).then(() => {
                                    storage.users_details.update(users_detail , {
                                        where : {
                                            id : value.users_detail.id
                                        }
                                    }).then(() => {
                                        if(value.image_to_delete !== ""){
                                            fs.unlink(path.join(__dirname , '../uploaded_files/images/' + value.fullname + '/' + 
                                            value.image_to_delete) , (err) => {
                                                    if(err) console.error(err);
                                                    else console.log('[+] File Removed [+]')
                                            })
                                        }
                                        res.status(200).json({
                                            "server_message" : "data updated",
                                            "status" : "ok"
                                        })
                                    }).catch(err => res.json(err));
                                }).catch(err => res.json(err))
                            }   
                        })
                    }
                })
            }
        })
    })
    form.on('error' , (err) => {
        console.error(err);
    })
    form.on('end' , () => {
        console.log('[+]All requested file and data have been processed[+]');
    })
})

router.delete('/users/:id' , passport.authenticate('jwt' , { session : false }) , async(req , res) => {
    const id = req.params.id;
    storage.users.findOne({
        where : {
            id : id
        },
        include : [{
            model : storage.users_details,
            where : { user_id : storage.Sequelize.col('users.id') }
        }]
    }).then(user => {
        if(user){
            const users_details = user.users_detail;
            users_details.map(images => {
                fs.unlink(path.join(__dirname , '../uploaded_files/images/' + user.fullname + '/' + images.profile_image),
                    (err) => {
                        if(err) console.error(err);
                        else console.log('[+]File Deleted[+]');
                    })
            })
            storage.users.destroy({
                where : {
                    id : id
                }
            }).then(() => {
                
                res.status(200).json({
                    "server_message" : "data deleted",
                    "status" : "ok"
                })
            }).catch(err => res.json(err))
        } else if(user == null){
            res.status(404).json({
                "server_message" : "data not found",
                "status" : "Failure"
            })
        }
    })
})

module.exports = router;