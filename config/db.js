const { connect } = require('mongoose')

module.exports = async () => {
    try {
        await connect(process.env.DB_URI, {
            useUnifiedTopology: true
        });
        console.log(`MongoDB connected...`);
    }
    catch (err) {
        console.log("MongoDB error: ", err);
    }
}

