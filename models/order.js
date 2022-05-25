const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');


class Order {
  constructor(userData, orderData) {
    this.userData = userData;
    this.orderData = orderData;
    // this.orderSummary = orderSummary;
  }

  save() {
    const db = getDb();
    db.collection('orders')
      .insertOne(this)
      // .then((result) => {
      //   return db.collection('orders')
      //     .find()
      //     .toArray()
      //     .then((orders) => {
      //       const orderData = orders.orderData;
      //       let totalAmount = 0;
      //       let totalPrice = 0;

      //       for (data in orderData) {
      //         totalAmount = totalAmount + data.totalAmount;
      //         totalPrice = totalPrice + data.totalPrice;
      //       }

      //       return db.collection('orders')
      //         .updateOne({
      //           $set: {
      //             orderSummary: {
      //               totalAmount: totalAmount,
      //               totalPrice: totalPrice,
      //             },
      //           },
      //         })
              
      //     })
          
      // })
      // .then(result => {
      //   return result;
      // })
      .catch((err) => console.log(err));
  }
}

module.exports = Order;
