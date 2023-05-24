const express = require("express");
const cors = require("cors");
require("./db/config");
const Blog = require("./db/schema/Blog");
const User = require("./db/schema/User");
const Comment = require("./db/schema/Comment");
const app = express();

app.use(express.json({ limit: "2000mb" }));
app.use(cors());

app.post("/register", async (req, resp) => {
  try {
    let user = new User(req.body);
    let result = await user.save();
    resp.send(result)
  }
  catch (err) {
    console.log("err" + err)
  }
})

app.post("/posts", async (req, resp) => {
  try {
    let blog = new Blog({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      categoryID: req.body.categoryID,
      author: req.body.author,
      authorID: req.body.authorID,
      date: req.body.date,
      banner: req.body.banner
    });
    let result = await blog.save();
    resp.send(result)
  }
  catch (err) {
    console.log("err" + err)
  }


  // console.dir(req.body);

})
app.get("/allPosts", async (req, resp) => {
  let allBlogs = await Blog.find(req.body);
  resp.send(allBlogs)
})
app.delete("/posts/:id", async (req, res) => {
  const result = await Blog.deleteOne({ _id: req.params.id })
  res.send(result)
})
app.get("/posts/:id", async (req, res) => {
  const result = await Blog.findOne({ _id: req.params.id })
  res.send(result);
})

app.put("/posts/:id", async (req, res) => {
  const result = await Blog.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  )
  res.send(result)
})

app.post("/login", async (req, res) => {
  console.log(req.body);
  if (req.body.email && req.body.password) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      res.send(user);
    }
    else {
      res.send({ result: "No Result Found" });
    }
  }
  else {
    res.send({ result: "No Result Found" });
  }

})

/** Comments **/
app.get("/comments/:id", async (req, res) => {
  const result = await Comment.find({ blogID: req.params.id })
  res.send(result);
})
app.post("/comments", async (req, res) => {
  try {
    let comment = new Comment({
      blogID: req.body.blogID,
      user: {
        id: req.body.user.id,
        name: req.body.user.name,
        image: req.body.user.image,
      },
      comment: req.body.comment,
      date: req.body.date
    });
    let result = await comment.save();
    res.send(result)
  }
  catch (err) {
    console.log("err" + err)
  }
})
app.delete("/comments/:id", async (req, res) => {
  const result = await Comment.deleteMany({ blogID: req.params.id });
  res.send(result)
})

app.listen(5000)