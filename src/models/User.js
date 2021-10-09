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
        is_active: {
            type: Boolean,
            default: true
        },
        created_at: {
            type: Date,
            default: Date.now()
        },
        deleted_at: {
            type: Date
        }
    }
);

module.exports = mongoose.model("User", UserSchema);