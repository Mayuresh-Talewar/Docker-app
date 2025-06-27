const express = require("express");
const app = express();
const path = require("path");
const MongoClient = require("mongodb").MongoClient;

const PORT = 5050;
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const MONGO_URL = "mongodb://admin:admin@localhost:27017/?authSource=admin";
const client = new MongoClient(MONGO_URL);

//GET all users
app.get("/getUsers", async (req, res) => {
    try {
        await client.connect(URL);
        console.log("Connected successfully to server");

        const db = client.db("dockerApp-db");
        const data = await db.collection("users").find({}).toArray();

        client.close();
        res.send(data);
    } catch (error) {
        console.error("Error fetching users:", error);
    }
   
});

//POST new user
app.post("/addUser", async (req, res) => {
    const userObj = req.body;
    console.log(userObj)
    console.log(req.body);
    await client.connect(URL);
    console.log('Connected successfully to server');

    const db = client.db("dockerApp-db");
    const data = await db.collection('users').insertOne(userObj);
    console.log(data);
    console.log("data inserted in DB");
    client.close();
});


app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});