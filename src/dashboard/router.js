const express = require('express');
const router = express.Router();
const Organization = require("../models/Organization");

// Home page
router.get("/", async (req, res) => {
	res.render("home");
});

// Organization
router.get("/organization", async (req, res) => {
	Organization.find({}).exec(function (err, result) {
		res.render("./organization/list", { result })
	});
});

router.get("/organization/create", (req, res) => {
	res.render("./organization/create");
});

router.post('/organization', function (req, res) {
	let newOrganization = {
		...req.body,
		created_at: new Date()
	}
	if (newOrganization.is_active == 'on') {
		newOrganization.is_active = true;
	}
	Organization.create(newOrganization, (err, result) => {
		if(err) {
			return res.send({'message': JSON.stringify(err.message)});
		}
		return res.redirect('/organization');
	});
});

router.get('/organization/:id', function (req, res) {
	Organization.findOne({ _id: req.params.id }).exec(function (err, organization) {
		if (err) {
			return res.send({'message': JSON.stringify(err.message)});
		}
		return res.render("./organization/get", { organization })
	})
})

// Error handler
router.get('*', function (req, res) {
	res.render('404');
});

module.exports = router;