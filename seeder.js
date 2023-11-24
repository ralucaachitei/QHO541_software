const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const fs = require("fs").promises;
const path = require("path");
const loading = require("loading-cli");

const { MONGODB_URI } = process.env;
const client = new MongoClient(MONGODB_URI);

const transformDocument = (doc) => {
    if (doc._id && doc._id.$oid) {
        doc._id = new ObjectId(doc._id.$oid);
    }
    return doc;
};

async function main() {
    try {
        await client.connect();
        const db = client.db();

        const load = loading("importing your dataset ...!!").start();

        // Read and transform data
        const fileData = await fs.readFile(path.join(__dirname, "amazon.json"), "utf8");
        const data = JSON.parse(fileData).map(transformDocument);

        // Drop existing database (optional, be cautious with this)
        await db.dropDatabase();

        // Insert transformed data into 'products'
        await db.collection("products").insertMany(data);

        // Example aggregation on 'products'
        const productsSummary = await db.collection("products").aggregate([
            {
                $group: {
                    _id: "$category",
                    averageRating: { $avg: "$rating" },
                    numberOfProducts: { $sum: 1 }
                },
            },
            {
                $project: {
                    _id: 0,
                    category: '$_id',
                    averageRating: { $round: ['$averageRating', 1] },
                    numberOfProducts: 1
                },
            },
        ]).toArray();

        // Example of updating 'reviews' based on 'products'
        const products = await db.collection("products").find({}).toArray();
        products.forEach(async (product) => {
            await db.collection("reviews").updateMany(
                { product_id: product.product_id },
                {
                    $set: {
                        productRef: product._id,
                        reviewLength: { $strLenCP: "$review_content" }
                    },
                }
            );
        });

        // Clean up fields in 'products' and 'reviews'
        await db.collection("products").updateMany({}, { $unset: { tempField1: "", tempField2: "" } });
        await db.collection("reviews").updateMany({}, { $unset: { oldField1: "", oldField2: "" } });

        load.stop();
        console.info("Amazon collection set up complete!");

        process.exit();
    } catch (error) {
        console.error("error:", error);
        process.exit();
    }
}

main();
