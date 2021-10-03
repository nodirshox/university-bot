const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        surname: {
            type: String,
            default: ""
        },
        lastname: {
            type: String,
            default: ""
        },
        telegram_id: {
            type: Number,
            required: true,
            unique: true
        },
        phone: {
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