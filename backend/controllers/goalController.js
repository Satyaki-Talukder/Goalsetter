// express-async-handler is an express package to handle errors
const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel');
const User = require('../models/userModel');




// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id });

    res.status(200).json(goals);
});






// @desc    Set goals
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res) => {
    if(!req.body.text) {
        res.status(400);
        throw new Error('Please add a text field');
    }

    const goal = await Goal.create({
        user: req.user.id,
        text: req.body.text
    });
    
    res.status(200).json(goal);
});






// @desc    Update goals
// @route   PUT /api/goals/id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if(!goal) {
        res.status(400);
        throw new Error('Goal not found');
    }

    // Check if the goal is of the current logged in user
    const user = await User.findById(req.user.id);

    // Check for user
    if(!user) {
        res.status(401);
        throw new Error('User not found');
    }

    // Make sure logged in user matches the goal user
    if(goal.user.toString() != user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json(updatedGoal);
});






// @desc    Delete goals
// @route   DELETE /api/goals/id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if(!goal) {
        res.status(400);
        throw new Error('Goal not found');
    }

    // Check if the goal is of the current logged in user
    const user = await User.findById(req.user.id);
    
    // Check for user
    if(!user) {
        res.status(401);
        throw new Error('User not found');
    }

    // Make sure logged in user matches the goal user
    if(goal.user.toString() != user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    await goal.remove()

    res.status(200).json({ id: req.params.id });
});






// Export all controllers
module.exports = { getGoals, setGoal, updateGoal, deleteGoal };