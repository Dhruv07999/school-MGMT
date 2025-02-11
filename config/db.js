const mongoose = require("mongoose")
// oofline 
// mongoose.connect("mongodb://127.0.0.1:27017/schoolmgmt");
// online 
mongoose.connect('mongodb+srv://dhruvbhavsar07999:bqH9wt7nsrCjmhCP@cluster0.fzd5r.mongodb.net/schoolmgmt');

const db = mongoose.connection;
db.once('open',(err)=>{
    if (err) {
        console.log(err);
        return false
    }
    console.log("db connect");
    
})

module.exports = db;