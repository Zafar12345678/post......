const express = require("express");
const user_route = express.Router(); // Use express.Router() to create a router instanc
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const user_controller = require("../controllers/userController");

user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({ extended: true }));
user_route.use(express.static("public"));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/Images")); // Corrected the destination path
    },
    filename: function (req, file, cb) {
        const name = Date.now() + "_" + file.originalname;
        cb(null, name);
    }
});

const upload = multer({ storage: storage });

user_route.post("/Register", upload.single("image"), user_controller.Registration_user); // Fixed the function name here: Rgistration_user -> Registration_user

module.exports = user_route;
