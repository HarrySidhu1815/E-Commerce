import mongoose from "mongoose";

const userSchemea = new mongoose.Schema({
    name: {type: String, require: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    cartData: {type: Object, default: {}}
}, {minimize: false})

const userModel = mongoose.models.user || mongoose.model('user', userSchemea)

export default userModel