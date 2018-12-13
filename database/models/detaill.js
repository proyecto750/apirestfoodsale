const mongoose = require("../connect");
var mon = require('mongoose');
var Schema = mon.Schema;
var detailSchema = new Schema({
  idmenu:  {
      type: Schema.Types.ObjectId,
      ref: "Menufood"
  },
  idorden:  {
      type: Schema.Types.ObjectId,
      ref: "Orden"
  },
  cantidad: Number
});
var details = mongoose.model("Detail", detailSchema);
module.exports = details;
