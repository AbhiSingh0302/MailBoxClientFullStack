const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors());

app.post("/login", (req,res) => {
    console.log(req.body);
})

app.listen(4000, (what) => {
    console.log("what is ",what);
})