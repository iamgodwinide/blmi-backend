const Message = require("../../models/Message");
const Series = require("../../models/Series");
const UserMessage = require("../../models/UserMessage");
const Devotionals = require("../../models/Devotionals");
const Department = require("../../models/Department");




const router = require("express").Router();

// GET ALL MESSAGES
router.get("/messages", async (_, res) => {
    try {
        const messages = await Message.find({});
        return res.status(200).json({
            success: true,
            messages
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "internal server error"
        })
    }
});

// GET ALL USER MESSAGES
router.get("/messages/user/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                msg: "user ID is required!"
            });
        }
        const userMessages = await UserMessage.find({ user_id: id });
        return res.status(200).json({
            success: true,
            messages: userMessages
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "internal server error"
        })
    }
});

// GET ALL SERIES
router.get("/series", async (_, res) => {
    try {
        const series = await Series.find({});
        return res.status(200).json({
            success: true,
            series
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "internal server error"
        })
    }
});

// GET ALL DEVOTIONALS
router.get("/devotionals", async (_, res) => {
    try {
        const devotionals = await Devotionals.find({});
        return res.status(200).json({
            success: true,
            devotionals
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "internal server error"
        })
    }
})

// GET ALL DEPARTMENTS
router.get("/departments", async (_, res) => {
    try {
        const departments = await Department.find({});
        return res.status(200)
            .json({
                success: true,
                departments
            })
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "internal server error"
        })
    }
})

//  ADD USER DEPARTMENTS
router.post("/departments/:userID", async (req, res) => {
    try {
        const { userID } = req.params;
        const { departments } = req.body;
        const pureDepts = departments.map(dep => ({
            name: dep.name,
            userID
        }));
        await UserDepartment.insertMany(pureDepts);
        return res.status(200)
            .json({
                success: true,
                msg: "Departments added successfully"
            })
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "internal server error"
        })
    }
});



module.exports = router;