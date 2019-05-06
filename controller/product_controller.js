const router = require('express').Router()
const storage = require('../database/database_config')
const formidable = require('formidable')
const readChunk = require('read-chunk')
const fileType = require('file-type')
const path = require('path')
const fs = require('fs')
const passport = require('passport')
const joi = require('joi')

const PostSchema = joi.object().keys({
    id : joi.string().required(),
    user_id : joi.string().required(),
    product_name : joi.string().required(),
    product_category : joi.string().required(),
    product_count : joi.number().required(),
    product_price : joi.number().required(),
    product_type : joi.string().required(),
    createdAt : joi.string().required(),
    updatedAt : joi.string().required(),
    product_images : joi.array().items(joi.object({
        product_id : joi.string().required(),
        file_path : joi.string().required()
    }))
})

const putSchema = joi.object().keys({
    id : joi.string().required(),
    user_id : joi.string().required(),
    product_name : joi.string().required(),
    product_category : joi.string().required(),
    product_count : joi.number().required(),
    product_price : joi.number().required(),
    product_type : joi.string().required(),
    folder_name : joi.string().required(),
    image_to_delete : joi.array().items(joi.string()),
    updatedAt : joi.string().required(),
    product_images : joi.array().items(joi.object({
        id : joi.number().required(),
        product_id : joi.string().required(),
        file_path : joi.string().required(),
        is_change : joi.boolean().required()
    }))
})

router.get('/product' , passport.authenticate('jwt' , { session : false}), async(req , res) => {
    let data = await storage.product.findAll({
        include : [{
            model : storage.product_images,
            where : { product_id : storage.Sequelize.col('products.id') }
        }]
    })
    res.json(data)
})

router.get('/product/:id' , passport.authenticate('jwt' , { session : false }), async(req , res) => {
    const id = req.params.id;
    let data = await storage.product.findOne({
        where : {
            id : id
        },
        include : [{
            model : storage.product_images,
            where : { product_id : storage.Sequelize.col('products.id') }
        }]
    })
    res.json(data)
})

router.post('/product' , async(req , res) => {
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
            const dir = path.join(__dirname , '../uploaded_files/images/' + arrays[0] + '/products_images')
            if(!fs.existsSync(dir)){
                fs.mkdirSync(dir)
                fs.rename(file.path , dir + '/' + arrays[1] , (err) => {
                    if(err) console.error(err);
                    else console.log('[+]File Renamed[+]')
                })
            } else {
                fs.rename(file.path , dir + '/' + arrays[1] , (err) => {
                    if(err) console.error(err);
                    else console.log('[+]File Renamed[+]')
                })
            }
        }
    })
    form.parse(req , (error , fields , files) => {
        const data = JSON.parse(JSON.stringify(fields.json_data));
        joi.validate(data , PostSchema , (err , value) => {
            if(err) return res.json(err);
            else {
                storage.product.create(value , {
                    include : [{
                        model : storage.product_images
                    }]
                }).then(() => {
                    res.status(200).json({
                        "server_message" : "data saved",
                        "status" : "ok"
                    })
                }).catch(err => res.json(err))
            }
        })
    })
    form.on('error' , (err) => console.error(err));
    form.on('end' , () => console.log('[+]All requested file and data have been processed[+]'))
})

router.put('/product' , async(req , res) => {
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
            const dir = path.join(__dirname , '../uploaded_files/images/' + arrays[0] + '/products_images')
            if(fs.existsSync(dir)){
                fs.rename(file.path , dir + '/' + arrays[1] , (err) => {
                    if(err) console.error(err);
                    else {
                        console.log('[+]File Renamed[+]')
                    }
                })
            } else {
                fs.mkdirSync(dir)
                fs.rename(file.path , dir + '/' + arrays[1] , (err) => {
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
                    user_id : value.user_id,
                    product_name : value.product_name,
                    product_category : value.product_category,
                    product_count : value.product_count,
                    product_price : value.product_price,
                    product_type : value.product_type,
                    updatedAt : value.updatedAt
                }
                storage.product.update(values , {
                    where : {
                        id : value.id
                    }
                }).then(() => {
                    value.product_images.map(images => {
                        if(images.is_change === true){
                            storage.product_images.update({
                                product_id : images.product_id,
                                file_path : images.file_path
                            },{
                                where : {
                                    id : images.id
                                }
                            }).then(() => console.log('[+]Data Updated[+]'))
                            .catch(err => console.log(err))
                        } else if(images.is_change === false){
                            storage.product_images.create({
                                product_id : images.product_id,
                                file_path : images.file_path
                            }).then(() => console.log('[+]Data Created[+]'))
                            .catch(err => console.log(err))
                        }
                    })
                    if(value.image_to_delete !== []){
                        for(let i = 0; i < value.image_to_delete.length; i++){
                            const dir = path.join(__dirname , '../uploaded_files/images/' + value.folder_name + '/products_images')
                            if(fs.existsSync(dir + '/' + value.image_to_delete[i])){
                                fs.unlink(dir + '/' + value.image_to_delete[i] , (err) => {
                                    if(err) console.log(err)
                                    else console.log('[-]File Removed[-]')
                                })
                            } else {
                                console.log('[~]File not found[!]')
                            }
                        }
                    } else {
                        console.log('[~]No Image To Deleted [~]')
                    }
                    res.status(200).json({
                        "server_message" : "data updated",
                        "status" : "ok"
                    })
                }).catch(err => res.json(err))
            }
        })
    })
})

router.delete('/product/:id' , async(req , res) => {
    const id = req.params.id;
    const data = JSON.parse(JSON.stringify(req.body))
    storage.product.findOne({
        where : {
            id : id
        },
        include : [{
            model : storage.product_images,
            where : { product_id : storage.Sequelize.col('products.id') }
        }]
    }).then((products) => {
        if(products){
            const product_images = products.product_images;
            product_images.map(images => {
                fs.unlink(path.join(__dirname , '../uploaded_files/images/' + data.folder_name + '/products_images/' + images.file_path) , (err) => {
                    if(err) console.error(err);
                    else console.log('[-]File Removed[-]')
                })
            })
            fs.unlink(path.join(__dirname , '../uploaded_files/images/' + data.folder_name + '/products_images') , (err) => {
                if(err) console.error(err);
                else console.log('[-]Folder Deleted[-]')
            })
            storage.product.destroy({ where : { id : id }}).then(() => {
                res.status(200).json({
                    "server_message" : "data deleted",
                    "status" : "ok"
                })
            }).catch(err => res.json(err))
        } else {
            return res.status(404).json({
                "server_message" : "data not found",
                "status" : "failure"
            })
        }
    })
})

module.exports = router;