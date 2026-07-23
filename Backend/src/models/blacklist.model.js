const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema(
    {
    token : {
        type:String,
        required :[true,"token to be added must required"]
    }},
    {
        timestamps : true
    }
)

const tokenBlacklistModel = mongoose.model('blacklistToken',blacklistTokenSchema);

module.exports = tokenBlacklistModel;