const router = require("express").Router();
const Message = require("../../../models/Message")
const UserMessage = require("../../../models/UserMessage")
const Series = require("../../../models/Series")
const Devotionals = require("../../../models/Devotionals")

// GET ALL MESSAGES
router.get("/messages", async (_, res) => {
    try {
        const messages = await Message.find({});
        return res.status(200).json({
            success: true,
            messages
        })
    } catch (err) {
        console.log(err)
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
        console.log(err)
        return res.status(500).json({
            success: false,
            msg: "internal server error"
        })
    }
});


// CREATE NEW SERIES
router.post("/new-series", async (req, res) => {
    try {
        const {
            title,
            artwork,
            published
        } = req.body;

        if (!title || !artwork) {
            return res.status(400).json({
                success: false,
                msg: "Provide mandatory fileds"
            });
        }

        const newSeries = new Series({
            title,
            artwork,
            published
        });

        await newSeries.save();
        return res.status(200).json({
            success: true,
            msg: "Series created successfully"
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            msg: "internal server error"
        })
    }
})

// CREATE NEW MESSAGE
router.post("/new-message", async (req, res) => {
    try {
        const {
            title,
            series,
            about,
            artwork,
            audio,
            video,
            published
        } = req.body;

        if (!title || !about || !artwork || !audio) {
            return res.status(400).json({
                success: false,
                msg: "Provide Mandatory fields"
            });
        }

        const seriesExists = await Series.findById(series);

        const newMessage = new Message({
            title: title,
            series_title: seriesExists?.title || "",
            seriesID: seriesExists?._id || "",
            about,
            artwork,
            url: audio,
            video_url: video || "",
            published
        });

        await newMessage.save();
        return res.status(200).json({
            success: true,
            msg: "Message uploaded successfully"
        })

    } catch (err) {
        console.log(err);
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

// ADD NEW DEVOTIONALS
router.post("/devotionals/new", async (req, res) => {
    try {
        const {
            title,
            body,
            artwork,
            published,
            mainBibleText,
            mainBibleTextContent
        } = req.body;
        if (!title || !body || !artwork || !mainBibleText || !mainBibleTextContent) {
            return res.status(400).json({
                success: false,
                msg: "Please provide all required fields"
            });
        }
        const newDev = new Devotionals({
            title,
            body,
            artwork,
            published,
            mainBibleText,
            mainBibleTextContent
        });
        await newDev.save();
        return res.status(200).json({
            success: true,
            msg: "Devotional added successfully"
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            msg: "internal server error"
        })
    }
})


module.exports = router;