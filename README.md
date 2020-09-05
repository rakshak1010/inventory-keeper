# Inventory Keeper

Inventory Keeper is a platform to manage the sales and purchase of goods with graphical analysis, and complete activity log.


## Tech-Stack
- ***Backend:*** Node.js
- ***Frontend:*** Embedded Javascript(.ejs), Bootstrap, MDBootstrap
- ***Database:*** MongoDB

## Requirements

- [NPM](https://nodejs.org/en/download/) installed
- [MongoDB](https://www.mongodb.com/try/download/community) installed

## Installation

Use the package manager [npm](https://nodejs.org/en/download/) to install the required packages

```bash
npm install
```

## ENV Setup
1. Create a new file **.env** and copy the content of **sample-env.txt** to it.
2. Add any random string in **SECRET**
3. Add database URI in **MONGO_URI** for example: *mongodb://localhost:27017/<db_name>*

## Running the Project

With your current directory set to the project directory in the terminal, run:

```bash
npm start 
```
Your server is now listening at **localhost:3000**
