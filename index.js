import bodyParser from 'body-parser';
import express from 'express';



const app = express()
const port = 3000

var array = [];

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get('/', (req, res) => {
  res.render("index.ejs", {allItemsArray: array});
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

app.get("/new-post", (req, res) => {
  res.render("make-post.ejs");
});

app.post('/submit', function (req, res) {
  var id = array.length;

  const blogTitle = req.body["title"];
  
  const nameOfBlogger = req.body["name"];
  
  const blogImage = req.body["img-url"];
  
  var blogContent = req.body["content"];
  blogContent = blogContent.replace('<p>','');
  blogContent = blogContent.replace('</p>','');
  

  var a = {id, blogTitle, nameOfBlogger, blogImage, blogContent};
  array.push(a);
  

  console.log(array);

  res.redirect("/");
});


app.get("/post", (req, res) => {
  res.render("post.ejs");
});

app.post('/update-post', function(req, res) {
  var objIndex = array.findIndex(obj => obj.id == req.body["id"]);

  //Log object to Console.
  console.log("Before update: ", array[objIndex]);

  //Update object's name property.
  if (req.body["title"]) {
    array[objIndex].blogTitle = req.body["title"];
  };
  if (req.body["name"]) {
    array[objIndex].nameOfBlogger = req.body["name"];
  }
  if (req.body["img-url"]) {
    array[objIndex].blogImage = req.body["img-url"];
  };
  if (req.body["content"]) {
    array[objIndex].blogContent = req.body["content"];
  }

  res.redirect("/");
});

app.post('/delete-post', function(req, res) {
  var objIndex = array.findIndex(obj => obj.id == req.body["id"]);
  array.splice(objIndex, 1);
  
  res.redirect("/");
});


app.listen(port, () => {
  console.log(`Server app listening on port ${port}!`);
});