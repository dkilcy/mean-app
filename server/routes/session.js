/*****************************************************************************
 *
 * 
 *
 * @author dkilcy
 * 
 ****************************************************************************/
var global = require('../global.js');

var jwt = require('jsonwebtoken');	//https://npmjs.org/package/node-jsonwebtoken

var UsersDAO = require('../users').UsersDAO;

/* The SessionHandler must be constructed with a connected db */
function SessionHandler (db) {
    "use strict";

    var users = new UsersDAO(db);

    this.handleLoginRequest = function(req, res, next) {
    	
        var username = req.body.username;
        var password = req.body.password;
        
        console.log("user submitted username: " + username + " pass: " + password + " res=" + res);
        
        users.validateLogin(username, password, function(err, user) {
            if (err) {
                if (err.no_such_user) {	
                	res.send(401, err); 
                }
                else if (err.invalid_password) { 
                	res.send(401, err); 
                }
                else {                	
                	console.log('err', err); // Some other type of error
                	res.send(500, err);                	
                }
            } 
            else {
            	var token = jwt.sign(user, global.configuration.auth.secret, { expiresInMinutes: 60*5 });
            	console.dir(user); 
            	user.token = token;
            	res.json(user);
            }
        });
    };
    
    this.handleLogout = function(req, res, next) { };
    
    function validateSignup(username, password, verify, email, errors) {

        var USER_RE = /^[a-zA-Z0-9_-]{3,20}$/;
        var PASS_RE = /^.{3,20}$/;
        var EMAIL_RE = /^[\S]+@[\S]+\.[\S]+$/;
        
        errors['username_error'] = "";
        errors['password_error'] = "";
        errors['verify_error'] = "";
        errors['email_error'] = "";      
        
        if (!USER_RE.test(username)) {
        	errors['username_error'] = "invalid username. try just letters and numbers";
            return false;
        }
        if (!PASS_RE.test(password)) {
        	errors['password_error'] = "invalid password.";
            return false;
        }
        if (password != verify) {
        	errors['verify_error'] = "password must match";
            return false;
        }
        if(!EMAIL_RE.test(email)) {
           	errors['email_error'] = "invalid email address";
            return false;
        }      
        
        return true;
    }

    this.handleSignup = function(req, res, next) {

        var email = req.body.email;
        var username = req.body.username;
        var password = req.body.password;
        var verify = req.body.verify;

        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        
        // set these up in case we have an error case
        var errors = {'username': username, 'email': email };
        
        if (!validateSignup(username, password, verify, email, errors)) {
            res.send(401, errors); 
        }
        else {
	        users.addUser(username, password, email, firstName, lastName, function(err, user) {
	            if (err) {
	            	
	                // this was a duplicate
	                if (err.code == '11000') {
	                	console.log('info', err ); 
	                	res.send(401, err);                      
	                }
	                // this was a different error
	                else {
	                	console.log('err', err); 
	                	res.send(500, err);                       
	                }       
	            }
	            else {	
	            	res.send(200, 'Success');
	            }
	        });
        }
    };
}

module.exports = SessionHandler;