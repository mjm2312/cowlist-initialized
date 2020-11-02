var controller = require('./controllers');
var router = require('express').Router();

//Connect controller methods to their corresponding routes
router.get('/cows', controller.cows.get);
router.post('/cows', controller.cows.post);
//router.post('/messages', controller.messages.post);

//router.get('/users', controller.users.get);

//router.post('/users', controller.users.post);


module.exports = router;

