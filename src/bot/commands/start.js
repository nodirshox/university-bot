exports.start = async (ctx) => {
    ctx.reply(
        "Ro'yhatdan o'tish uchun telefon raqamingizni yuboring",
        {
            reply_markup: {
                keyboard: [[
                    {
                        text: '📲 Send phone number',
                        request_contact: true
                    }
                ]],
                one_time_keyboard: true,
                resize_keyboard: true
            }
        }
    )
}
