const { Thought, User } = require('../models');

module.exports = {
  // Get all thought
  getThoughts(req, res) {
    Thought.find()
    .then(async (thoughts) => {
      return res.json({
        thoughts,
        reactions: [thoughts.reactions]
      });
    })
      .catch((err) => res.status(500).json(err));
  },
  // Get a thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No Thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a thought
  createThought(req, res) {
    Thought.create(req.body)
    .then((thought) => res.json(thought))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });

  },

  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json({ message: 'Thoughts and User deleted!' })
      )
      .catch((err) => res.status(500).json(err));
  },
  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },


  addReaction(req, res) {
    Thought.findOneAndUpdate(
      {_id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
    )
    .then((thought) =>
      !thought
      ? res.status(404).json({ message: 'No thought with this id!'})
      : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },


  // Delete a reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: 'No thoughtfound with that ID :(' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
    
  }
};
