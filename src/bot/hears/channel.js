const { Markup } = require("telegraf");

exports.channel = async (ctx) => {
    ctx.reply("Kanal: @uzbekistan_abt",
        Markup.inlineKeyboard(
          [
            Markup.button.url(
              "👉 Obuna bo'lish",
              "https://t.me/uzbekistan_abt"
            )
          ],
          { columns: 1 }
        )
    );
}
