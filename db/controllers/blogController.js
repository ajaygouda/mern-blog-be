const register = async (req, res)=>{
    try {
        let user = new User(req.body);
        let result = await user.save();
        res.send(result)
      }
      catch (err) {
        console.log("err" + err)
      }
}
const addBlog = async (req, res)=>{
    try {
        let blog = new Blog({
          title: req.body.title,
          description: req.body.description,
          category: req.body.category,
          categoryID: req.body.categoryID,
          author: req.body.author,
          authorID: req.body.authorID,
          date: req.body.date,
          banner:req.body.banner
        });
        let result = await blog.save();
        res.send(result)
      }
      catch (err) {
        console.log("err" + err)
      }
}
module.exports = {register, addBlog};