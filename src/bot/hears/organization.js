const Organization = require("../../models/Organization");

exports.organization = async (ctx) => {
    const filter = {
        deleted_at: null,
        is_active: true
    };

    const options = {
        skip: 0,
        limit: 5,
        sort: {
            created_at: -1
        }
    }

    let organization = await Organization.find(filter, {}, options);
    console.log(organization);
    
    return ctx.reply("Ro'yhatdan o'tdingiz." + organization);
}
