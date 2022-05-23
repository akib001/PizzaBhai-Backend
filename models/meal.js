const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

class Meal {
  constructor(title, price, description) {
    this.title = title;
    this.price = price;
    this.description = description;
  }

  save() {
    const db = getDb();
    db.collection('meals')
      .insertOne(this)
      .then((result) => console.log(result))
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
