const USER=require('../Models/user');
const {setuser}=require('../service/auth')
const {v4:uuidv4}=require('uuid')
const handlesignup= async(req,res)=>{
  const body=req.body;
try {
    await USER.create({
        name:body.name,
        email:body.email,
        password:body.password,
    });
  res.render('home');
} catch (error) {
   console.log('failed to signup');

}

}

const handlelogin=async(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
  const logins = await USER.findOne({email,password});

    if(logins){
       
      
       const token=setuser(logins);
       res.cookie('uid',token)
       res.render('home')
    }
    else{
       res.render('login',{error:"Invalid ID or Password !"})
    }
}

module.exports={
    handlesignup,
    handlelogin
}