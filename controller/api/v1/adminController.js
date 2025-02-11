const AdminModel = require("../../../models/adminModel")
const bcrpyt = require("bcrypt")
const jwt = require("jsonwebtoken")

module.exports.adminRegister = async(req,res)=>{
    try {
        console.log(req.body);
        let checkAdmin = await AdminModel.findOne({email :req.body.email})
        if (!checkAdmin) {
            if (req.body.password == req.body.confirdPassword) {
                req.body.password = await bcrpyt.hash(req.body.password,10)
                let adminRecord = await AdminModel.create(req.body)
                if (adminRecord) {
                    return res.status(200).json({msg : "Data record successfully",adminRecord : adminRecord})
                }else{
                    return res.status(200).json({msg:"adminRecord is not found"})
                }
            }else{
                return res.status(200).json({msg:"password and confirdPassword are not match"})
            }
        } else {    
            return res.status(200).json({msg:"Email is not found"})
        }
        
    } catch (err) {
        console.log(err);
        
        return res.status(400).json({msg:"something is wrong"})
    }
}

module.exports.adminLogin = async(req, res) => {
    try {
        console.log(req.body);
        let adminEmailExites = await AdminModel.findOne({ email: req.body.email });
        console.log(adminEmailExites);
        if (adminEmailExites) {
            let checkPassword = await bcrpyt.compare(req.body.password, adminEmailExites.password);
            console.log(checkPassword);
            if (checkPassword) {
                // password filed is hide 
                adminEmailExites.password = undefined; 
                // password filed is hide end
                console.log(adminEmailExites);
                

                let adminToken = await jwt.sign({ adminData: adminEmailExites }, 'adminLogin', { expiresIn: 1000 * 60 * 60 });

                return res.status(200).json({ 
                    msg: "Admin Login Successfully...", 
                    adminToken: adminToken 
                });
            } else {
                return res.status(200).json({ msg: "Password is Wrong" });
            }
        } else {
            return res.status(200).json({ msg: "Email is Wrong" });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: "Something went wrong" });
    }
};
