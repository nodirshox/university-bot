const { Markup } = require("telegraf");
const config = require('../../config');

exports.group = async (ctx) => {
    ctx.reply("Guruh",
        Markup.inlineKeyboard(
          [
            Markup.button.url(
              "👉 Qo'shilish",
              config.groupInviteLink
            )
          ],
          { columns: 1 }
        )
    );
}
