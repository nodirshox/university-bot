const User = require("../../models/User");

exports.contact = async (ctx) => {
    let checkingUser = await User.findOne({telegram_id: ctx.update.message.from.id});

    if (checkingUser == null) {
        let result = await User.create({
            first_name: ctx.update.message.from.first_name,
            last_name: ctx.update.message.from.last_name,
            telegram_id: ctx.update.message.from.id,
            phone_number: ctx.update.message.contact.phone_number
        });
    }
    
    ctx.reply("Ro'yhatdan o'tdingiz.");
}
