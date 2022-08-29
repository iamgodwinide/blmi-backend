const router = require("express").Router();
const User = require("../../models/User");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const auth = require("../../middlewares/auth");
const UserMessage = require("../../models/UserMessage");

// GET ALL USERS
router.get("/", async (_, res) => {
    try {
        const users = await User.find();
        return res.status(200).json({
            success: true,
            users
        });
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            msg: "Internal server error"
        })
    }
});

// GET ONE USER
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                msg: "user ID is required!"
            });
        }
        const user = User.findOne({ _id: id });
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "No user with that ID!"
            })
        }
        return res.status(200).json({
            success: true,
            user
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Internal server error"
        })
    }
});

// GET USER
router.get("/get-user/:email", async (req, res) => {
    try {
        const { email } = req.params;
        if (!email) {
            return res.status(400).json({
                success: false,
                msg: "user email is required!"
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "we couldn't find an account with that email."
            })
        }
        return res.status(200).json({
            success: true,
            user: {
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                profile_pic: user.profile_pic
            }
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Internal server error"
        })
    }
})

// SEND OTP
router.get("/send-otp/:email", async (req, res) => {
    try {
        const { email } = req.params;
        if (!email) {
            return res.status(400).json({
                success: false,
                msg: "user email is required!"
            });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(404).json({
                success: false,
                msg: "A user with that email already exists"
            })
        }
        return res.status(200).json({
            success: true,
            otp: Math.random().toString().slice(2, 6),
            msg: "Success, otp has been sent."
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Internal server error"
        })
    }
})

// REGISTER A USER
router.post("/register", async (req, res) => {
    try {
        const {
            firstname,
            lastname,
            nickname,
            email,
            phone,
            password
        } = req.body;
        // validate fields
        if (!firstname || !lastname || !email || !phone || !password) {
            return res.status(400).json({
                success: false,
                msg: "provide required fields!"
            })
        }
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                msg: "password is too short!"
            });
        }
        if (password.length > 30) {
            return res.status(400).json({
                success: false,
                msg: "password is too long!"
            });
        }
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                success: false,
                msg: "user with that email already exists."
            })
        }
        const newUser = new User({
            firstname: firstname.toLowerCase(),
            lastname: lastname.toLowerCase(),
            nickname: nickname.toLowerCase() || "",
            email: email.toLowerCase(),
            phone
        });

        // encrypt passwrod
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        newUser.password = hash;
        const saved_user = await newUser.save()
        // create jwt token
        const token = await jwt.sign({ id: saved_user.id }, process.env.jwt_secret)
        return res.status(200).json({
            success: true,
            user: saved_user,
            token: token,
            msg: "Registration successfully"
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            msg: "Internal server error"
        })
    }
});

// UPLOAD PROFILE PICTURE
router.post("/update-profile-picture", auth, async (req, res) => {
    try {
        const { profile_url } = req.body;
        if (!profile_url) {
            return res.status(400).json({
                success: true,
                msg: "Please provide a valid url"
            });
        }
        await User.updateOne({ _id: req.user.id }, {
            profile_pic: profile_url
        })
        const newUser = await User.findOne({ _id: req.user.id });
        return res.status(200).json({
            success: true,
            user: newUser,
            msg: "Picture uploaded successfully"
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Internal server error"
        })
    }
});

// UPDATE USER PROFILE
router.post("/update-profile", auth, async (req, res) => {
    try {
        const { bio, plh, departments } = req.body;
        if (!bio || !plh || !departments) {
            return res.status(400).json({
                success: false,
                msg: "Provide Mandatory Fields!"
            })
        }
        await User.updateOne({ _id: req.user.id }, { bio, plh, departments });
        // delete old departments and create new ones
        const newUser = await User.findOne({ _id: req.user.id });
        return res.status(200).json({
            success: true,
            user: newUser,
            departments,
            msg: "Profile updated successfully"
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            msg: "Internal server error"
        })
    }
});

// BUY TOKEN
router.post("/buy-token", auth, async (req, res) => {
    try {
        const { userID, token } = req.body;
        console.log(req.body);

        if (!token || !userID) {
            return res.status(400).json({
                success: false,
                msg: "Provide mandatory parameters"
            })
        };

        const user = await User.findOne({ _id: userID });

        if (user) {
            // update token
            await User.updateOne({ _id: userID }, {
                coins: user.coins + token
            });
            const newUser = await User.findOne({ _id: userID });
            return res.status(200).json({
                success: true,
                msg: "Token purchase successful",
                user: newUser
            });
        } else {
            return res.status(500).json({
                success: false,
                msg: "Internal server error"
            })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            msg: "Internal server error"
        })
    }
});

// BUY MESSAGE
router.post("/buy-message", auth, async (req, res) => {
    try {
        const {
            message,
            userID,
            token
        } = req.body;
        if (!message || !userID || !token) {
            return res.status(400).json({
                success: false,
                msg: "Provide mandatory fields"
            });
        }
        const user = await User.findOne({ _id: userID });
        const userHasMessage = await UserMessage.findOne({ user_id: userID, message_id: message._id });
        if (userHasMessage) {
            await User.updateOne({ _id: userID }, { coins: user.coins - Number(token) });
            await UserMessage.updateOne({ user_id: userID, message_id: message._id }, {
                ...userHasMessage,
                ...message
            });
            return res.status(200).json({
                success: true,
                msg: "Message purchased successfully"
            });
        } else {
            await User.updateOne({ _id: userID }, { coins: user.coins - Number(token) });
            const newMsg = new UserMessage(message);
            await newMsg.save();
            return res.status(200).json({
                success: true,
                msg: "Message purchased successfully"
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Internal server error"
        })
    }
})


module.exports = router;