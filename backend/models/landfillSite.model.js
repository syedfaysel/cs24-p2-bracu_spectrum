const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const land_fill_siteSchema = new Schema({
  siteName: {
    type: String,
    required: true,
    unique: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  operationalTimespan: {
    type: String, // "day, start, end"
    required: true,
  },
  // operationTimespan: [{
  //   day: {
  //     type: String,
  //     required: true,
  //   },
  //   startsAt: {
  //     type: String,
  //     required: true,
  //   },
  //   endsAt: {
  //     type: String,
  //     required: true,
  //   },
  // }],
  coordinates: {
    longtitude: {
      type: Number,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
  },
  managers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  trucks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Vehicle",
    },
  ],
});

module.exports = mongoose.model("LandFillSite", land_fill_siteSchema);



/*



*/