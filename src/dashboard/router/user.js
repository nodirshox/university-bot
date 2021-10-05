const User = require('../../models/User');

exports.userAPI = {
    find: async (req, res) => {
        const filter = {}
        const options = {
            sort: {
                created_at: -1
            }
        }
        const result = await User.find(filter, {}, options);
        res.render("./user/list", { result })
    }
}