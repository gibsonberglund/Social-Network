const { Schema, model } = require('mongoose');
const userSchema = require('./User');

//reacion schema
const reactionSchema = new mongoose.Schema({
    reactionId: Schema.Types.ObjectId,
    reactionBody: {type: String, required: true, max_length: 280},
    username: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now,
      },
  });

// Schema to create thought model
const thoughtSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      unique: true,
      min_length: 1,
      max_length: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
    username: {
          type: String,
          required: true,
    },
    reactions: reactionSchema,
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);



const Thought = model('thought', thoughtSchema);

module.exports = Thought;
