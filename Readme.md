# Installation Guide

1. Clone the repo to your local machine
2. Ensure you have MongoDB installed (Installation guide: https://docs.mongodb.com/manual/installation/) and npm installed (https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
3. Open a terminal window and navigate to the root directory of the repository
4. Add a `.env` file with the following content https://codeshare.io/Pd8mOd (not the most secure way of conveying this, but it's the simplest)
5. Navigate to the `/client` directory and add another `.env` file with the following content https://codeshare.io/WdLkKW
6. You're set to go!

# Running the Code
1. Open 3 terminal windows (one for client, one for server and one for database)
2. On the first window, navigate to your MongoDB localhost and run the `mongod` script (Here's a thread to help you: https://stackoverflow.com/questions/20796714/how-do-i-start-mongo-db-from-windows)
3. On the second window, navigate to `/server` and run `npm start`
4. On the third window, navigate to `/client` and run `npm start`
5. You should be ready to go!