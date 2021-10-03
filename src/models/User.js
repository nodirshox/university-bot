const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
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