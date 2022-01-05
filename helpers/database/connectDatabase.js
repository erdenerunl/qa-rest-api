const mongoose = require('mongoose');


let options = {
    useNewUrlParser: true
}

const connectDatabase = () => {
    mongoose.connect(process.env.MONGO_URI, options)
        .then(() => {
            console.log("MongoDb connected.")
        })
        .catch((err) => {
            console.error(err);
        })
}

module.exports = connectDatabase;
