const express =require("express")
const bodyParser = require("body-parser")
const method_override=require("method-override")
const expressSenitizer=require("express-sanitizer")
const mongoose=require("mongoose")
const app=express()

mongoose.connect("mongodb://localhost/Blog", {
    useUnifiedTopology: true,
     
         useNewUrlParser: true
     
})
app.set("view engine","ejs")
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}))
app.use(expressSenitizer())
app.use(method_override("_method"))
 
const blogSchema=mongoose.Schema({
    title:String,
    body:String,
    image:String,
    created:{type:Date,default:Date.now}
})

const Blog =mongoose.model("blog",blogSchema)
 


app.get("/blog",function(req,res){
    Blog.find({}, function (error,data) {
        if(error){
            console.log(error)
        }else{
            res.render("index",{blog:data})
        }
    })
    
}) 

app.post("/blogs", function (req, res) {
     req.body.blog.body = req.sanitize(req.body.blog.body)
  Blog.create(req.body.blog,function(err,data){
      if(err){
          res.redirect("new")
      }else{
          res.redirect("blog")
      }
  })
})

app.get("/blog/new",function(req,res){
    res.render("new")
})

app.get("/blog/:id",function(req,res){
    Blog.findById(req.params.id,function(err,data){
        if(err){
               console.log(err)
        }else{
            res.render("show",{blog:data})
        }
    })
})


//update
app.get("/blog/:id/edit",function(req,res){
    Blog.findById(req.params.id,function(err,data){
        if(err){
             console.log(err)
        }else{
            res.render("edit",{blog:data})
        }
    })
  
})

app.put("/blogs/:id",function(req,res){
    Blog.findByIdAndUpdate(req.params.id,req.body.blog,function (err,data) {
        if(err){
            res.redirect("/blog")
        }else{
            res.redirect(`/blog/${req.params.id}`)
        }
    })
})

delete

app.delete("/blog/:id",function(req,res) {
    Blog.findByIdAndDelete(req.params.id,function (err,data) {
        if(err){
            res.redirect("/blog"+req.params.id)
        }else{
            res.redirect("/blog")
        }
    })
})



app.listen(4000,function(err,data){
    console.log("runnning")
})