const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    Ogurl: {
        type: String,
        required: true
    },
    visithistory: [{ timestamp: { type: Number } }],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
    }

},
{timestamps:true}
);
const Url = mongoose.model("urls", urlSchema);

module.exports = Url;