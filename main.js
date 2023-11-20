const bodyParser = require('body-parser');
const express=require('express');
const app=express();
app.use(bodyParser.urlencoded());
const{MongoClient}=require("mongodb");
const url="mongodb+srv://mohamed12345abdullah:abdo123@cluster0.dzzltox.mongodb.net/?retryWrites=true&w=majority";
const client=new MongoClient(url);
const fs=require("fs");
const { assert } = require('console');
app.listen(8000);

function readlog(){
      const data= fs.readFileSync("./index.html","utf8",(err)=>{
              if(err){return err};
              
       })
       return data;
}

app.post("/signup",(req,res)=>{

    async function main(){
       await client.connect();
       var name={name:req.body.name};
       var pass={pass:req.body.pass};
       // var category={cetegory:req.body.category};
        var user= await client.db("users").collection("users").find(name&&pass).toArray();
       if(user.length!=0){
              return res.write(`<script>
              window.alert("user is already exist");
          </script>`),res.end(readlog());
          

          
       // return res.end(JSON.stringify(user));
       }
       await client.db("users").collection("users").insertOne(req.body);
       // console.log(user);
       // res.end(JSON.stringify(req.body));
       
       res.end(readlog());
       }

       main();

})

app.post("/login",(req,res)=>{

       var pass={pass:req.body.pass};
       var name={name:req.body.name};
       
       async function log(){
             await client.connect();
             console.log("connected");
             var user=  await client.db("users").collection("users").find(name&&pass).toArray();
              if(user.length==0){
                      res.status(404).write(`<script>
                     window.alert("user not found");
                 </script>`),

                 res.end(readlog());

              }
              else{  
              res.end(JSON.stringify(user));
              }
       }
       log();
})



app.get ("/log", (req,res)=>{
       

       res.end(readlog());
       
});

app.get ("/sign", (req,res)=>{
       
       const data=fs.readFileSync("./signUp.html","utf8",(err)=>{
              if(err){res.end(err)};
             
       });
       res.end(data);
       
})


app.get("/committee/:com",(req,res)=>{
       // res.end(" web committee ");
       async function main(){
              var com=req.params.com;
              client.connect();

              var Members=await client.db("users").collection("users").find({category:com}).toArray();
              // res.end(JSON.stringify(Members));
              for(var i=0; i<Members.length; i++){
                     res.write(`
                     <div>  name : ${JSON.stringify(Members[i].name)}
                            committe : ${JSON.stringify(Members[i].category)}
                     </div>
                     
                     `);
                     // res.write(`
                     // <div> </div>
                     
                     // `)
              }
             res.end();
       }
main()

})