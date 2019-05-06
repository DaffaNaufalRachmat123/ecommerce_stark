const router = require('express').Router();
const formidable = require('formidable');
const readChunk = require('read-chunk')
const fileType = require('file-type')
const joi = require('joi')
const fs = require('fs')
const path = require('path')
const storage = require('../database/database_config')
const bcrypt = require('bcryptjs')

const adminSchema = joi.object().keys({
    id : joi.string().required(),
    fullname : joi.string().required(),
    username : joi.string().required(),
    password : joi.string().required(),
    email : joi.string().email().required(),
    alamat : joi.string().required(),
    number_phone : joi.string().required(),
    createdAt : joi.string().required(),
    updatedAt : joi.string().required(),
    admins_detail : joi.object().keys({
        admin_id : joi.string().required(),
        profile_image : joi.string().required(),
        createdAt : joi.string().required(),
        updatedAt : joi.string().required()
    })
})

const AdminSchema = joi.object().keys({
    id : joi.string().required(),
    fullname : joi.string().required(),
    username : joi.string().required(),
    password : joi.string().required(),
    email : joi.string().email().required(),
    alamat : joi.string().required(),
    number_phone : joi.string().required(),
    image_to_delete : joi.string().allow('',null),
    updatedAt : joi.string().required(),
    admins_details : joi.object().keys({
        id : joi.number().required(),
        admin_id : joi.string().required(),
        profile_image : joi.string().required(),
        updatedAt : joi.string().required()
    })
})

router.get('/admins/details' , async(req , res) => {
    let data = await storage.admins.findAll({
        include : [{
            model : storage.admins_details,
            where : { admin_id : storage.Sequelize.col('admins.id') }
        }]
    })
    res.json(data)
})

router.get('/admins' , async(req , res) => {
    let data = await storage.admins.findAll({
        include : [{
            model : storage.admins_details,
            where : { admin_id : storage.Sequelize.col('admins.id') }
        }]
    })
    res.json(data)
})

router.get('/admins/details/:id' , async(req , res) => {
    let data = await storage.admins.findOne({
        where : {
            id : req.params.id
        },
        include : [{
            model : storage.admins_details,
            where : { admin_id : storage.Sequelize.col('admins.id') }
        }]
    })
    res.json(data)
})

router.get('/admins/:id' , async(req , res) => {
    let data = await storage.admins.findOne({
        raw : true,
        where : {
            id : req.params.id
        }
    })
    res.json(data)
})

