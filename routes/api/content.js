const Message = require("../../models/Message");
const Series = require("../../models/Series");
const UserMessage = require("../../models/UserMessage");
const Devotionals = require("../../models/Devotionals");
const Department = require("../../models/Department");


const router = require("express").Router();

// GET MESSAGES
router.get("/messages", async (_, res) => {
    try {
        const messages = await Message.find({}).limit(20);
        return res.status(200).json({
            success: true,
            messages: messages.reverse()
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "internal server error"
        })
    }
});

// GET MESSAGES PAGINATED
router.get("/messages/pagination/:page", async (req, res) => {
    try {
        const { page } = req.params;
        const allMessages = await Message.find({});
        const pagesCount = Math.ceil(allMessages.length / 20);
        let nextPage;
        if (pagesCount > 0 && page < pagesCount) nextPage = +page + 1;
        else nextPage = false;

        return res.status(200).json({
            success: true,
            nextPage,
            messages: pagesCount >= 1 ? allMessages.slice((page * 20) - 20, page * 20).reverse() : allMessages.reverse()
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            msg: "internal server error"
        })
    }
});

// SEARCH MESSAGES
router.get("/messages/search", async (req, res) => {
    try {
        const { keyword, year, searchTerm } = req.query;

        const titleFilter = (textCont, message) => {
            if (textCont.length > 0 && message.title.toLowerCase().includes(textCont.toLowerCase())) return true;
            return false;
        }

        const yearsFilter = (year, message) => {
            if (typeof message !== 'undefined') {
                if (message?.date?.includes(year)) return true;
            }
            return false;
        }

        const allMessages = await Message.find({});

        const messages = allMessages.filter(message => {
            if (yearsFilter(year || "", message) || titleFilter(keyword || "", message) || titleFilter(searchTerm || "", message)) return true;
            return false
        });

        return res.status(200).json({
            success: true,
            messages
        })
    } catch (err) {
        console.log(err);
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
            series: series.reverse()
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
            devotionals: devotionals.reverse()
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