const { Markup } = require("telegraf");

exports.group = async (ctx) => {
    ctx.reply("Guruh",
        Markup.inlineKeyboard(
          [
            Markup.button.url(
              "👉 Qo'shilish",
              "https://t.me/joinchat/RQvA2XcMUMJcJI3z"
            )
          ],
          { columns: 1 }
        )
    );
}
