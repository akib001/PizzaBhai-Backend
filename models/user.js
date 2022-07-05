// const getDb = require('../util/database').getDb;
// const mongodb = require('mongodb');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userRole: {
        type: Boolean,
        required: true
    },
    adminRole: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema);

// class User {
//     constructor(name, email, password, userRole, adminRole) {
//         this.name = name;
//         this.email = email;
//         this.password = password;
//         this.userRole = userRole || false;
//         this.adminRole = adminRole || false;
//     }

//     save() {
//         const db = getDb();
//         db.collection('users')
//           .insertOne(this)
//           .then((result) => {
//               console.log(result)
//           })
//           .catch((err) => console.log(err));
//     }
// }

// module.exports = User;