const { Schema, model, Types } = require('mongoose');

const ThoughtSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    thoughtText: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Thoughts = model('Thoughts', ThoughtSchema);

module.exports = Thoughts;