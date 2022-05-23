const Meal = require('../models/meal');

exports.getMeals = (req, res, next) => {
  Meal.fetchAll(fetchedMeals => {
   console.log('meal fetched'); 
  // return res.status(200).json({
  //   meals: [
  //     {
  //       title: fetchedMeals.title,
  //       price: fetchedMeals.price,
  //       description: fetchedMeals.description,
  //       creator: {
  //         name: 'Akib'
  //       },
  //       createdAt: new Date()
  //     }
  //   ]
  // });
})
}

exports.postAddMeal = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;

  const meal = new Meal(title, price, description);

  meal.save()
  .then(() => {
    res.status(201).json({
      message: 'Meal created successfully!',
      post: { id: new Date().toISOString(), title: title, price: price, description: description }
    });
  }).catch(err => console.log(err));
};
