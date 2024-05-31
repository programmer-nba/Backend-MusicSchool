const mongoose = require('mongoose')
const { Schema } = mongoose

const adminSchema = new Schema(
    {
        username: { type: String, require: true }, 
        password: { type: String, require: true },
        active: { type: Boolean, default: true }
    },
    {
        timestamps: true
    }
)

const Admin = mongoose.model('Admin', adminSchema)
module.exports = Admin