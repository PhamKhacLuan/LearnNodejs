const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://PBL4:PBL4@pbl4.djabw9g.mongodb.net/test');
        console.log('connect successfully!!!!');
    } catch (error) {
        console.log(error);
    }
}

module.exports = { connect };
