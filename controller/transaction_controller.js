const express = require('express');
const router = express.Router();
const storage = require('../database/database_config')
const joi = require('joi')
const schema = joi.object().keys({
    product_id : joi.string().required(),
    fullname_transaction : joi.string().required(),
    transaction_name : joi.string().required(),
    transaction_product : joi.string().required(),
    product_count : joi.number().required(),
    product_price : joi.number().required(),
    amount_paid : joi.number().required(),
    is_paid_off : joi.string().valid('lunas' , 'hutang' , 'waiting'),
    createdAt : joi.string().required()
})

const Schema = joi.object().keys({
    id : joi.number().required(),
    product_id : joi.string().required(),
    fullname_transaction : joi.string().required(),
    transaction_name : joi.string().required(),
    transaction_product : joi.string().required(),
    product_count : joi.number().required(),
    product_price : joi.number().required(),
    amount_paid : joi.number().required(),
    is_paid_off : joi.string().valid('lunas' , 'hutang' , 'waiting'),
    createdAt : joi.string().required()
})

router.get('/transactions' , async(req , res) => {
    let data = await storage.transaction.findAll()
    res.json(data)
})

router.get('/transactions/:id' , async(req , res) => {
    let data = await storage.transaction.findOne({ where : { id : parseInt(req.params.id)}})
    res.json(data)
})

router.post('/transactions' , async(req , res) => {
    const data = JSON.parse(JSON.stringify(req.body))
    joi.validate(data , schema , (err , value) => {
        if(err) console.error(err);
        else {
            const values = {
                product_id : value.product_id,
                fullname_transaction : value.fullname_transaction,
                transaction_name : value.transaction_name,
                transaction_product : value.transaction_product,
                product_count : value.product_count,
                product_price : value.product_price,
                amount_paid : parseInt(value.amount_paid),
                is_paid_off : value.is_paid_off,
                createdAt : value.createdAt
            }
            storage.transaction.create(values).then(() => {
                res.status(200).json({
                    "server_message" : "transaction created",
                    "transaction_name" : value.transaction_name,
                    "transaction_status" : value.is_paid_off,
                    "status" : "ok"
                })
            }).catch(err => res.json(err));
        }
    })
})

router.put('/transactions' , async(req , res) => {
    const data = JSON.parse(JSON.stringify(req.body));
    joi.validate(data , Schema , (err , value) => {
        if(err) console.error(err);
        else {
            const values = {
                product_id : value.product_id,
                fullname_transaction : value.fullname_transaction,
                transaction_name : value.transaction_name,
                transaction_product : value.transaction_product,
                product_count : value.product_count,
                product_price : value.product_price,
                amount_paid : parseInt(value.amount_paid),
                is_paid_off : value.is_paid_off
            }
            storage.transaction.findOne({
                where : {
                    id : value.id
                }
            }).then((transactions) => {
                if(transactions){
                    storage.transaction.update(values , {
                        where : {
                            id : value.id
                        }
                    }).then((result) => {
                        res.status(200).json({
                            "server_message" : "transaction updated",
                            "transaction_name" : value.transaction_name,
                            "transaction_status" : value.is_paid_off,
                            "status" : "ok"
                        })
                    }).catch(err => res.json(err));
                } else if(transactions == null){
                    res.status(404).json({
                        "server_message" : "data not found",
                        "status" : "failure"
                    })
                }
            })
        }
    })
})

router.delete('/transactions/:id' , async(req , res) => {
    const id = req.params.id;
    storage.transaction.findOne({
        where : {
            id : id
        }
    }).then(transaction => {
        if(transaction){
            storage.transaction.destroy({
                where : {
                    id : id
                }
            }).then(() => {
                res.status(200).json({
                    "server_message" : "data deleted",
                    "status" : "ok"
                })
            }).catch(err => res.json(err));
        } else {
            return res.status(404).json({
                "server_message" : "no transaction record with id : " + id,
                "status" : "ok"
            })
        }
    })
})

module.exports = router;