const mongoose = require("mongoose");
const uuid = require('uuid');

const UserSchema = new mongoose.Schema(
    {
        _id: { 
            type: String,
            default: function genUUID() {
                return uuid.v4()
            }
        },    
        first_name: {
            type: String,
            default: ""
        },
        last_name: {
            type: String,
            default: ""
        },
        telegram_id: {
            type: Number,
            required: true,
            unique: true
        },
        phone_number: {
            type: String,
            default: ""
        },
        created_at: {
            type: Date,
            default: Date.now()
        }
    }
);

module.exports = mongoose.model("User", UserSchema);