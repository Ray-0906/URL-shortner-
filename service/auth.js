const jwt=require('jsonwebtoken')

const key="astra@0906"
const sessionToUserMap=new Map();

function setuser(user){
   return  jwt.sign({id:user._id,
    email:user.email,
    role:user.role,
   },key)
}
function getuser(id){
    if(!id){ return null;}
    return jwt.verify(id,key);

}

module.exports={setuser,getuser};