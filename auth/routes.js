var crypto = require('crypto');
var express = require('express');
var multer = require('multer');
var path = require('path')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './static/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

var upload = multer({ storage: storage });
var mongoose = require('mongoose'),
User = mongoose.model('User');
module.exports = function(app) {
  var users = require('./controllers/users_controller');
  app.use('/static', express.static( './static')).
      use('/lib', express.static( '../lib')
  );
  app.get('/', function(req, res){
    if (req.session.user) {
      res.render('index', {username: req.session.username,
                           profile_picture: req.session.profile_picture,
                           msg:req.session.msg,
                           color:req.session.color});
    } else {
      req.session.msg = 'Access denied!';
      res.redirect('/login');
    }
  });
  app.get('/user', function(req, res){
    if (req.session.user) {
      res.render('user', {msg:req.session.msg});
    } else {
      req.session.msg = 'Access denied!';
      res.redirect('/login');
    }
  });
  app.get('/signup', function(req, res){
    if(req.session.user){
      res.redirect('/');
    }
    if(req.session.msg == 'User Not Found.') {
      req.session.msg = '';
    }
    res.render('signup', {msg:req.session.msg});
  });
  app.get('/login',  function(req, res){
    if(req.session.user){
      res.redirect('/');
    }
    res.render('login', {msg:req.session.msg});
  });

  app.get('/logout', function(req, res){
    req.session.destroy(function(){
      res.redirect('/login');
    });
  });
  app.post('/signup', users.signup);
  app.post('/user/update', upload.single('file_upload'), function(req, res){
    User.findOne({ _id: req.session.user })
    .exec(function(err, user) {
      console.log(req.body);
      console.log(req.file);
      if (typeof req.file != 'undefined')
      {
        user.set('profile_picture', req.file.filename);
      }
      user.set('email', req.body.email);
      user.save(function(err) {
        if (err){
          res.sessor.error = err;
        } else {
          req.session.profile_picture = req.file.filename
          req.session.msg = 'User Updated.';
        }
        res.redirect('/user');
      });
    });
  });
  app.post('/user/delete', users.deleteUser);
  app.post('/login', users.login);
  app.get('/user/profile', users.getUserProfile);
}
