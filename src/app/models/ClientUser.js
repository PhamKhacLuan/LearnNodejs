const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const ClientUser = new Schema({
    name: { type: String, maxLength: 255 },
    address: { type: String, maxLength: 600 },
    phone: { type: String, maxLength: 255 },
    username: {type: String, maxLength: 255},
    password: {type: String, maxLength: 255},
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
});

//Add plugin
ClientUser.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt : true
});
mongoose.plugin(slug);

module.exports = mongoose.model('ClientUser', ClientUser);
