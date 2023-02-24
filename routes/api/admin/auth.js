const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../../models/Admin")


router.post("/add-admin-acc", async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                msg: "Please provide mandatory parameters!"
            });
        }
        const exists = await User.findOne({username});
        if(exists){
            return res.status(400).json({
                success: false,
                msg: "user with that username already exists"
            })
        }
        const newAcc = new User({
            username,
            password
        });
        await newAcc.save();
        return res.status(200).json({
            success: true,
            msg: "Admin added successfully"
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            msg: "internal server error"
        })
    }
});

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                msg: "Please provide mandatory parameters!"
            });
        }
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({
                success: false,
                msg: "Invalid credentials"
            });
        }

        const correctPass = await bcrypt.compare(password, user.password);
        if (!correctPass) {
            return res.status(400).json({
                success: false,
                msg: "Invalid credentials"
            });
        }

        const token = await jwt.sign({ id: user.id }, process.env.jwt_secret)
        return res.status(200).json({
            success: true,
            user,
            token
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            msg: "internal server error"
        })
    }
});




module.exports = router;