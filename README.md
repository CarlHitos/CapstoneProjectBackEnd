# Capstone Project Backend - Mustach Barbershop💈

## Index

* [Description](#description)
* [Installation](#installation)
* [Features](#features)
* [Technologies Used](#technologies-used)
* [Folder Structure](#folder-structure)
* [API Routes](#api-routes)
  * [Appointment Routes](#appointment-routes)
  * [User Routes](#user-routes)
  * [Auth Routes](#auth-routes)
* [Postman Collection and Environment](#postman-collection-and-environment)
* [Future Enhancements](#future-enhancements)
* [Contributors](#contributors)
* [License](#license)

## Description 📋

This project is a full-stack application designed to streamline the appointment booking process for a barber shop. It provides a platform where barbers (users) can log in, manage their profiles, and view their appointments. Customers can book appointments without the need to register or log in, as their information is captured through a form submission during the booking process.

## Installation 🔧


1. Clone the repository

```bash
git clone https://github.com/tu_usuario/capstoneprojectbackend.git
```

2. Install the dependencies

```bash
npm install
```

3. Create a .env file in the root folder and add the following environment variables:

```bash
PORT=3001
ORIGIN=http://localhost:3000
DB_URI=your-mongoDB-uri
JWT_SECRET=your-secret-key
```

4. Run the server to develop locally. To set up the development environment and run the server locally, follow these steps:
    
    * Seed the Database
    * Run dev

Before starting the server, it's essential to seed the database with initial data using the following command:

```bash
npm run seed
npm run dev
```
This command executes a predefined script defined in the package.json file. The purpose of seeding the database is to populate it with sample data necessary for basic functionality and testing. For instance, it may create default users, available services, or any other type of data crucial for testing the application in a development environment.

## Features: 🔗

* **User Authentication:** Barbers can log in using their credentials securely authenticate using JSON Web Tokens (JWT), which are managed by an admin user. Customers do not need to register or log in to book appointments.

* **Appointment Management:** Barbers can view their upcoming appointments and cancel them if necessary. Customers can book appointments by providing their details through a form submission. Each appointment includes details such as the user, barber, date, time, and service.

* **User Profile Management:** Barbers can manage their profiles by updating personal information such as name, email, phone number and schedule. They can also view their appointment history and upcoming appointments.

* **Service Catalog:** The application provides a catalog of services offered by the barber shop, including details such as the service name, price, duration, and description.

## Technologies Used: 💻

       Node.JS  |  Express.JS  |  MongoDB |  Mongoose ODM  |  Passport.JS |  Git & GitHub

* **Backend:** Node.js with Express.js framework for building the server-side logic.
* **Database:** MongoDB with Mongoose ODM for storing and managing application data.
* **Authentication:** Passport.js for handling user authentication and authorization using JWT.
* **DevOps:** Git for version control and deployment to platforms like Heroku or AWS for hosting the application.

## Folder Structure: 📁

* **Config:** Contains configuration files for setting up middleware, database connection, and authentication strategies.
* **Controllers:** Contains controller functions for handling business logic related to appointments, users, and authentication.
* **Db:** Includes database configuration and connection setup files.
* **Error-handling:** Middleware for handling errors and sending appropriate error responses to clients.
* **Middleware:** Custom middleware functions for tasks like authentication and authorization.
* **Models:** Contains Mongoose models for defining database schemas for users, appointments, customers and services.
* **Passport:** Includes Passport.js configuration files for setting up authentication strategies.
* **Routes:** Express route definitions for defining API endpoints and handling incoming requests.
* **Utils:** Utility functions, such as password hashing.

# API Routes 🗺️

## **Appointment routes**:

| URL path                               | HTTP Method | Response                     | Action                    |
| :------------------------------------: | :---------: | :--------------------------: | :-----------------------: |
| /api/appointments/getAppointments     | GET         | [appointments]               | Get all appointments      |
| /api/appointments/getInfo/:appointment_id | GET      | {appointment}                | Get appointment details   |
| /api/appointments/create              | POST        | {createdAppointment}         | Create appointment        |
| /api/appointments/delete/:appointment_id | DELETE   | {msg: "Appointment successfully deleted!"} | Delete appointment    |

## **User routes**:

| URL path                                     | HTTP Method | Response                    | Action                           |
| :------------------------------------------: | :---------: | :-------------------------: | :------------------------------: |
| /api/users/getUserProfile/:user_id          | GET         | {userProfile}               | Get user profile                 |
| /api/users/editUserProfile/:user_id         | PUT         | {editedUserProfile}         | Edit user profile                |
| /api/users/getUserAppointments/:user_id      | GET         | [userAppointments]          | Get user appointments            |
| /api/users/getUserAppointmentDetails/:appointment_id | GET | {appointmentDetails}   | Get user appointment details    |
| /api/users/cancelOneAppointment/:appointment_id     | DELETE | {msg: "Appointment successfully cancelled!"} | Cancel user appointment |

## **Auth routes**:

| URL path                    | HTTP Method | Response                           | Action                         |
| :--------------------------:|:-----------:| :---------------------------------:| :----------------------------: |
| /api/auth/fail             | ALL         | {message: 'Unauthorized'}        | Handle unauthorized access    |
| /api/auth/login            | POST        | {authToken}                      | Log in user                   |
| /api/auth/signup           | POST        | {createdUser}                    | Sign up user                  |
| /api/auth/verify           | POST        | {verifiedUser}                   | Verify user credentials       |

## **Customer routes**:

| URL path                                     | HTTP Method | Response                    | Action                           |
| :------------------------------------------: | :---------: | :-------------------------: | :------------------------------: |
| /api/customers/getAllCustomers               | GET         | [customers]                 | Get all customers                |
| /api/customers/getOneCustomer/:customer_id   | GET         | {customer}                  | Get one customer                 |
| /api/customers/editOneCustomer/:customer_id  | PUT         | {editedCustomer}            | Edit one customer                |
| /api/customers/deleteOneCustomer/:customer_id| DELETE      | {msg: "Customer deleted"}   | Delete one customer              |
| /api/customers/cancelAppointment/:appointment_id | DELETE | {msg: "Appointment canceled successfully"} | Cancel appointment for customer |

## **Service routes**:

| URL path                               | HTTP Method | Response                     | Action                    |
| :------------------------------------: | :---------: | :--------------------------: | :-----------------------: |
| /api/services/getAllServices           | GET         | [services]                   | Get all services          |
| /api/services/createService            | POST        | [createdService]             | Create a new service      |
| /api/services/editService/:service_id  | PUT         | [updatedService]             | Edit a service            |
| /api/services/deleteService/:service_id| DELETE      | {msg: "Service deleted"}     | Delete a service          |

## Postman Collection and Environment

You can download the Postman collection and environment files to test the API endpoints.

### Postman Collection
- [Download Postman Collection](./Collection_Postman.json)
  - This file contains all the API requests to test the endpoints of the backend application.

### Postman Environment
- [Download Postman Environment](./Env_Postman.json)
  - This file contains the environment variables needed to run the Postman collection.


## Future Enhancements 🚀

* *Implement user registration and login for customers to manage their appointments.*
* *Allow customers to cancel their own appointments.*
* *Integrate OAuth services like Google login for enhanced authentication options.*
* *Implement email notifications for appointment reminders and confirmations.*
* *Implement payment gateway integration for online payments.*
* *Enhance user interface with modern design principles and responsive layouts.*
* *Implement functionality to manage multiple branches or locations for the barber shop. This would allow the business to expand and operate across different areas, with each location having its own set of barbers, services, and appointments.*
* *Implement automated deployment pipelines integrated with cloud platforms such as AWS, Google Cloud, or Azure. This would streamline the deployment process, allowing for easy scaling and management of the application in a cloud environment.*

## In Progress

This application is currently under development and certain features may not be fully implemented. Contributions and feedback are welcome.

### **Contributors** 🫂🫱🏼‍🫲🏼

| [<img src="https://avatars.githubusercontent.com/u/113308120?v=4" width=115><br><sub>Carlos Toro</sub>](https://github.com/CarlHitos) |  [<img src="https://avatars.githubusercontent.com/u/148481786?v=4" width=115><br><sub>Sergialys Ramos</sub>](https://github.com/sergialysramos) |  
| :---: | :---: |

### License

This project is licensed under the MIT License.
