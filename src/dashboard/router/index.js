const express = require('express');
const router = express.Router();
const { organizationAPI } = require('./organization');
const { userAPI } = require('./user');

// Home page
router.get("/", async (req, res) => {
	res.render("home");
});

// Organization
router.get("/organization/create", organizationAPI.create);
router.post('/organization', organizationAPI.created);
router.get("/organization", organizationAPI.find);
router.get('/organization/:id', organizationAPI.get);
router.get('/organization/:id/edit', organizationAPI.edit);
router.get('/organization/:id/delete', organizationAPI.delete);
router.post('/organization/:id/delete', organizationAPI.deleted);

// User
router.get('/user', userAPI.find);

module.exports = router;
