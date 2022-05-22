exports.getPosts = (req, res, next) => {
  res.status(200).json({
    meals: [
      {
        _id: '1',
        title: 'Kacchi Biriyani',
        price: '10',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia',
        creator: {
          name: 'Akib'
        },
        createdAt: new Date()
      }
    ]
  });
};

exports.createPost = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  // Create post in db
  res.status(201).json({
    message: 'Post created successfully!',
    post: { id: new Date().toISOString(), title: title, price: price, description: description }
  });
};
