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
	Organization.create(req.body, (err, result) => {
		if (err) {
			return res.send('Xatolik yuz berdi.', err.message);
		}
		return res.redirect('/organization');
	});
});

router.get('/organization/:id', function (req, res) {
	Organization.findOne({ _id: req.params.id }).exec(function (err, organization) {
		if (err) {
			return res.send('Xatolik yuz berdi')
		}
		return res.render("./organization/get", { organization })
	})
})

// Error handler
router.get('*', function (req, res) {
	res.render('404');
});

module.exports = router;