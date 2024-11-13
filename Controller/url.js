const express = require('express');
const Url=require('../Models/url');
const generateShortId = require('ssid');


const handleaddurl = async (req, res) => {
    const body = req.body;
    if (body) {
        try {
            const shortId = generateShortId(8, false);
            await Url.create({ shortId: shortId, Ogurl: body.url, visithistory: [] ,
                createdBy:req.user._id,
            });
            console.log("Generated ID:", shortId); // Debug line to check if ID is generated correctly
            return res.status(201).render('home', { id: shortId });
        } catch (error) {
            console.log("Error adding URL:", error);
            return res.status(500).send("Server Error");
        }
    } else {
        return res.status(400).json({ err: "URL required" });
    }
};

const handlevisiturl=async(req,res)=>{
 
const shortId=req.params.id;

 const entry=await Url.findOneAndUpdate({shortId},{
    $push:{
        visithistory:{timestamp:Date.now()}
    },
 })
  res.redirect(entry.Ogurl);
}

const handleanaslytics=async(req,res)=>{
    const shortId=req.params.id;
    const result= await Url.findOne({shortId});
    res.json({
        totalClicks:result.visithistory.length,
        Analatics:result.visithistory
    })
}
const handleanaslyticshistory=async(req,res)=>{
   
    const result= await Url.find({createdBy:req.user._id});
    res.render('home',{
        urls:result
    })
}

module.exports={handleaddurl,
    handlevisiturl,
    handleanaslytics,
    handleanaslyticshistory,

}