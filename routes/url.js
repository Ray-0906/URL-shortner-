const express=require('express')

const router=express.Router();

const {handleaddurl,
    handlevisiturl,
    handleanaslytics,
    handleanaslyticshistory,
}=require('../Controller/url');
const { restrictTo } = require('../middleware/auth');

router.post('/',restrictTo(['ADMIN','NORMAL']),handleaddurl)


router.get('/:id',handlevisiturl);
router.get('/analytics/:id',restrictTo(['ADMIN','NORMAL']),handleanaslytics);
router.get('/analytics',restrictTo(['ADMIN','NORMAL']),handleanaslyticshistory);

module.exports=router;