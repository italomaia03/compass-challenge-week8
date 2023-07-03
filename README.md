# Challenge #2 - CRUD Vet Clinic

This code challenge consists of an activity performed in the internship program SP - Back-end Journey (Node.js) - AWS Cloud Context - Compass UOL.

This is a REST API that performs CRUD operations with tutors and pets using MongoDB for data persistence.

## Table of Contents

- [Technologies](#technologies)
- [Installation](#technologies)
- [Running](#running-locally)
- [API Documentation](#api-documentation)

## Technologies

Project created using:

- Express: ^4.18.2
- Typescript: 5.0.4
- NodeJS: v18.13.0
- MongoDB: ^5.6.0
- Mongoose: ^7.3.1
- Bcrypt: ^5.1.0
- Jsonwebtoken: ^9.0.0

## Installation

You can fork this repository or download the released zip file.

Running the project requires the installation of NodeJS and NPM. You can get those in the following link:

- [Node Installation](https://nodejs.org/en)

### Forking the repository

Fork the repository to your github and then clone it to your machine.

Then, run the following commands:

**Bash**

```bash
  cd ~/[folder-of-choice]/compass-challenge-week8

  npm install
```

**CMD/Powershell**

```powershell
  cd C:\[folder-of-choice]\compass-challenge-week8

  npm install
```

Now, all the dependencies are in place and the app can be built correctly.

## Running locally

Before running the application, you should create a .env file with the following variables:

```
compass-challenge-week8/
    .env
```

```
JWT_SECRET=string of your choice
JWT_LIFETIME=1d
MONGO_URI=string for connecting with your Mongo database
SALT_ROUNDS=number of hashing rounds performed to encrypt the password before storing in
the database
```

After performing the installation, run the following command to build the application:

```bash
  npm run build
```

Now, the application can be run! By default, it will run on PORT 3000. If you have another service running on this PORT, you can assign a free port to run the application. The commands are as follows:

Example:

**Bash**

```bash
  PORT=5000 npm start
```

**CMD**

```bash
  set PORT=5000 (for example)
  npm start
```

**Powershell**

```bash
  $env:PORT=5000 (for example)
  npm start
```

If all goes well, open your browser and access the link:

```
  http://localhost:[PORT]/api/v1/api-docs
```

In this page, it is possible to test the API endpoints.

## API Documentation

#### Authentication

```http
  POST /api/v1/auth
```

#### Returns all tutors

```http
  GET /api/v1/tutors
```

#### Adds a tutor to database

```http
  POST /api/v1/tutor
```

#### Update tutor's attributes

```http
  PUT /api/v1/tutor/{:id}
```

| Parameter | Type     | Description                                      |
| :-------- | :------- | :----------------------------------------------- |
| `id`      | `string` | **Required**. ID of the tutor you want to update |

#### Delete tutor from database

```http
  PUT /api/v1/tutor/{:id}
```

| Parameter | Type     | Description                                      |
| :-------- | :------- | :----------------------------------------------- |
| `id`      | `string` | **Required**. ID of the tutor you want to delete |

#### Assigns a pet to a tutor

```http
  POST /api/v1/pet/{:tutorId}
```

| Parameter | Type     | Description                                              |
| :-------- | :------- | :------------------------------------------------------- |
| `tutorId` | `strung` | **Required**. ID of the tutor you want to assign the pet |

#### Update pet's attributes

```http
  PUT /api/v1/pet/{:petId}/tutor/{:tutorId}
```

| Parameter | Type     | Description                                           |
| :-------- | :------- | :---------------------------------------------------- |
| `petId`   | `string` | **Required**. ID of the pet you want to update        |
| `tutorId` | `string` | **Required**. ID of the tutor responsible for the pet |

#### Delete pet from database

```http
  PUT /api/v1/pet/{:petId}/tutor/{:tutorId}
```

| Parameter | Type     | Description                                           |
| :-------- | :------- | :---------------------------------------------------- |
| `petId`   | `string` | **Required**. ID of the pet you want to delete        |
| `tutorId` | `string` | **Required**. ID of the tutor responsible for the pet |
