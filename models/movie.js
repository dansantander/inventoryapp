var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MovieSchema = new Schema(
  {
    title: {type: String, required: true, maxlength: 100},
    genre: [{type: Schema.Types.ObjectId, ref: 'Genre'}],
    description: {type: String, required: true},
    price: {type: Number, required: true},
    inStock: {type: Number, required: true},
  }
);

//Virtual for URL
MovieSchema.virtual('url').get(function () {
  return '/catalog/movie/' + this._id;
});

//Export model
module.exports = mongoose.model('Movie', MovieSchema);