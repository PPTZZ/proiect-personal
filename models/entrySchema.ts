import { models, model, Schema } from "mongoose";
import { TEntries } from "../lib/definitions";

const entriesSchema: Schema<TEntries> = new Schema({
  date: {
    type: Date,
    default: new Date("<YYYY-mm-dd>"),
  },
  productName: {
    type: String,
    required: true,
  },
  grams: {
    type: Number,
    default: 100,
  },
  kcal: {
    type: Number,
  },
  owner: {
    type: String,
    required: true,
  },
});

const Entry = models.Entry || model("Entry", entriesSchema);

export default Entry;
