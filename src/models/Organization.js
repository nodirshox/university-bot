const mongoose = require("mongoose");
const uuid = require('uuid');

const OrganizationSchema = new mongoose.Schema(
    {
        _id: { 
            type: String,
            default: function genUUID() {
                return uuid.v4()
            }
        },
        type: {
            type: String,
            enum: ["university"],
            default: "university"
        },
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            default: ""
        },
        phone: {
            type: String,
            default: ""
        },
        website: {
            type: String,
            default: ""
        },
        slug: {
            type: String,
            required: true,
            unique: true
        },
        category: {
            type: String,
            default: ""
        },
        direction: [
            {
                name: {
                    type: String,
                    default: ""
                }
            }
        ],
        social: [
            {
                name: {
                    type: String,
                    default: ""
                },
                link: {
                    type: String,
                    required: true
                }
            }
        ],
        picture: {
            type: String,
            default: ""
        },
        is_active: {
            type: Boolean,
            default: false
        },
        created_at: {
            type: Date,
            default: Date.now()
        },
        updated_at: {
            type: Date
        },
        deleted_at: {
            type: Date
        }
    }
);

module.exports = mongoose.model("Organization", OrganizationSchema);