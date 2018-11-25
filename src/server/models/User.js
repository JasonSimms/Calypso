const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    _id: Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    profilePicture: {
        type: String,
        default:
            'https://upload.wikimedia.org/wikipedia/commons/9/93/Default_profile_picture_%28male%29_on_Facebook.jpg',
    },
    projects: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Project'}]
    }
})

module.exports = mongoose.model('User', userSchema)

/*
Populate is a better tool for this since you are creating a many to many relationship between posts and categories. Subdocuments are appropriate when they belong exclusively to the parent object. You will need to change your postSchema to use a reference:

var postSchema = mongoose.Schema({
  title: String,
  description: String,
  category: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  created_time: Number,
});

You can add categories by pushing documents onto the array:

post.category.push(category1);
post.save(callback);

Then rehydrate them during query using populate:

Post.findOne({ title: 'Test' })
.populate('category') 
.exec(function (err, post) {
   if (err) return handleError(err);
   console.log(post.category); 
});
*/