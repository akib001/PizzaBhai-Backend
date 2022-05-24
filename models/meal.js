const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

class Meal {
  constructor(title, price, description, adminId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.adminId = adminId;
  }

  save() {
    const db = getDb();
    db.collection('meals')
      .insertOne(this)
      .then((result) => {
        return result;
      })
      .catch((err) => console.log(err));
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection('meals')
      .find()
      .toArray()
      .then((meals) => {
        console.log(meals);
        return meals;
      })
      .catch((err) => console.log(err));
  }
}

module.exports = Meal;
