const express = require('express');
const router = express.Router();
const storage = require('../database/database_config');
const joi = require('joi');
const soldSchema = joi.object().keys({
    transaction_id : joi.number().required(),
    product_id : joi.string().required(),
    product_name : joi.string().required(),
    product_category : joi.string().required(),
    product_price : joi.number().required(),
    product_count : joi.number().required(),
    amount_paid : joi.number().required(),
    is_paid_off : joi.string().valid('lunas' , 'hutang' , 'sedekah'),
    createdAt : joi.string().required()
})

router.get('/product_sold' , async(req , res) => {
    let data = await storage.product_sold.findAll();
    res.json(data)
})

router.post('/product_sold' , async(req , res) => {
    const data = JSON.parse(JSON.stringify(req.body))
    joi.validate(data , soldSchema , (err , value) => {
        if(err) return res.json(err);
        else {
            storage.product_sold.create(data).then(() => {
                res.status(200).json({
                    "server_message" : "data saved",
                    "status" : "ok"
                })
            }).catch(err => res.json(err))
        }
    })
})

router.delete('/product_sold/:id' , async(req , res) => {
    const id = req.params.id;
    storage.product_sold.findOne({
        where : {
            id : id
        }
    }).then(solds => {
        if(solds){
            storage.product_sold.destroy({
                where : {
                    id : id
                }
            }).then(() => {
                res.status(200).json({
                    "server_message" : "data deleted",
                    "status" : "ok"
                })
            }).catch(err => res.json(err));
        } else if(solds == null){
            res.status(404).json({
                "server_message" : "data not found",
                "status" : "failure"
            })
        }
    }).catch(err => res.json(err));
})

module.exports = router;