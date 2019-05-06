const router = require('express').Router();
const joi = require('joi')
const storage = require('../database/database_config')
const cartSchema = joi.object().keys({
    user_id : joi.string().required(),
    username : joi.string().required(),
    product_id : joi.string().required(),
    product_name : joi.string().required(),
    product_category : joi.string().required(),
    product_count : joi.number().required(),
    product_price : joi.number().required(),
    product_type : joi.string().required(),
    createdAt : joi.string().required()
})
const passport = require('passport')

router.get('/shopping_cart' , passport.authenticate('jwt' , {session : false }), async(req , res) => {
    let data = await storage.shopping_cart.findAll({raw : true})
    res.json(data)
})

router.post('/shopping_cart' , passport.authenticate('jwt' , {session : false}) , async(req , res) => {
    const data = JSON.parse(JSON.stringify(req.body))
    joi.validate(data , cartSchema , (err , value) => {
        if(err) return res.json(err)
        else {
            storage.shopping_cart.create(data)
            .then(() => {
                res.status(200).json({
                    "server_message" : "data created",
                    "status" : "ok"
                })
            }).catch(err => res.json(err))
        }
    })
})

router.delete('/shopping_cart/:id' , passport.authenticate('jwt' , {session : false}), async(req , res) => {
    const id = req.params.id;
    storage.shopping_cart.findOne({
        where : { id : id }
    }).then(cart => {
        if(cart){
            storage.shopping_cart.destroy({
                where : {
                    id : id
                }
            }).then(() => {
                res.status(200).json({
                    "server_message" : "data deleted",
                    "status" : "ok"
                })
            }).catch(err => res.json(err))
        } else if(cart === null){
            res.status(404).json({
                "server_message" : "data not found",
                "status" : "ok"
            })
        }
    }).catch(err => res.json(err))
})

module.exports = router;