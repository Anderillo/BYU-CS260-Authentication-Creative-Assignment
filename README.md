# Lab6-Authentication
CS260 Authentication Lab

Authentication is a critical part of almost any application.  
In this lab, you will set up local authentication as shown in 
[Chapter 26](http://proquest.safaribooksonline.com/book/programming/javascript/9780133844351/vi-building-practical-web-application-components/ch26_html)
of the book "Node.js, MongoDB, and AngularJS Web Development" (this link might not work for you if you don't have the book on safari books online).  

This lab will have a little different format because we want you to use the style from the book.

The project is organized into the following directory structure:
* ./: Contains the base application files and supporting folders. This is the project root.
* ./node_modules: Created when the NPMs listed above are installed in the system.
* ./controllers: Contains the Express route controllers that provide the interaction between routes and changes to the MongoDB database.
* ./models: Contains the Mongoose model definitions for objects in the database.
* ./static: Contains any static files that need to be sent, such as CSS and AngularJS code.
* ./views: Contains the HTML templates that will be rendered by EJS.

When the user registers, you will create a document in the mongo database that includes the password.  When the user logs in later, you will check to make sure the password is correct. 
For each user you will store their favorite color. **This lab should involve following the [tutorial](https://github.com/BYUCS260/Lab6-Authentication/wiki/Tutorial) to the letter**, 
otherwise you'll likely not pass the test driver and get a zero.

You should test your server to make sure it works correctly and that the front-end works and looks good.

Grading will be based off the following (subject to change):

<strong>Behavior</strong> |	<strong>Points</strong>
--- | ---
You can create a new user| 25
When you logout, you can login using that created user. | 25
Color changes persist during the session. | 20
When you logout the session is destroyed. | 20
Your code is included in your submission, and your page looks really good. This is subjective, so wow us. | 10
