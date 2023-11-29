const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');

// Load the data from amazon.json
const data = JSON.parse(fs.readFileSync('amazon.json', 'utf-8'));

const uri = "mongodb+srv://ralucaachitei:ralucaachitei@cluster0.ely2fqs.mongodb.net/"; 

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect(err => {
  if (err) {
    console.error('Error connecting to MongoDB Atlas:', err);
    return;
  }
  console.log('Connected to MongoDB Atlas');

  const db = client.db('amazon'); // Replace with your database name

  const productsCollection = db.collection('products');
  const reviewsCollection = db.collection('reviews');

  
  productsCollection.insertMany(data.products, (err, result) => {
    if (err) {
      console.error('Error inserting products:', err);
      return;
    }
    console.log(`Inserted ${result.insertedCount} products`);

    reviewsCollection.insertMany(data.reviews, (err, result) => {
      if (err) {
        console.error('Error inserting reviews:', err);
        return;
      }
      console.log(`Inserted ${result.insertedCount} reviews`);
      client.close();
    });
  });
});