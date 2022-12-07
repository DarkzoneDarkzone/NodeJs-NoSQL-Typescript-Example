import mongoose from "mongoose";


const memberSchema = new mongoose.Schema({
    access_token: {
        type: String,
        text: true,
        require: true
    },
    refresh_token: {
        type: String,
        text: true,
        require: true
    },
    firstname: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
},
{ timestamps: true, versionKey: false}
)

const Member = mongoose.model('Member', memberSchema)

export default Member