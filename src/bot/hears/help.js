const { Markup } = require("telegraf");
const User = require("../../models/User");

exports.help = async (ctx) => {
    const userCount = await User.countDocuments({});

    await ctx.reply(`Hozirda botda ${userCount} ta foydalanuvchi bor. Siz foydalanuvchilar reklama yuborishni istaysizmi?`,
        Markup.inlineKeyboard(
          [
            Markup.button.url(
              "👉 Aloqaga chiqish",
              "https://t.me/nodirbek_contact_bot"
            )
          ],
          { columns: 1 }
        )
    );
}
