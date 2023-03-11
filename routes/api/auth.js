const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/User")

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                msg: "Please provide mandatory parameters!"
            });
        }
        const user = await User.findOne({ email: email.toLowerCase() });
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

        if (!user.approved) {
            return res.status(400).json({
                success: false,
                msg: "account is not yet approved."
            })
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
})


module.exports = router;