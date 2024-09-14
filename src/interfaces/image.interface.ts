import {Schema, Document} from "mongoose";

export interface Image extends Document {
    title: string;
    image: string;
    user: Schema.Types.ObjectId; 
    isPrivate: boolean;
}