
# Team zero Gaming

This version uses React, Redux, Express, Passport, Node.js, and PostgreSQL (a full list of dependencies can be found in `package.json`).

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Create database and table

Create a new database called `team_zero_gaming_app` then copy and paste the code from the database.sql file found in the root folder of this project into your database application. I used [Postico](https://eggerapps.at/postico/) but this is not a requirement. 

## Setup Instructions

- Fork the assignment from [github](https://github.com/johnturner4004/Team_zero_Gaming_app)
- Using your terminal app, navigate to the folder you wish to store the code in
- Once in that folder, copy the link from the code menu on github and run 
  ```
  git clone <insert link>
  ```
- Run `npm install`
- Create a `.env` file at the root of the project and paste this line into the file:
  ```
  SERVER_SESSION_SECRET=superDuperSecret
  ```
  While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
- Start postgres if not running already by using 
  ```
  brew services start postgresql
  ```
- Run `npm run server`
- Run `npm run client`
- Navigate to `localhost:3000`

## Using the app

- When the app first loads it will go to Home page with the Team zero Gaming logo and a login form
- Before logging in the user is able to view the Home, Upcoming Events, About, and Register pages
- To register a new user, the user simply needs to navigate to the Register page, enter their gamertag as their user id, choose a password, verify the password, and click submit
- After registering, the user will be logged in and redirected to the Home page.
- A user who is registered and logged in can then navigate to the Add Event page and My Events page. 
- Also on the Upcoming Events page the user will now be able to confirm whether or not they will be playing during an event or play time. 
- The My Events page will be empty until the user adds an event or play time of their own. Once they do, they will be able to edit their events or delete them.
- For events created by a user, that user will be automatically marked as playing and the switch will be disabled. If they no longer intend on playing they will need to delete the event.
- To see a list of users who are playing in an event, go to the My Events page and click on the 'Who's Playing' link on the lower right side of the tile.

## Support

For any support for using this project feel free to email me at [johnturner4004@gmail.com](mailto:johnturner4004@gmail.com)