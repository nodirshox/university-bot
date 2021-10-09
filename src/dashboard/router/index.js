const express = require('express');
const router = express.Router();
const { pagesAPI } = require('./pages');
const { organizationAPI } = require('./organization');
const { userAPI } = require('./user');

// Home page
router.get("/", pagesAPI.home);

// Organization
router.get("/organization/create", organizationAPI.create);
router.post('/organization', organizationAPI.created);
router.get("/organization", organizationAPI.find);
router.get('/organization/:id', organizationAPI.get);
router.get('/organization/:id/edit', organizationAPI.edit);
router.post('/organization/:id/edit', organizationAPI.edited);
router.get('/organization/:id/delete', organizationAPI.delete);
router.post('/organization/:id/delete', organizationAPI.deleted);

// User
router.get('/user', userAPI.find);

// Health check
router.get('/health-check', (req, res) => {
	res.json({ message: "OK" });
})

// Error handler
router.get('*', function(req, res) {  
	res.render('404');
});

module.exports = router;
