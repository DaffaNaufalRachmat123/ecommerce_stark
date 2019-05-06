# ecommerce_stark

# Installation

```
To Run this BackEnd application , you need to Install XAMPP or MySQL in your computer . 
Then create database name ecommerce_database.
Upload ecommerce_database.sql file into database you created before and then in command line type 'npm install' for installation
all required dependencies for this backend app and then after done run 'node index.js'.
Dont forget to change MySQL host setting in .env file.
You can see the documentation for request to the API
```

# Login Request

# POST REQUEST -> /api/user/login | /api/admin/login
```
{
	"username" : "Daffa Naufal",
	"password" : "Naufal Inside123"
} headers (x-type) : username / email
{
	"email" : "naufalrachmat3@gmail.com",
	"password" : "Naufal Inside123"
}
```


# REQUEST FOR /api/admins

# GET REQUEST 

```
[
    {
        "id": "80ADMINS",
        "fullname": "Daffa Naufal",
        "username": "Daffa Rachmat",
        "password": "$2a$12$a1wXLSCSN2qMEQP28DokG.1Mm0yG39crZDayHN8C1X7Ef4UUil4Im",
        "email": "naufalrachmat3@gmail.com",
        "alamat": "Suropati Residence",
        "number_phone": "085712356420",
        "createdAt": "05/05/2019",
        "updatedAt": "05/05/2019",
        "admins_detail": {
            "id": 1,
            "admin_id": "80ADMINS",
            "profile_image": "admin_daffa.png",
            "createdAt": "05/05/2019",
            "updatedAt": "05/05/2019"
        }
    }
] *note : require headers name 'Authorization' and token , you can get the token by register on POST Request /api/admins and then login.
```
# POST REQUEST

```

multipart/form-data request API

only accept 1 image for this request API and each admin

{
	"id" : "80ADMINS",
	"fullname" : "Daffa Naufal Rachmat",
	"username" : "Daffa Rachmat",
	"password" : "Naufal Inside123",
	"email" : "naufalrachmat3@gmail.com",
	"alamat" : "Suropati Residence",
	"number_phone" : "085712356420",
	"createdAt" : "05/05/2019",
	"updatedAt" : "05/05/2019",
	"admins_detail" : {
		"admin_id" : "80ADMINS",
		"profile_image" : "admin_daffa.png",
		"createdAt" : "05/05/2019",
		"updatedAt" : "05/05/2019"
	}
} file = (fullname)-(filename)
```

# PUT REQUEST 
```

multipart/form-data request API

only accept 1 image for this request API and each admin

{
	"id" : "80ADMINS",
	"fullname" : "Daffa Naufal",
	"username" : "Daffa Rachmat",
	"password" : "Naufal Inside123",
	"email" : "naufalrachmat3@gmail.com",
	"alamat" : "Suropati Residence",
	"number_phone" : "085712356420",
	"image_to_delete" : "",
	"updatedAt" : "05/05/2019",
	"admins_details" : {
		"id" : 1,
		"admin_id" : "80ADMINS",
		"profile_image" : "admin_daffa.png",
		"updatedAt" : "05/05/2019"
	}
} file = (fullname lama)-(fullname baru)-(filename)
*note : require headers name 'Authorization' and token , you can get the token by register on POST Request /api/admins and then login.
```
# DELETE REQUEST 
```
/api/admins/:id 
*example : /api/admins/80ADMINS
*note : require headers name 'Authorization' and token , you can get the token by register on POST Request /api/admins and then login.
```

# REQUEST FOR /api/users

# GET REQUEST

```
[
    {
        "id": "30naufal",
        "fullname": "Naufal Daffa",
        "username": "Daffa Naufal",
        "password": "$2a$12$HQVtxuw37LjuIYC.V3KU2e/tlJ.gLbw47fGcIQBGfguauJT3KCN1y",
        "email": "naufalrachmat91@gmail.com",
        "alamat": "Jl. Suropati Residence",
        "number_phone": "085712356420",
        "createdAt": "05/05/2019",
        "updatedAt": "05/05/2019",
        "users_detail": {
            "id": 3,
            "user_id": "30naufal",
            "profile_image": "user_daffa.png",
            "budget_users": 400000,
            "createdAt": "05/05/2019",
            "updatedAt": "05/05/2019"
        }
    }
]
*note : require headers name 'Authorization' and token , you can get the token by register on POST Request /api/users and then login.
```

# POST REQUEST 
```

multipart/form-data request API

only accept 1 image for this request API and each user

{
	"id" : "30naufal",
	"fullname" : "Naufal Daffa",
	"username" : "Daffa Naufal",
	"password" : "Naufal Inside123",
	"email" : "naufalrachmat91@gmail.com",
	"alamat" : "Jl. Suropati Residence",
	"createdAt" : "05/05/2019",
	"updatedAt" : "05/05/2019",
	"number_phone" : "085712356420",
	"users_detail" : {
		"user_id" : "30naufal",
		"profile_image" : "user_daffa.png",
		"budget_users" : 400000,
		"createdAt" : "05/05/2019",
		"updatedAt" : "05/05/2019"
	}
} file = (fullname)-(filename)
```

