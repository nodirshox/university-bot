const Organization = require('../../models/Organization');
const User = require('../../models/User');

exports.pagesAPI = {
    home: async (req, res) => {
        const userCount = await User.countDocuments({is_active: true, deleted_at: null});
        const organizationCount = await Organization.countDocuments({deleted_at: null, is_active: true});

        res.render("home", { userCount, organizationCount });
    }
}