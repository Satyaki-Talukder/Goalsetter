const express = require('express');
const router = express.Router();
const { getGoals, setGoal, updateGoal, deleteGoal } = require('../controllers/goalController');
const { protect } = require('../middleware/authMiddleware');


// All routes

// router.get('/', getGoals);
// router.post('/', setGoal);
//  The above two lines are same as the below line.
router.route('/').get(protect, getGoals).post(protect, setGoal);

// router.put('/:id',updateGoal);
// router.delete('/:id', deleteGoal);
//  The above two lines are same as the below line.
router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal);


// Export all routes
module.exports = router;