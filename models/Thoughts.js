const { Schema, model, Types } = require('mongoose');

const ThoughtSchema = new Schema({
    writtenBy: {
        type: String,
        required: true,
        trim: true
    },
    thoughtBody: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Thoughts = model('Thoughts', ThoughtSchema);

module.exports = Thoughts;