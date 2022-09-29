const express= require("express");
const mongoose = require("mongoose");
const Article = require('./model/article')
const Login = require('./model/login')

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4200;



// db connection 
mongoose.connect('mongodb://localhost:27017/blogPostman', {
  useNewUrlParser: true, useUnifiedTopology: true
})


app.get('/', async (req, res) => {
    res.json('home');
    
})


app.post('/createblog', async (req, res) => {
    const create = new Article({
        title:req.body.title,
        description:req.body.description,
        id:req.body.id
    }) 
    const val = await create.save();
    res.json(val);
    
})

app.put('/update/:id', async (req, res) => {
    let upid=req.params.id;         
    let uptitle = req.body.title;
    let updescription= req.body.description;
    Article.findOneAndUpdate({id:upid},{$set:{title:uptitle,description:updescription}},{new:true},(err,data)=>{
        if(data==null){
            res.json("nothing Found!!")
        }else{
            res.json(data)
        }
    })
    
});



app.get('/displayblog', async (req, res) => {
  const articles = await Article.find();
  res.json(articles)
    
});

app.delete('/del/:id', async(req,res)=>{
    let delid= req.params.id;
    Article.findOneAndDelete(({id:delid}),function(err,docs){
        if(docs==null){
            res.json("Wrong ID!!!")
        }
        else{
        res.json(docs); 
        }

    })

})



app.listen(PORT,()=>{
    console.log(`Server is listed on port ${PORT}`);
})

