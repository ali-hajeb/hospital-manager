import mongoose, { model, Schema } from "mongoose";
import { INewLocation } from "./location.types";

const locationSchema = new Schema<INewLocation>({
    name: {
        type: String,
        require: true,
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
});

const Location = (mongoose.models && mongoose.models.Locations) || model("Locations", locationSchema);

export default Location;
