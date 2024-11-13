const express = require('express')
const router=express.Router();
const {handleanaslyticshistory,handleanaslytics   }=require('../Controller/url');
const { restrictTo } = require('../middleware/auth');
router.get('/',async(req,res)=>{
    res.render('home');
})
router.get('/home',(req,res)=>{
    res.render('home');
})

router.get('/signup',(req,res)=>{res.render('signup');})
router.get('/login',(req,res)=>{res.render('login');})
router.get('/admin/urls',restrictTo(['NORMAL','ADMIN']),
async(req,res)=>{
   
    const result= await Url.find({});
    res.render('home',{
        urls:result
    })
}
)
router.get('/analytics',restrictTo(['NORMAL','ADMIN']),handleanaslyticshistory);
router.get('/analytics/:id',restrictTo(['NORMAL','ADMIN']),handleanaslytics);

module.exports=router;