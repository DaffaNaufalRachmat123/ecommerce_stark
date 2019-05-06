require('dotenv').config();
const Sequelize = require('sequelize');
const schema = new Sequelize(process.env.DATABASE , process.env.DATABASE_USERNAME , process.env.DATABASE_PASSWORD , {
    host : process.env.DATABASE_HOST,
    port : process.env.DATABASE_PORT,
    dialect : 'mysql'
})
const admins = schema.define('admins' , {
    id : {
        type : Sequelize.CHAR(12),
        primaryKey : true,
        allowNull : false
    },
    fullname : {
        type : Sequelize.STRING(100),
        allowNull : false
    },
    username : {
        type : Sequelize.STRING(255),
        allowNull : false
    },
    password : {
        type : Sequelize.TEXT,
        allowNull : false
    },
    email : {
        type : Sequelize.STRING(255),
        allowNull : false
    },
    alamat : {
        type : Sequelize.STRING(255),
        allowNull : false
    },
    number_phone : {
        type : Sequelize.STRING(20),
        allowNull : false
    },
    createdAt : {
        type : Sequelize.STRING,
        allowNull : false
    },
    updatedAt : {
        type : Sequelize.STRING,
        allowNull : false
    }
},{
    timestamps : false
})
const admins_details = schema.define('admins_details' , {
    id : {
        type : Sequelize.INTEGER(11),
        allowNull : false,
        primaryKey : true,
        autoIncrement : true
    },
    admin_id : {
        type : Sequelize.CHAR(12),
        allowNull : false,
        unique : true
    },
    profile_image : {
        type : Sequelize.TEXT,
        allowNull : true
    },
    createdAt : {
        type : Sequelize.STRING,
        allowNull : false
    },
    updatedAt : {
        type : Sequelize.STRING,
        allowNull : false
    }
},{
    timestamps : false
})
const users = schema.define('users' , {
    id : {
        type : Sequelize.CHAR(12),
        primaryKey : true,
        allowNull : false
    },
    fullname : {
        type : Sequelize.STRING(100),
        allowNull : false
    },
    username : {
        type : Sequelize.STRING(255),
        allowNull : false
    },
    password : {
        type : Sequelize.TEXT,
        allowNull : false
    },
    email : {
        type : Sequelize.STRING(255),
        allowNull : false
    },
    alamat : {
        type : Sequelize.STRING(255),
        allowNull : false
    },
    number_phone : {
        type : Sequelize.STRING(20),
        allowNull : false
    },
    createdAt : {
        type : Sequelize.STRING,
        allowNull : false
    },
    updatedAt : {
        type : Sequelize.STRING,
        allowNull : false
    }
},{
    timestamps : false
})

const users_details = schema.define('users_details' , {
    id : {
        type : Sequelize.INTEGER(11),
        allowNull : false,
        primaryKey : true,
        autoIncrement : true
    },
    user_id : {
        type : Sequelize.CHAR(12),
        allowNull : false,
        unique : true
    },
    profile_image : {
        type : Sequelize.TEXT,
        allowNull : true
    },
    budget_users : {
        type : Sequelize.INTEGER(11),
        allowNull : false
    },
    createdAt : {
        type : Sequelize.STRING,
        allowNull : false
    },
    updatedAt : {
        type : Sequelize.STRING,
        allowNull : false
    }
},{
    timestamps : false
})

const product = schema.define('products' , {
    id : {
        type : Sequelize.CHAR(12),
        allowNull : false,
        primaryKey : true
    },
    user_id : {
        type : Sequelize.CHAR(12),
        allowNull : false
    },
    product_name : {
        type : Sequelize.STRING(200),
        allowNull : false
    },
    product_category : {
        type : Sequelize.STRING(100),
        allowNull : false
    },
    product_count : {
        type : Sequelize.INTEGER(11),
        allowNull : false
    },
    product_price : {
        type : Sequelize.INTEGER(11),
        allowNull : false
    },
    product_type : {
        type : Sequelize.STRING(255),
        allowNull : false
    },
    createdAt : {
        type : Sequelize.STRING,
        allowNull : false
    },
    updatedAt : {
        type : Sequelize.STRING,
        allowNull : false
    }
},{
    timestamps : false
})
const product_images = schema.define('product_images' , {
    id : {
        type : Sequelize.BIGINT,
        allowNull : false,
        autoIncrement : true,
        primaryKey : true
    },
    product_id : {
        type : Sequelize.CHAR(12),
        allowNull : false
    },
    file_path : {
        type : Sequelize.TEXT,
        allowNull : false
    }
},{
    timestamps : false
})
const product_sold = schema.define('product_solds' , {
    id : {
        type : Sequelize.BIGINT,
        allowNull : false,
        primaryKey : true,
        autoIncrement : true
    },
    product_id : {
        type : Sequelize.STRING,
        allowNull : false
    },
    product_name : {
        type : Sequelize.STRING(200),
        allowNull : false
    },
    product_category : {
        type : Sequelize.STRING(11),
        allowNull : false
    },
    product_price : {
        type : Sequelize.INTEGER(11),
        allowNull : false
    },
    product_count : {
        type : Sequelize.INTEGER(11),
        allowNull : false
    },
    amount_paid : {
        type : Sequelize.INTEGER(11),
        allowNull : false
    },
    is_paid_off : {
        type : Sequelize.ENUM('lunas' , 'hutang' , 'sedekah' , 'waiting'),
        allowNull : false
    },
    createdAt : {
        type : Sequelize.STRING,
        allowNull : false
    }
},{
    timestamps : false
})
const product_promo = schema.define('product_promos' , {
    id : {
        type : Sequelize.INTEGER(11),
        primaryKey : true,
        autoIncrement : true
    },
    product_id : {
        type : Sequelize.CHAR(12),
        allowNull : false,
        unique : true
    },
    product_name : {
        type : Sequelize.STRING(255),
        allowNull : false
    },
    promo_type : {
        type : Sequelize.ENUM('buy 1 get 1','discount','bonus'),
        allowNull : false
    },
    is_discount : Sequelize.BOOLEAN,
    discount : Sequelize.INTEGER(3),
    bonus_item : Sequelize.STRING(255),
    createdAt : {
        type : Sequelize.STRING,
        allowNull : false
    },
    updatedAt : {
        type : Sequelize.STRING,
        allowNull : false
    }
},{
    timestamps : false
})
const transaction = schema.define('transactions' , {
    id : {
        type : Sequelize.BIGINT,
        allowNull : false,
        primaryKey : true,
        autoIncrement : true
    },
    product_id : {
        type : Sequelize.CHAR(12),
        allowNull : false
    },
    fullname_transaction : {
        type : Sequelize.STRING(255),
        allowNull : false
    },
    transaction_name : {
        type : Sequelize.STRING(200),
        allowNull : false
    },
    transaction_product : {
        type : Sequelize.STRING(255),
        allowNull : false
    },
    product_count : {
        type : Sequelize.INTEGER(11),
        allowNull : false
    },
    product_price : {
        type : Sequelize.INTEGER(11),
        allowNull : false
    },
    amount_paid : {
        type : Sequelize.INTEGER(11),
        allowNull : false
    },
    is_paid_off : {
        type : Sequelize.ENUM('lunas' , 'hutang' , 'sedekah' , 'waiting'),
        allowNull : false
    },
    createdAt : {
        type : Sequelize.STRING,
        allowNull : false
    }
},{
    timestamps : false
})

