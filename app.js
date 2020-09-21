const express=require("express");
const path=require("path");

const app=express();
const router=express.Router();

app.listen("1990",()=>{
    console.log("Server started");
});

app.use("/",router);

router.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"/html/index.html"));
});

router.get("/personalInfo",(req,res)=>{
    res.sendFile(path.join(__dirname,"/html/personalInfo.html"));
})

router.get("/socialCircle",(req,res)=>{
    res.sendFile(path.join(__dirname,"/html/socialCircle.html"));
})

app.use(express.static(path.join(__dirname,"/css")));
app.use(express.static(path.join(__dirname,"/js")));