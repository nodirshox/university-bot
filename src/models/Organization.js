const mongoose = require("mongoose");

const OrganizationSchema = new mongoose.Schema(
    {
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