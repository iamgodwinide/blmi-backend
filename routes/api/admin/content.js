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

// GET ONE MESSAGE
router.get("/messages/find/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                msg: "ID is required!"
            });
        }
        const message = await Message.find({ _id: id });
        return res.status(200).json({
            success: true,
            message
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


// GET ONE MESSAGE
router.get("/messages/find/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                msg: "ID is required!"
            });
        }
        const message = await Message.find({ _id: id });
        return res.status(200).json({
            success: true,
            message
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "internal server error"
        })
    }
});

// DELETE MESSAGE
router.post("/messages/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                msg: "user ID is required!"
            });
        }
        await Message.deleteOne({_id: id});
        return res.status(200).json({
            success: true,
            msg: "Message Deleted successfully"
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

// GET ONE SERIES
router.get("/series/find/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                msg: "ID is required!"
            });
        }
        const series = await Series.findOne({ _id: id });
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

// EDIT SERIES
router.post(`/series/edit/:id`, async (req, res) => {
    try {
        const {
            title,
            artwork,
            published,
            seriesId
        } = req.body;

        if (!title) {
            return res.status(400).json({
                success: false,
                msg: "Provide mandatory fileds"
            });
        }
        const update = {
            title,
            artwork: artwork || "",
            published
        };
        await Series.updateOne({_id: seriesId}, update);
        return res.status(200).json({
            success: true,
            msg: "Series updated successfully"
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            msg: "internal server error"
        })
    }
});

// DELETE SERIES
router.post("/series/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                msg: "ID is required!"
            });
        }
        await Series.deleteOne({_id: id});
        return res.status(200).json({
            success: true,
            msg: "Series Deleted successfully"
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "internal server error"
        })
    }
});

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

        if(series){
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
        }else{
            const newMessage = new Message({
                title: title,
                series_title: "",
                seriesID: "",
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
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            msg: "internal server error"
        })
    }
});



// EDIT MESSAGE
router.post("/edit-message", async (req, res) => {
    try {
        const {
            title,
            series,
            about,
            artwork,
            audio,
            video,
            published,
            msg_id
        } = req.body;

        if (!title || !about || !msg_id) {
            return res.status(400).json({
                success: false,
                msg: "Provide Mandatory fields"
            });
        }


       if(series){
        const seriesExists = await Series.findById(series);
        const prev_msg = await Message.findById(msg_id);
        const update = {
            title: title || prev_msg.title,
            series_title: seriesExists?.title || "",
            seriesID: seriesExists?._id || "",
            about: about || prev_msg.about,
            artwork: artwork || prev_msg.artwork,
            url: audio || prev_msg.url,
            video_url: video || prev_msg.video_url,
            published
        };

        await Message.updateOne({_id: msg_id}, update);
        return res.status(200).json({
            success: true,
            msg: "Message updated successfully"
        })
       }else{
        const prev_msg = await Message.findById(msg_id);
        const update = {
            title: title || prev_msg.title,
            series_title: "",
            seriesID:  "",
            about: about || prev_msg.about,
            artwork: artwork || prev_msg.artwork,
            url: audio || prev_msg.url,
            video_url: video || prev_msg.video_url,
            published
        };

        await Message.updateOne({_id: msg_id}, update);
        return res.status(200).json({
            success: true,
            msg: "Message updated successfully"
        })
       }

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