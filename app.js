const express=require('express');
const cookieParser=require("cookie-parser");

const port=3000;

const app=express();
app.use(cookieParser());
app.use(express.json());

app.set('view engine','pug')

app.use(express.urlencoded({extended:true}));

app.use("/static",express.static("public"));

app.get("/",(req,res)=>{
    const weight=req.cookies.weight;
    const height=req.cookies.height/100;
    const age = req.cookies.age;
    var result=weight/height/height;
    if(weight<=0||height<=0||age<=0){
        res.status(404).render('form',{ message: 'Invalid input' });
    }else if(result){
        result=result.toFixed(1);
        res.render("bmi",{result});
    }else{
        res.redirect("/form");
    }
});
app.get("/form",(req,res)=>{
    res.render("form");
});
app.post("/form",(req,res)=>{
    res.cookie('age',req.body.age);
    res.cookie('weight',req.body.weight);
    res.cookie('height',req.body.height);
    res.redirect("/");
});

app.listen(port,()=>{
    console.log("server is running on port 3000");
    console.log("http://localhost:3000/");
});