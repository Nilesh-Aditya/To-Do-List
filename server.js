const express = require('express');

const app = express();

app.set("view engine", "ejs");
app.set("views", "");

app.use(express.static( __dirname+ ""));
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`app is running on http://localhost:${PORT}`));

app.get('/', (req, res) => {
    res.render("./index.ejs");
});