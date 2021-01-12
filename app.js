const express =require("express")
const bodyParser = require("body-parser")
const mongoose=require("mongoose")
const app=express()

mongoose.connect("mongodb://localhost/Blog", {
    useUnifiedTopology: true,
     
         useNewUrlParser: true
     
})
app.set("view engine","ejs")
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}))


const blogSchema=mongoose.Schema({
    title:String,
    body:String,
    image:String,
    created:{type:Date,default:Date.now}
})

const Blog =mongoose.model("blog",blogSchema)
 
// Blog.create({
//     title:"hgsdjgfhsjss",
//     body:"gfjsgfjsh",
//     image:"jehfkf"
// },function(err,data){
//    console.log(data)
// })

app.get("/blog",function(req,res){
    Blog.find({}, function (error,data) {
        if(error){
            console.log(error)
        }else{
            res.render("index",{blog:data})
        }
    })
    
}) 

app.get("/blog/new",function(req,res){
    res.render("new")
})

app.listen(4000,function(err,data){
    console.log("runnning")
})