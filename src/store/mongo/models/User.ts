import mongoose, { Schema, model } from "mongoose";

export interface UserDocument {
    _id: string;
    email: string;
    name: string;
    tokens: number;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<UserDocument>({
    email: {
        type: String,
        unique: true,
        required: [ true, "Email is required" ],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Email is invalid",
        ],
    },
    name: {
        type: String,
    },
    tokens: {
        type: Number,
        required: [ true, "Tokens is required" ],
    },
},
{
    timestamps: true,
}
);

const User = mongoose.models?.User || model<UserDocument>('User', UserSchema);

export default User;
