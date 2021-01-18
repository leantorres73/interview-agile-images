# Introduction

I created an Express + Node project so you can see the code but in a real project I would have done another aproach. 
Using AWS Lambda + Cloudwatch Crons to reload images, probably elasticache (using redis) to store the images and API Gateway to expose the endpoint. Also for the secrets (like Agile API KEY) I'd have used Parameter Store.

# Clarifications
 * "The app should fetch the entire load of images information upon initialization and perform cache reload once in a defined (configurable) period of time.". As this is not clear, I did it every X amount of minutes. 
 * Also the npm start is a nodemon command, for production I shouldn't be using nodemon.

## Features

- Express
- REST API

## Requirements

- [node & npm](https://nodejs.org/en/)

## Installation

- `git clone https://github.com/leantorres73/interview-agile-images.git`
- `cd interview-agile-images`
- `npm install`
- `npm start`
- REQUIREMENT: set the API_KEY and CRON_TIME in your .env

### GET Routes

- visit http://localhost:3000
  - /search/:searchTerm
