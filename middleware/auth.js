 const {getuser}=require('../service/auth')

const chkAuthentication=(req,res,next)=>{
   const token=req.cookies?.uid;
   if(!token){ return next();}
   const user=getuser(token);
   req.user=user;
   next();
}

const restrictTo=(roles=[])=>{
    return (req,res,next)=>{
        if(!req.user){ return res.redirect('/login');}

        if(!roles.includes(req.user.role)){return res.end('unautherized');}
        next();
    }
}

const restrictedtologgedin=async(req,res,next)=>{
    const uid=req.cookies.uid;
    if(!uid){ return res.redirect('/login');}
    const user=getuser(uid);
    if(!user){ return res.redirect('/login');}
    req.user=user;
    next();
}

const checkAuth=async(req,res,next)=>{
    const uid=req.cookies.uid;
    if(uid){ 
    const user=getuser(uid);
    req.user=user;
}
    next();
}

module.exports={restrictedtologgedin,checkAuth, restrictTo,chkAuthentication}