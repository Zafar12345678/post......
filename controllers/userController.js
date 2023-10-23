const User = require("../models/userModel");
const bcryptjs = require('bcryptjs'); // Corrected the require statement for bcryptjs



const create_token = async (id) => {
    try {
      const token = jwt.sign({ _id: id }, config.secret_jwt);
      return token;
    } catch (error) {
      throw error; // Throw the error instead of sending a response here
    }
  };
  
const securePassword = async (password) => {
    try {
        const passwordHash = await bcryptjs.hash(password, 10);
        return passwordHash;
    } catch (error) {
        // Handle the error properly, for example, log it or send an appropriate response
        throw new Error(error.message);
    }
};
const Registration_user = async (req, res) => {
    try {
        const spassword = await securePassword(req.body.password);
        const userData = await User.findOne({ email: req.body.email });

        if (userData) {
            res.status(400).send({ success: false, msg: "This email already exists." });
        } else {
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: spassword,
                image: req.file.filename, // Assuming you have multer middleware for handling file uploads
                mobile: req.body.mobile,
                type: req.body.type
            });

            const user_data = await user.save();
            res.status(200).send({ success: true, data: user_data });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    Registration_user
};
