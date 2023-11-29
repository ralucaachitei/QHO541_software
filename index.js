const express = require("express");
const path = require("path");

const app = express();
const port = 8000;

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});

app.get("/contact", (req, res) => {  // Added slash here
    res.sendFile(path.resolve(__dirname, "contact.html"));
});

app.get("/support", (req, res) => {  // Added slash here
    res.sendFile(path.resolve(__dirname, "support.html"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});