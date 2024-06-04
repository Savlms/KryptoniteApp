# Kryptonian Registration and Authentication API
### Overview
This API provides functionalities for Kryptonian registration, two-factor authentication (2FA), file upload services, and access control. It ensures secure registration and login, associates files with users, and allows image uploads authenticated by an API key.

## Features
* Kryptonian Registration and Authentication

* User Registration: Register with email confirmation.
* 2FA Login: Uses OTPs sent via Elasticemail, stored in-memory, Redis, or database.
File Upload Service

* API Key Generation: Unique API key for each Kryptonian.
* File Upload: Allows image uploads, stored as Base64 strings, and deleted post-storage.
* Image File Constraints: Only image files are accepted.

## Authentication Endpoints
* POST /register: Register a new user and send a confirmation email.
* POST /login: Login with email and password, and receive an OTP for 2FA.
* POST /verify-otp: Verify OTP for 2FA login.
## File Upload Endpoints
* POST /generate-api-key: Generate a new API key for the authenticated user.
* POST /upload: Upload an image file, authenticated with an API key.
## Usage
### Registration and Email Confirmation
* Register: POST /register with email and password.
* Confirm Email: Verify account via email link.
### 2FA Login
* Login: POST /login with email and password.
* Receive OTP: Get OTP via email.
* Verify OTP: POST /verify-otp with OTP.
### File Upload
* Generate API Key: POST /generate-api-key after login.
* Upload Image: POST /upload with image file and API key in headers.
### Example Requests
* Register
````
{
  "email": "kryptonian@example.com",
  "password": "securepassword"
}
````
* Login
````
{
  "email": "kryptonian@example.com",
  "password": "securepassword"
}
````
* Verify OTP
````
{
  "email": "kryptonian@example.com",
  "otp": "123456"
}
````
## Technologies Used
* Node.js with Express
* JWT for authentication
* Nodemailer for sending emails
* Database for OTP storage
* Base64 Encoding for image storage
## Setup
* Clone the Repository
* * Dependencies: npm install
* Set Environment Variables in a .env file as in .env.example file:
````
SECRET
EMAIL_SERVICE_API_KEY
REDIS_URL (if using Redis)
Run the Server: npm start/ npm run dev
````

## Base/Live URL
https://kryptoniteapp-bvz3.onrender.com/