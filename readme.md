You will need to do the following in order to use this:

In the terminal run: npm install
This should install express, body-parser, and pg.

Your Database should be named 'todo', or change the name on line 5 of the pool
module found at server/modules/pool.js

The SQL queries that are needed to build the tables and populate the 'category'
table are included in the router. They will run on page load.  If the tables
already exist you will get an error in the console.log, but the application
will work just fine. If you want to create some dummy entries you can run the
2 inserts included in the database.sql file in this directory.
The inserts are not needed for the application to function.
