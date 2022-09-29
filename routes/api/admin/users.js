const router = require("express").Router();
const { approveUser } = require("../../../mail/sendEmail");
const User = require("../../../models/User");



// GET Users
router.get("/users", async (req, res) => {
    try {
        const users = await User.find({ approved: true });
        return res.status(200).json({
            success: true,
            users
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Internal server error"
        })
    }
});

// GET Pending Users
router.get("/users/pending", async (req, res) => {
    try {
        const users = await User.find({ approved: false });
        return res.status(200).json({
            success: true,
            users
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Internal server error"
        })
    }
});

// Approve User
router.post("/approve/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                msg: "Invalid User ID"
            });
        }
        const user = await User.findOne({ _id: id });
        if (!user) {
            return res.status(400).json({
                success: false,
                msg: "User does not exist"
            });
        };
        await User.updateOne({ _id: id }, { approved: true });
        approveUser(user.email);
        return res.status(200).json({
            success: true,
            msg: "User Approved"
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Internal server error"
        })
    }
});

// Reject User
router.post("/reject/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                msg: "Invalid User ID"
            });
        }
        const user = await User.findOne({ _id: id });
        if (!user) {
            return res.status(400).json({
                success: false,
                msg: "User does not exist"
            });
        };
        await User.updateOne({ _id: id }, { approved: false });
        return res.status(200).json({
            success: true,
            msg: "User Rejected"
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Internal server error"
        })
    }
});


module.exports = router;