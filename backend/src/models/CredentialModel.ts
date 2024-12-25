import mongoose from "mongoose";

const credentialSchema = new mongoose.Schema({
        username: String,
        password: String
    })
const credentialModel = mongoose.model("Login", credentialSchema);

export default credentialModel;