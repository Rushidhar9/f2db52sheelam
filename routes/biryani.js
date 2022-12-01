var express = require('express');
const biryani_controlers = require('../controllers/biryani');
var router = express.Router();

// A little function to check if we have an authorized user and continue on or
// redirect to login.
const secured = (req, res, next) => {
if (req.user){
return next();
}
req.session.returnTo = req.originalUrl;
res.redirect("/login");
}

/* GET costumes */
router.get('/', biryani_controlers.biryani_view_all_Page );

/* GET detail biryani page */
router.get('/detail', biryani_controlers.biryani_view_one_Page);

router.get('/create', biryani_controlers.biryani_create_Page);

router.get('/update',secured, biryani_controlers.biryani_update_Page);

router.get('/delete', biryani_controlers.biryani_delete_Page);

module.exports = router;