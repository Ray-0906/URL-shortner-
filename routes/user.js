const express = require('express')

const router=express.Router();
 const {handlesignup,handlelogin}=require('../Controller/user')

 router.post('/',handlesignup);
 router.post('/login',handlelogin);
module.exports=router