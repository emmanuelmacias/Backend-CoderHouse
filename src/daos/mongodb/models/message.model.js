import mongoose from "mongoose";

const msgCollection = 'messages';

const MsgSchema = new mongoose.Schema({
    username: { type: String, required: true, max: 100 },
    message: { type: String, required: true },
},
{ timestamps: true, versionKey: false }
);

export const MessagesModel = mongoose.model(msgCollection, MsgSchema);