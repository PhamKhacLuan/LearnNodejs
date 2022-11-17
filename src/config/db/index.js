const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://Khacluan1392002:khacluan1392002%40@bt1.mjqcnjn.mongodb.net/test');
        console.log('connect successfully!!!!');
    } catch (error) {
        console.log(error);
    }
}

module.exports = { connect };
