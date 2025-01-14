const User = require('../models/userModel');
const UserService = require("../services/usersService");
const passport = require('passport');


exports.index = async (req, res, next) => {
    try{
        const users = await new UserService().index();
        res.render("users/index", {users: users});
    }catch(error){
        res.redirect("/");
    }
};

exports.new = async (req, res, next) => {
    res.render("users/new");
};

exports.create = async(req, res, next) => {

    try{
        const user = await new UserService().create(req.body);
        req.flash(
            'success_msg','Usuário cadastrado com sucesso!'
           );
        res.redirect("/users/registration");
    }catch(error){
        
        if (error.errors){
            res.render("users/new", {name: error.errors['name'], email: error.errors['email'], errors: error.errors['errors'] });
        }
        else{
            res.render("users/new");
        }       
    }
};

exports.show = async (req, res, next) => {
    try{
        const user = await new UserService().show(req.params.id);
        res.render("users/show", {user: user});
    }catch(error){
        res.redirect("/users");
    }
};

exports.edit = async (req, res, next) => {
    try{
        const user = await new UserService().edit(parseInt(req.params.id));
        res.render("users/edit", {user: user});
    }catch(error){
        res.redirect("/users");
    }
};

exports.update = async(req, res, next) => {
    
    try{
        const user = await new UserService().update(req.body);
        res.render("users/show", {id: user.id, user: user});
    }catch(error){
        console.log(error);
        if (error.errors){
            console.log(error.errors['id']);
            res.render("users/edit", {id: error.errors['id'], name: error.errors['name'], 
            email: error.errors['email'], password: error.errors['password'],
            errors: error.errors['errors'] });
        }
        else{
            res.redirect("/");
        }   
    }
};

exports.registration = function (req, res) {
    res.render('users/registration');
};

exports.GETlogin = function (req, res) {
    res.render('users/login');
};

exports.POSTlogin = function (req, res, next) {
    passport.authenticate('local', {
    successRedirect: '/manager/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true

    })(req, res, next);
    console.log( next)
  };

exports.logout = function (req, res) {
    req.logout(function(err) {
    if (err) { return next(err); }
    req.flash('success_msg', 'Logoff realizado com sucesso!');
    res.redirect('/');
  });    
};