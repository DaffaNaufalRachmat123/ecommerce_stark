const express = require('express');
const storage = require('../database/database_config');
const joi = require('joi');
const promoSchema = joi.object().keys({
    product_id : joi.string().required(),
    product_name : joi.string().required(),
    promo_type : joi.string().valid('buy 1 get 1','discount','bonus'),
    is_discount : joi.boolean().required(),
    discount : joi.number(),
    bonus_item : joi.string().required(),
    createdAt : joi.string().required(),
    updatedAt : joi.string().required()
})
const PromoSchema = joi.object().keys({
    id : joi.number().required(),
    product_id : joi.string().required(),
    product_name : joi.string().required(),
    promo_type : joi.string().valid('buy 1 get 1','discount','bonus'),
    is_discount : joi.boolean().required(),
    discount : joi.number(),
    bonus_item : joi.string().required(),
    updatedAt : joi.string().required()
})
const router = express.Router();

router.get('/promo' , async(req , res) => {
    let data = await storage.product_promo.findAll()
    res.json(data)
})

router.get('/promo/:id' , async(req , res) => {
    let data = await storage.product_promo.findOne({ where : { id : parseInt(req.params.id)}})
    res.json(data)
})

router.post('/promo' , async(req , res) => {
    const data = JSON.parse(JSON.stringify(req.body));
    joi.validate(data , promoSchema , (err , value) => {
        if(err) return res.json(err);
        else {
            storage.product_promo.findOne({
                where : {
                    product_id : data.product_id
                }
            }).then(results => {
                if(results){
                    return res.status(401).json({
                        "server_message" : "promo sudah ada pada produk ini",
                        "status" : "failure"
                    })
                } else if(results == null){
                    storage.product_promo.create(data).then(() => {
                        res.status(200).json({
                            "server_message" : "promo registered",
                            "status" : "ok"
                        })
                    }).catch(err => {
                        res.json(err);
                    })
                }
            }).catch(err => {
                res.json(err)
            })
        }
    })
})

router.put('/promo' , async(req , res) => {
    const data = JSON.parse(JSON.stringify(req.body));
    joi.validate(data , PromoSchema , (err , value) => {
        if(err) return res.json(err);
        else {
            storage.product_promo.findOne({
                where : {
                    product_id : data.product_id
                }
            }).then(products => {
                if(products){
                    const updated = {
                        product_id : data.product_id,
                        product_name : data.product_name,
                        promo_type : data.promo_type,
                        is_discount : data.is_discount,
                        discount : data.discount,
                        bonus_item : data.bonus_item,
                        updatedAt : data.updatedAt
                    }
                    storage.product_promo.update(updated , {
                        where : {
                            id : data.id
                        }
                    }).then(() => {
                        res.status(200).json({
                            "server_message" : "data updated",
                            "status" : "ok"
                        })
                    }).catch(err => {
                        res.json(err)
                    })
                } else if(products == null){
                    return res.status(404).json({
                        "server_message" : "data not found",
                        "status" : "failure"
                    })
                }
            })
        }
    })
})

router.delete('/promo/:id' , async(req , res) => {
    const id = req.params.id;
    storage.product_promo.findOne({
        where : {
            id : id
        }
    }).then((promos) => {
        if(promos){
            storage.product_promo.destroy({
                where : {
                    id : id
                }
            }).then(() => {
                res.status(200).json({
                    "server_message" : "data deleted",
                    "status" : "ok"
                })
            }).catch(err => res.json(err));
        } else if(promos == null){
            res.status(404).json({
                "server_message" : "data not found",
                "status" : "failure"
            })
        }
    }).catch(err => res.json(err));
})

module.exports = router;