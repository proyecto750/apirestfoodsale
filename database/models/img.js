const mongoose = require("../connect");
var mon = require('mongoose');
 var Schema = mon.Schema;
var imgSchema = new Schema({
  name : String,
  idhome:  {
      type: Schema.Types.ObjectId,
      ref: "Restaurant"
  },
  physicalpath : String,
  relativepath : String
});
var img = mongoose.model("img", imgSchema);
module.exports = img;
