const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    //updateUser,
    deleteUser,
    addFriend,
    removeFriend,
  } = require('../../controllers/userController.js');

// /api/courses
router.route('/').get(getUsers).post(createUser);

router
  .route('/:userId')
  .get(getSingleUser)
  //.put(updateUser)
  .delete(deleteUser);

//Save for later, when the rest is working
router
  .route('/:userId/friends')
  .post(addFriend)
  .delete(removeFriend);

module.exports = router;