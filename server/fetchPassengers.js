const { MongoClient } = require('mongodb');
const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri);

async function fetchPassengers() {
  try {
    await client.connect();
    const db = client.db("railway"); // Connect to the 'railway' database
    const collection = db.collection("passengers"); // Connect to the 'passengers' collection
    
    // Find all passengers
    const passengers = await collection.find({}).toArray();

    // Log the passengers
    console.log(passengers);

  } catch (err) {
    console.error("Error fetching passengers:", err);
  } finally {
    await client.close();
  }
}

fetchPassengers();
