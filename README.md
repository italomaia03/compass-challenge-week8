# Challenge #2 - CRUD Vet Clinic

This code challenge consists of an activity performed in the internship program SP - Back-end Journey (Node.js) - AWS Cloud Context - Compass UOL.

This is a REST API performs CRUD operations with tutors and pets using MongoDB for data persistence.

## Table of Contents

-   [Technologies](#technologies)
<!-- -   [Installation](#technologies) (tba)
-   [Running](#running-locally)
-   [API Documentation](#api-documentation) -->

## Technologies

Project created using:

-   Express
-   Typescript
-   NodeJS
-   MongoDB
-   Mongoose
-   Jsonwebtoken

<!-- ## Installation

You can either download the released version, or clone this repository.

Running the project requires the installation of NodeJS and NPM. You can get those in the following link:

-   [Node Instalation](https://nodejs.org/en)

Give preference to the LTS versions available to your Operating System (Windows, Linux, MacOS, etc.).

### Getting the release

Download the released project, unzip it in folder of your choice, open the terminal (or powershell for Windows users), and then put the following commands:

**Bash**

```bash
  cd ~/[path-to-project]/compass-challenge-week-4

  npm install
```

**CMD/Powershell**

```powershell
  cd C:\[path-to-project]\compass-challenge-week-8

  npm install
```

By doing this, the dependencies of the project will be installed.

## Running locally

After installing all the dependencies, the application should be built. This process is performed by running:

```bash
  npm run build
```

Now, we can run the application with the command below:

```bash
  npm run start
```

By default, the application will run on PORT 3000. If you have another service running on this PORT, you can assign a free port to run the application. The commands are as follow:

**Bash**

```bash
  PORT=5000 (for example)
  npm run start
```

**CMD**

```bash
  set PORT=5000 (for example)
  npm run start
```

**Powershell**

```bash
  $env:PORT=5000 (for example)
  npm run start
```

If all goes well, open your browser and access the link:

```
  http://localhost:[PORT]/api/v1/api-docs
```

In this page, it is possible to test the API functionalities.

## API Documentation

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
| `id`      | `number` | **Required**. ID of the tutor you want to update |

#### Delete tutor from database

```http
  PUT /api/v1/tutor/{:id}
```

| Parameter | Type     | Description                                      |
| :-------- | :------- | :----------------------------------------------- |
| `id`      | `number` | **Required**. ID of the tutor you want to delete |

#### Assigns a pet to a tutor

```http
  POST /api/v1/pet/{:tutorId}
```

| Parameter | Type     | Description                                              |
| :-------- | :------- | :------------------------------------------------------- |
| `tutorId` | `number` | **Required**. ID of the tutor you want to assign the pet |

#### Update pet's attributes

```http
  PUT /api/v1/pet/{:petId}/tutor/{:tutorId}
```

| Parameter | Type     | Description                                           |
| :-------- | :------- | :---------------------------------------------------- |
| `petId`   | `number` | **Required**. ID of the pet you want to update        |
| `tutorId` | `number` | **Required**. ID of the tutor responsible for the pet |

#### Delete pet from database

```http
  PUT /api/v1/pet/{:petId}/tutor/{:tutorId}
```

| Parameter | Type     | Description                                           |
| :-------- | :------- | :---------------------------------------------------- |
| `petId`   | `number` | **Required**. ID of the pet you want to delete        |
| `tutorId` | `number` | **Required**. ID of the tutor responsible for the pet | -->