const shopping_cart = schema.define('shopping_carts' , {
    id : {
        type : Sequelize.BIGINT(20),
        autoIncrement : true,
        primaryKey : true
    },
    product_id : {
        type : Sequelize.CHAR(12),
        allowNull : false
    },
    product_name : {
        type : Sequelize.STRING(200),
        allowNull : false
    },
    product_category : {
        type : Sequelize.STRING(100),
        allowNull : false
    },
    product_count : {
        type : Sequelize.INTEGER(11),
        allowNull : false
    },
    product_type : {
        type : Sequelize.STRING(100),
        allowNull : false
    },
    createdAt : {
        type : Sequelize.STRING,
        allowNull : false
    }
},{
    timestamps : false
})

users.hasOne(users_details , {foreignKey : 'user_id'})
users_details.belongsTo(users , {foreignKey : 'user_id' , targetKey : 'id'})
users.hasMany(product , {foreignKey : 'user_id' , sourceKey : 'id'})
product.belongsTo(users , {foreignKey : 'user_id' , targetKey : 'id'})
admins.hasOne(admins_details , {foreignKey : 'admin_id'})
admins_details.belongsTo(admins , {foreignKey : 'admin_id' , targetKey : 'id'})
product.hasMany(product_images , {foreignKey : 'product_id' , sourceKey : 'id'})
product_images.belongsTo(product , {foreignKey : 'product_id' , targetKey : 'id'})
product.hasMany(transaction , {foreignKey : 'product_id' , sourceKey : 'id'})
transaction.belongsTo(product , {foreignKey : 'product_id' , targetKey : 'id'})
product.hasOne(product_promo , {foreignKey : 'product_id'})
product_promo.belongsTo(product , {foreignKey : 'product_id' , targetKey : 'id'})
users.hasMany(product , {foreignKey : 'user_id' , sourceKey : 'id'})
product.belongsTo(users , {foreignKey : 'user_id' , targetKey : 'id'})
product.hasMany(product_sold , {foreignKey : 'product_id' , sourceKey : 'id'})
product_sold.belongsTo(product , {foreignKey : 'product_id' , targetKey : 'id'})
product.hasMany(shopping_cart , {foreignKey : 'product_id' , sourceKey : 'id'})
shopping_cart.belongsTo(product , {foreignKey : 'product_id' , targetKey : 'id'})

admins.sync().then(() => console.log('Table Admins Created')).catch(err => console.error(err))
admins_details.sync().then(() => console.log('Table Admins Details Created')).catch(err => console.error(err))
users.sync().then(() => console.log('Table Users Created')).catch((err) => console.error(err));
users_details.sync().then(() => console.log('Table Users Details Created')).catch((err) => console.error(err));
product.sync().then(() => console.log('Table Products Created')).catch((err) => console.error(err));
product_images.sync().then(() => console.log('Table Product Images Created')).catch((err) => console.error(err));
product_sold.sync().then(() => console.log('Table Product Sold Created')).catch((err) => console.error(err));
product_promo.sync().then(() => console.log('Table Product Promo Created')).catch((err) => console.error(err));
transaction.sync().then(() => console.log('Table Transaction Created')).catch((err) => console.error(err));

module.exports = {
    admins,
    admins_details,
    users,
    users_details,
    product,
    product_images,
    product_sold,
    product_promo,
    transaction,
    Sequelize,
    schema,
    shopping_cart
}