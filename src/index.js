const express = require("express");
const hljs = require("highlight.js");
const { productsRouter, categoriesRouter, brandsRouter, usersRouter } = require("./routers");
require("./dotenv-config");
require("./mongoose");

const port = process.env.PORT || 8080;
const hostname = process.env.HOSTNAME || "localhost";

const app = express();


app.locals.highlight = function (code, language) {
  if (language) {
    return hljs.highlight(code, { language: language }).value.trim();
  } else {
    return hljs.highlightAuto(code).value.trim();
  }
};

app.use(express.json());
app.use(express.static("public"));
app.use('/src', express.static('src'));

app.set("view engine", "ejs");

app.use("/api/products", productsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/brands", brandsRouter);
app.use("/api/users", usersRouter);

app.use((err, _, res, next) => {
  if (err.name === "ValidationError") {
    res.status(400);
    res.send({
      success: false,
      message: "Validation Error",
      errors: err.errors, // Contains details of each invalid field
    });
  } else {
    res.status(err.status || 500);
    res.send({
      success: false,
      message: err.message || "Something went wrong!",
    });
  }
});

app.get("/", (_, res) => {
  res.render("index");
});

app.get("/docs", (_, res) => {
  res.render("docs");
});

app.use((_, res) => {
  res.status(404).render("404");
});



app.listen(port, hostname, () => {
  console.log(`Server is live on ${hostname}:${port}`);
});
