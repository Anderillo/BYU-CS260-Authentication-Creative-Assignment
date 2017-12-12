var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var UserSchema = new Schema({
    username: { type: String, unique: true },
    email: String,
    age: Number,
    hashed_password: String,
    profile_picture: String
});
mongoose.model('User', UserSchema);
