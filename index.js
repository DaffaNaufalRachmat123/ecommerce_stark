const express = require('express');
const app = express();
const admin_controller = require('./controller/admin_controller')
const user_controller = require('./controller/user_controller');
const product_controller = require('./controller/product_controller');
const promo_controller = require('./controller/promo_controller')
const sold_controller = require('./controller/product_sold_controller')
const transaction_controller = require('./controller/transaction_controller')
const shopping_cart_controller = require('./controller/shopping_cart_controller')
const userLoginController = require('./controller/user_login_controller');
const adminLoginController = require('./controller/admin_login_controller')
const dataRoutes = require('./controller/data_routes')
const passport = require('passport');
const fs = require('fs')
const path = require('path')

const bodyParser = require('body-parser');

app.use(passport.initialize())
require('./middleware/authentication')(passport)

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname , './uploaded_files/images')))

app.use('/api',adminLoginController);
app.use('/api',userLoginController);
app.use('/api',admin_controller)
app.use('/api',user_controller)
app.use('/api',product_controller)
app.use('/api',promo_controller)
app.use('/api',sold_controller)
app.use('/api',shopping_cart_controller)
app.use('/api',transaction_controller)
app.use('/api',dataRoutes)

app.listen(3200);