# PUT REQUEST 
```

multipart/form-data request API

only accept 1 image for this request API and each user

{
        "id": "30naufal",
        "fullname": "Naufal Daffa Rachmat",
        "username": "Daffa Naufal",
        "password": "Naufal Inside123",
        "email": "naufalrachmat91@gmail.com",
        "alamat": "Jl. Suropati Residence",
        "number_phone": "085712356420",
        "image_to_delete" : "",
        "updatedAt": "05/05/2019",
        "users_detail": {
            "id": 3,
            "user_id": "30naufal",
            "profile_image": "user_daffa.png",
            "budget_users": 400000,
            "updatedAt": "05/05/2019"
        }
} file = (fullname lama)-(fullname baru)-(filename)
*note : require headers name 'Authorization' and token , you can get the token by register on POST Request /api/users and then login.
```

# DELETE REQUEST 
```
/api/users/:id
*exampe : /api/users/30naufal
*note : require headers name 'Authorization' and token , you can get the token by register on POST Request /api/users and then login.
```

# REQUEST FOR /api/product

# GET REQUEST 

```
[
    {
        "id": "90sepatu",
        "user_id": "30naufal",
        "product_name": "Sepatu Sneakers",
        "product_category": "Sepatu",
        "product_count": 40,
        "product_price": 50000,
        "product_type": "Sneakers",
        "createdAt": "05/05/2019",
        "updatedAt": "05/05/2019",
        "product_images": [
            {
                "id": 3,
                "product_id": "90sepatu",
                "file_path": "sepatu_1.png"
            },
            {
                "id": 4,
                "product_id": "90sepatu",
                "file_path": "sepatu_2.png"
            }
        ]
    }
] *note : require headers name 'Authorization' and token , you can get the token by register on POST Request /api/admins/ or /api/users and then login.
```

# POST REQUEST

```

multipart/form-data request API

multiple images accept for this request 

POST REQUEST -> /api/product
{
	"id" : "90sepatu",
	"user_id" : "30naufal",
	"product_name" : "Sepatu Sneakers",
	"product_category" : "Sepatu",
	"product_count" : 40,
	"product_price" : 50000,
	"product_type" : "Sneakers",
	"createdAt" : "05/05/2019",
	"updatedAt" : "05/05/2019",
	"product_images" : [
		{
			"product_id" : "90sepatu",
			"file_path" : "sepatu_1.png"
		},
		{
			"product_id" : "90sepatu",
			"file_path" : "sepatu_2.png"		
		}
	]
} file = (fullname users)-(filename)
*note : require headers name 'Authorization' and token , you can get token the token by register on POST Request /api/users or /api/admins and then login
```

# PUT REQUEST 
```

multipart/form-data request for this API

multiple images accept

{
        "id": "90sepatu",
        "user_id": "30naufal",
        "product_name": "Sepatu Sneakers",
        "product_category": "Sepatu",
        "product_count": 40,
        "product_price": 50000,
        "product_type": "Sneakers",
        "image_to_delete" : ["sepatu_1.png" , "sepatu_2.png"],
        "folder_name" : "Naufal Daffa Rachmat",
        "updatedAt": "05/05/2019",
        "product_images": [
            {
                "id": 3,
                "product_id": "90sepatu",
                "file_path": "sepatu_sneakers1.png",
                "is_change" : true
            },
            {
                "id": 4,
                "product_id": "90sepatu",
                "file_path": "sepatu_sneakers2.png",
                "is_change" : true
            }
        ]
 } file = (fullname of users)-(filename)
 *is_change : false for insert new image to database if the image doesn't exist in the database
 *note : require headers name 'Authorization' and token , you can get token the token by register on POST Request /api/users or /api/admins and then login
```

# DELETE REQUEST

```
/api/product/:id
{
	"folder_name" : "Naufal Daffa Rachmat"
} 
*folder_name adalah nama full dari users
```

# REQUEST FOR /api/promo

# GET REQUEST 

```
[
    {
        "id": 3,
        "product_id": "90sepatu",
        "product_name": "Sepatu Sneakers",
        "promo_type": "discount",
        "is_discount": true,
        "discount": 10,
        "bonus_item": "tidak ada",
        "createdAt": "05/05/2019",
        "updatedAt": "05/05/2019"
    }
]
*note : require headers name 'Authorization' and token , you can get token the token by register on POST Request /api/users or /api/admins and then login
```

# POST REQUEST 

