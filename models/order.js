// const getDb = require('../util/database').getDb;
// const mongodb = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  userData: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    postal: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
    }
  },

  orderData: [
    {
      id: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      totalPrice: {
        type: Number,
        required: true
      },
    }
  ],
  totalOrderedPrice: {
    type: Number,
    required: true
  },
  totalOrderedQuantity: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Order', orderSchema);


// class Order {
//   constructor(userData, orderData, totalOrderedPrice, totalOrderedQuantity) {
//     this.userData = userData;
//     this.orderData = orderData;
//     this.totalOrderedPrice = totalOrderedPrice;
//     this.totalOrderedQuantity = totalOrderedQuantity;
//   }

//   save() {
//     const db = getDb();
//     db.collection('orders')
//       .insertOne(this)
//       .catch((err) => console.log(err));
//   }

//   static fetchAll() {
//     const db = getDb();
//     return db
//       .collection('orders')
//       .find()
//       .toArray()
//       .then((orders) => {
//         console.log(orders);
//         return orders;
//       })
//       .catch((err) => console.log(err));
//   }
// }

// module.exports = Order;
