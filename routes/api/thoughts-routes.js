const router = require('express').Router();

const { addThoughts, updateThought, deleteThought } = require('../../controllers/thoughts-controller');


router
    .route('/:userId')
    .post(addThoughts);

router
    .route('/:userId/:thoughtId')
    .put(addThoughts)
    .put(updateThought)
    .delete(deleteThought);

module.exports = router;