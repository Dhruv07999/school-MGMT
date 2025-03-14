
const mongoose = require("mongoose")

const AdminSchema = mongoose.Schema({
    userName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    status : {
        type : Boolean,
        default : true
    },
},{
    timestamps: true
})

const AdminModel = mongoose.model("AdminModel",AdminSchema)

module.exports = AdminModel