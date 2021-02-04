var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GenreSchema = new Schema(
  {
    name: {type: String, required: true, maxlength: 100},
    description: {type: String, required: true},
  }
);

//Virtual for URL
GenreSchema.virtual("url").get(function () {
  return "/genre/" + this._id;
});

//Export model
module.exports = mongoose.model('Genre', GenreSchema);