```
{
	"product_id" : "90sepatu",
	"product_name" : "Sepatu Sneakers",
	"promo_type" : "discount",
	"is_discount" : true,
	"discount" : 10,
	"bonus_item" : "tidak ada",
	"createdAt" : "05/05/2019",
	"updatedAt" : "05/05/2019"
}
*note : require headers name 'Authorization' and token , you can get token the token by register on POST Request /api/users or /api/admins and then login
```

#  PUT REQUEST 

```
{
        "id": 3,
        "product_id": "90sepatu",
        "product_name": "Sepatu Sneakers",
        "promo_type": "buy 1 get 1",
        "is_discount": false,
        "discount": 0,
        "bonus_item": "tidak ada",
        "updatedAt": "05/05/2019"
}
*note : require headers name 'Authorization' and token , you can get token the token by register on POST Request /api/users or /api/admins and then login
```

# DELETE REQUEST 
```
/api/promo/:id
```

# REQUEST FOR /api/transactions

#  GET REQUEST
```
[
    {
        "id": 1,
        "product_id": "90sepatu",
        "fullname_transaction": "Pembelian Sepatu Sneakers",
        "transaction_name": "Beli",
        "transaction_product": "Sepatu Sneakers",
        "product_count": 1,
        "product_price": 600000,
        "amount_paid": 400000,
        "is_paid_off": "hutang",
        "createdAt": "05/05/2019"
    }
]
*note : require headers name 'Authorization' and token , you can get token the token by register on POST Request /api/users or /api/admins and then login
```

# POST REQUEST 

```
POST REQUEST -> /api/transactions
{
	"product_id" : "90sepatu",
	"fullname_transaction" : "Pembelian Sepatu Sneakers",
	"transaction_name" : "Beli",
	"transaction_product" : "Sepatu Sneakers",
	"product_count" : 1,
	"product_price" : 600000,
	"amount_paid" : 400000,
	"is_paid_off" : "hutang",
	"createdAt" : "05/05/2019"
}
*note : require headers name 'Authorization' and token , you can get token the token by register on POST Request /api/users or /api/admins and then login
```

# PUT REQUEST 

```
PUT REQUEST -> /api/transactions
{
        "id": 1,
        "product_id": "90sepatu",
        "fullname_transaction": "Pembelian Sepatu Sneakers",
        "transaction_name": "Beli",
        "transaction_product": "Sepatu Sneakers",
        "product_count": 1,
        "product_price": 600000,
        "amount_paid": 600000,
        "is_paid_off": "lunas",
        "createdAt": "05/05/2019"
}
*note : require headers name 'Authorization' and token , you can get token the token by register on POST Request /api/users or /api/admins and then login
```
# DELETE REQUEST
```
/api/transactions/:id
```

# REQUEST FOR /api/product_sold

# GET REQUEST

```
[
    {
        "id": 1,
        "product_id": "90sepatu",
        "product_name": "Sepatu Sneakers",
        "product_category": "Sneakers",
        "product_price": 600000,
        "product_count": 1,
        "amount_paid": 600000,
        "is_paid_off": "lunas",
        "createdAt": "05/05/2019"
    }
]
*note : require headers name 'Authorization' and token , you can get token the token by register on POST Request /api/users or /api/admins and then login
```

# POST REQUEST 

```
{
	"transaction_id" : 1,
	"product_id" : "90sepatu",
	"product_name" : "Sepatu Sneakers",
	"product_category" : "Sneakers",
	"product_price" : 600000,
	"product_count" : 1,
	"amount_paid" : 600000,
	"is_paid_off" : "lunas",
	"createdAt" : "05/05/2019"
}
*note : require headers name 'Authorization' and token , you can get token the token by register on POST Request /api/users or /api/admins and then login
```

# DELETE REQUEST 

```
/api/product_sold/:id

```

# REQUEST FOR /api/shopping_cart

# GET REQUEST

```
[
    {
        "id": 1,
        "product_id": "90sepatu",
        "product_name": "Sepatu Sneakers",
        "product_category": "Sneakers",
        "product_count": 1,
        "product_type": "Sneakers",
        "createdAt": "05/05/2019"
    }
]
*note : require headers name 'Authorization' and token , you can get token the token by register on POST Request /adpi/users and then login
```

# POST REQUEST 

```
{
	"user_id" : "30naufal",
	"username" : "Naufal Daffa Rachmat",
	"product_id" : "90sepatu",
	"product_name" : "Sepatu Sneakers",
	"product_category" : "Sneakers",
	"product_count" : 1,
	"product_price" : 600000,
	"product_type" : "Sneakers",
	"createdAt" : "05/05/2019"
}
*note : require headers name 'Authorization' and token , you can get token the token by register on POST Request /adpi/users and then login
```

# DELETE REQUEST 

```
/api/shopping_cart/:id
*note : require headers name 'Authorization' and token , you can get token the token by register on POST Request /adpi/users and then login
```
