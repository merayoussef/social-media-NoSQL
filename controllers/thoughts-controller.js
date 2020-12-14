const { Thoughts, User } = require('../models');

const thoughtsController = {
    // add thoughts
    addThoughts({ params, body }, res) {
        Thoughts.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate({
                    _id: params.userId
                }, {
                    $push: {
                        thoughts: _id
                    }
                }, {
                    new: true
                });
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).
                    json({ message: 'No user found with this id! ' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
    // update a thought
    updateThought({ params }, res) {
        Thoughts.findOneAndUpdate({
                _id: params.thoughtsId
            }, { new: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                return User.findOneAndUpdate({ _id: params.thoughtsId }, {
                    $pull: {
                        thoughts: params.thoughtsId
                    }
                }, { new: true });
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({
                        message: 'No user found with this id!'
                    });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },
    // delete thought
    deleteThought({ params }, res) {
        Thoughts.findOneAndDelete({
                thoughts: params.thoughtsId
            }).then(dbUserData => {
                if (!dbUserData) {
                    return res.status(404).json({
                        message: 'No thought with this id!'
                    })
                }
                return User.findOneAndUpdate({ _id: params.userId }, {
                    $pull: {
                        thoughts: params.thoughtsId
                    }
                }, { new: true });
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({
                        message: 'No user found with this id!'
                    });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    }

};

module.exports = thoughtsController;