node-login-signup
This one is the sample project having basic features listed as followng,

Learing priorities to understand the following features,
1. Async Await
2. JWT (jsonwebtoken)
3. MongoDB Native Library
4. Routing
5. Validation using express-validator
6. Middleware for validations
7. Multer (File Upload)
8. BCrypt for password encryption

Installation
npm install

Usage
1. Signup - http://localhost:8080/auth/signup
    - Signup with basic details
    {
        "first_name" : "Vivek",
        "last_name"	 : "R",
        "email"		 : "vivek@test.com",
        "mobile"	 : "9800000000",
        "password"	: "12345"
    }
2. Login - http://localhost:8080/auth/login
    - Login with the email and password used at the time of the signup
    - API Request
    {
        "email"	:	"vivek@test.com",
        "password"	:	"12345"
    }

    - Login API will return token which needs to be used for other API calling
    - API response,
    {
        "status": "success",
        "message": "user found!!!",
        "data": {
            "user": {
                "_id": "5ddf889c885d4a44e8ff1baa",
                "first_name": "Vivek",
                "last_name": "R",
                "email": "vivek@test.com",
                "mobile": "9800000000",
                "password": "$2b$10$27AF/2ynzB.nWA15PnOAQuF6rUueL/iM4d4bdu2K.8JIFOU5xeuTC",
                "created_at": "2019-11-28T13:40:00.495Z",
                "updated_at": "2019-12-01T11:58:41.268Z",
                "role": {
                    "super_admin": true,
                    "admin": false,
                    "user": false
                }
            },
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZpdmVrMDAxQGtpc3NodC5jb20iLCJpYXQiOjE1NzU0NjM5MTIsImV4cCI6MTU3NTQ2NzUxMn0.-j6Ro0XOrEtZ27TlVF_BTZg_u7CtX4moeENZ7L2j1oY"
        }
    }
