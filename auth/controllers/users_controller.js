var crypto = require('crypto');
var multer = require('multer');
var mongoose = require('mongoose'),
    User = mongoose.model('User');
function hashPW(pwd){
  return crypto.createHash('sha256').update(pwd).
         digest('base64').toString();
}
exports.signup = function(req, res){
  console.log("Begin exports.signup");
  if(req.body.username && req.body.password && req.body.email && req.body.age) {
    var user = new User({username:req.body.username});
    console.log("after new user exports.signup");
    user.set('hashed_password', hashPW(req.body.password));
    console.log("after hashing user exports.signup");
    user.set('email', req.body.email);
    console.log("after email user exports.signup");
    user.set('age', req.body.age);
    user.save(function(err) {
      console.log("In exports.signup");
      console.log(err);
      if (err){
        res.session.error = err;
        res.redirect('/signup');
      } else {
        req.session.user = user.id;
        req.session.username = user.username;
        req.session.profile_picture = user.profile_picture;
        req.session.age = user.age;
        req.session.msg = 'Authenticated as ' + user.username;
        res.redirect('/');
      }
    });
  } else {
    req.session.msg = 'Signup Failure! Please fill out all fields.';
    res.redirect('/signup');
  }
};
exports.login = function(req, res){
  User.findOne({ username: req.body.username })
  .exec(function(err, user) {
    if (!user){
      err = 'User Not Found.';
    } else if (user.hashed_password === 
               hashPW(req.body.password.toString())) {
      req.session.regenerate(function(){
        console.log("login");
        console.log(user);
        req.session.user = user.id;
        req.session.username = user.username;
        req.session.profile_picture = user.profile_picture;
        req.session.msg = 'Authenticated as ' + user.username;
        req.session.color = user.color;
        req.session.age = user.age;
        res.redirect('/');
      });
    }else{
      err = 'Authentication failed.';
    }
    if(err){
      req.session.regenerate(function(){
        req.session.msg = err;
        res.redirect('/login');
      });
    }
  });
};
exports.getUserProfile = function(req, res) {
  User.findOne({ _id: req.session.user })
  .exec(function(err, user) {
    if (!user){
      res.json(404, {err: 'User Not Found.'});
    } else {
      res.json(user);
    }
  });
};
exports.updateUser = function(req, res){
  User.findOne({ _id: req.session.user })
  .exec(function(err, user) {
    console.log(req.file_upload);
    user.set('email', req.body.email);
    user.save(function(err) {
      if (err){
        res.sessor.error = err;
      } else {
        req.session.msg = 'User Updated.';
      }
      res.redirect('/user');
    });
  });
};
exports.deleteUser = function(req, res){
  User.findOne({ _id: req.session.user })
  .exec(function(err, user) {
    if(user){
      user.remove(function(err){
        if (err){
          req.session.msg = err;
        }
        req.session.destroy(function(){
          res.redirect('/login');
        });
      });
    } else{
      req.session.msg = "User Not Found!";
      req.session.destroy(function(){
        res.redirect('/login');
      });
    }
  });
};
