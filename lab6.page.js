// login.page.js
var Lab6 = function() {
    var self = this;
    //Your submitted/base URL should be of the form: xxx.xxx:3006
    self.lab6URL = "/"; //This really shouldn't impact you, unless you try to submit something that doesn't meet the form above.
    
    //Hopefully by this point you don't need comments detailing what these things should be IDs for... I tried to be specific though.
    //These should all be input type=text fields...
    self.usernameInput = $("#username");
    self.passwordInput = $("#password");
    self.emailInput = $("#email");
    self.colorInput = $("#color");

    //These should all be buttons... either input type=submit or buttons...
    self.registerButton = $("#register");
    self.loginButton = $("#login");
    self.saveButton = $("#save");
    self.deleteButton = $("#delete");

    //These should all be a elements with an href attribute
    self.signUpLink = $("#signUpLink");
    self.editUserLink = $("#editLink");
    self.logoutLink = $("#logoutLink");
    self.homeLink = $("#homeLink");

    self.welcomeText = $("#welcomeText"); //Should say 'Welcome. You are logged in as <%= username %> in index.html
    self.sectionTitle = $("#sectionTitle"); //Should only be in user.html and says 'User Profile'
    self.colorText = $("#colorText"); //Should be in index.html wrapping 'Color <%= color %>
    
    self.indexMsg = $("#indexMsg"); //The <%= msg %> from index.html
    self.signupMsg = $("#signupMsg"); //The <%= msg %> from signup.html
    self.loginMsg = $("#loginMsg"); //The <%= msg %> from login.html
    self.userMsg = $("#userMsg"); //The <%= msg %> from user.html

    self.userRoute = "/user";

    self.login = function(user, pass) {
        var username = user || '123';
        var password = pass || '123';
        self.usernameInput.sendKeys(username);
        self.passwordInput.sendKeys(password);
        self.loginButton.click();
    }
};
module.exports = new Lab6();
/**
 * For more information about the test driver used, check out: protractortest.org
 * For information about page objects: http://www.protractortest.org/#/page-objects
 */
