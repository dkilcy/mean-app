/*****************************************************************************
 *
 * @author dkilcy
 * 
 ****************************************************************************/

var bcrypt = require('bcrypt-nodejs');

/* The UsersDAO must be constructed with a connected database object */
function UsersDAO(db) {
	"use strict";
    
    /* If this constructor is called without the "new" operator, "this" points
     * to the global object. Log a warning and call it correctly. */
    if (false === (this instanceof UsersDAO)) {
        console.log('Warning: UsersDAO constructor called without "new" operator');
        return new UsersDAO(db);
    }

    var users = db.collection("users");

    this.addUser = function(username, password, email, firstName, lastName, callback) {

        // Generate password hash
        var salt = bcrypt.genSaltSync();
        var password_hash = bcrypt.hashSync(password, salt);

        // Create user document
        var user = {'_id': username, 'password': password_hash, 'email':email, 'firstName':firstName, 'lastName':lastName };

        // Insert user document
        users.insert(user, function (err, result) {
            if (!err) { return callback(null, result[0]); }
            return callback(err, null);
        });
    };

    this.validateLogin = function(username, password, callback) {
        // Callback to pass to MongoDB that validates a user document
        function validateUserDoc(err, user) {
            if (err) return callback(err, null);
            if (user) {
                if (bcrypt.compareSync(password, user.password)) {
                    callback(null, user);
                }
                else {
                    callback( { "message":"Password is invalid." }, null);
                }
            }
            else {
                callback( { "message":"User " + username + " does not exist" } , null);
            }
        }
        users.findOne({ '_id' : username }, validateUserDoc);
    };
}

module.exports.UsersDAO = UsersDAO;