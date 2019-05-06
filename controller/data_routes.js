const router = require('express').Router();
const storage = require('../database/database_config')
const passport = require('passport');

router.get('/product/data' , passport.authenticate('jwt' , { session : false }) , async(req , res) => {
    storage.schema.query("SELECT count(product_count) FROM products GROUP BY createdAt ORDER BY createdAt" , {
        model : storage.product,
        raw : true
    }).then(result => res.json(result))
    .catch(err => res.json(err))
})

router.get('/product/data/:user_id' , passport.authenticate('jwt' , { session : false }), async(req , res) => {
    storage.schema.query("SELECT count(product_count) FROM products GROUP BY createdAt WHERE user_id = '" + req.params.user_id + "' ORDER BY createdAt" , {
        model : storage.product,
        raw : true
    }).then(result => {
        res.json(result)
    }).catch(err => res.json(err))
})

module.exports = router;