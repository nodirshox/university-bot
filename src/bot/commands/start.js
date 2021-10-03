const User = require("../../models/User");
const { menu } = require("../menu");

exports.start = async (ctx) => {
    let isUserExists = await User.findOne({telegram_id: ctx.update.message.from.id});

    if (isUserExists == null) {
        return ctx.reply(
            "Ro'yhatdan o'tish uchun telefon raqamingizni yuboring",
            {
                reply_markup: {
                    keyboard: [[
                        {
                            text: "📲 Yuborish",
                            request_contact: true
                        }
                    ]],
                    one_time_keyboard: true,
                    resize_keyboard: true
                }
            }
        )
    }

    ctx.reply("Siz allaqachon ro'yhatdan o'tgansiz");
    return ctx.reply(
        "Menu",
        {
            reply_markup: {
                keyboard: menu,
                resize_keyboard: true
            }
        }
    )
}