router.post('/admins' , async(req , res) => {
    const form = new formidable.IncomingForm();
    form.multiples = true;
    form.uploadDir = path.join(__dirname , '../upload_dir')
    form.on('file' , (name , file) => {
        let buffer = null;
        let type = null;
        let filename = '';
        buffer = readChunk.sync(file.path , 0 , 262)
        type = fileType(buffer);
        if(type !== null && (type.ext === 'png' || type.ext === 'jpg' || type.ext === 'bmp')){
            filename = file.name;
            const arrays = filename.split("-")
            const dir = path.join(__dirname , '../uploaded_files/admin_images/' + arrays[0])
            if(fs.existsSync(dir)){
                fs.rename(file.path , dir + '/' + arrays[1] , (err) => {
                    if(err) console.error(err);
                    else {
                        console.log('[+]FILE RENAMED[+]')
                    }
                })
            } else {
                fs.mkdirSync(dir)
                fs.rename(file.path , dir + '/' + arrays[1] , (err) => {
                    if(err) console.error(err)
                    else {
                        console.log('[+]FILE RENAMED[+]')
                    }
                })
            }
        }
    })
    form.parse(req , (error , fields , files) => {
        const data = JSON.parse(JSON.stringify(fields.json_data))
        joi.validate(data , adminSchema , (err , value) => {
            if(err) return res.json(err);
            else {
                storage.admins.findOne({
                    where : {
                        id : value.id
                    }
                }).then(admin => {
                    if(admin){
                        return res.status(302).json({
                            "server_message" : "data already exist",
                            "status" : "failure"
                        })
                    } else if(admin == null){
                        bcrypt.genSalt(12 , (err , salt) => {
                            if(err) console.error(err);
                            else {
                                bcrypt.hash(value.password , salt , (err , hash) => {
                                    if(err) console.error(err);
                                    else {
                                        value.password = hash;
                                        storage.admins.create(value , {
                                            include : [{
                                                model : storage.admins_details
                                            }]
                                        }).then(() => {
                                            res.status(200).json({
                                                "server_message" : "data saved",
                                                "status" : "ok"
                                            })
                                        })
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
        console.log('[+]All requested file and data have been processed[+]')
    })
})

router.put('/admins' , async(req , res) => {
    const form = new formidable.IncomingForm();
    form.multiples = true;
    form.uploadDir = path.join(__dirname , '../upload_dir')
    form.on('file' , (name , file) => {
        let buffer = null;
        let type = null;
        let filename = '';
        buffer = readChunk.sync(file.path , 0 , 262)
        type = fileType(buffer)
        if(type !== null && (type.ext === 'png' || type.ext === 'jpg' || type.ext === 'bmp')){
            filename = file.name;
            const arrays = filename.split("-");
            const dirOld = path.join(__dirname , '../uploaded_files/admin_images/' + arrays[0])
            if(fs.existsSync(dirOld)){
                const dirNew = path.join(__dirname , '../uploaded_files/admin_images/' + arrays[1])
                fs.rename(dirOld , dirNew , (err) => {
                    if(err) console.error(err);
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
                const dirNew = path.join(__dirname , '../uploaded_files/admin_images/' + arrays[1])
                fs.mkdirSync(dirNew)
                fs.rename(file.path , dirNew + '/' + arrays[2] , (err) => {
                    if(err) console.error(err)
                    else {
                        console.log('[+]File Renamed[+]')
                    }
                })
            }
        }
    })
    form.parse(req , (error ,fields , files) => {
        const data = JSON.parse(JSON.stringify(fields.json_data))
        joi.validate(data , AdminSchema , (err , value) => {
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
                const admins_details = {
                    admin_id : value.admins_details.admin_id,
                    profile_image : value.admins_details.profile_image,
                    updatedAt : value.admins_details.updatedAt
                }
                bcrypt.genSalt(12 , (err , salt) => {
                    if(err) console.error(err);
                    else {
                        bcrypt.hash(values.password , salt , (err , hash) => {
                            values.password = hash;
                            storage.admins.update(values , {
                                where : {
                                    id : value.id
                                }
                            }).then(() => {
                                storage.admins_details.update(admins_details , {
                                    where : {
                                        id : value.admins_details.id
                                    }
                                }).then(() => {
                                    if(value.image_to_delete !== null || value.image_to_delete !== ""){
                                        fs.unlink(path.join(__dirname , '../uploaded_files/admin_images/' + value.fullname + '/' + 
                                        value.image_to_delete) , (err) => {
                                            if(err) console.error(err);
                                            else console.log('[+]FILE RENAMED[+]')
                                        })
                                        res.status(200).json({
                                            "server_message" : "data updated",
                                            "status" : "ok"
                                        })
                                    } else {
                                        res.status(200).json({
                                            "server_message" : "data updated",
                                            "status" : "ok"
                                        })
                                        console.log('[!]No Image Deleted[!]')
                                    }
                                }).catch(err => res.json(err))
                            }).catch(err => res.json(err))
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
        console.log('[+]All requested file and data have been processed[+]')
    })
})

router.delete('/admins/:id' , async(req , res) => {
    const id = req.params.id;
    storage.admins.findOne({
        where : {
            id : id
        },
        include : [{
            model : storage.admins_details,
            where : { admin_id : storage.Sequelize.col('admins.id') }
        }]
    }).then(admin => {
        if(admin){
            const admins_details = admin.admins_detail
            admins_details.map(images => {
                fs.unlink(path.join(__dirname , '../uploaded_files/admin_images/' + admin.fullname + '/' + images.profile_image),
                    (err) => {
                        if(err) console.error(err);
                        else console.log('[+]FILE DELETED[+]')
                    })
            })
            storage.admins.destroy({
                where : {
                    id : id
                }
            }).then(() => {
                res.status(200).json({
                    "server_message" : "data deleted",
                    "status" : "ok"
                })
            }).catch(err => res.json(err))
        } else {
            res.status(404).json({
                "server_message" : "data not found",
                "status" : "failure"
            })
        }
    })
})

module.exports = router;