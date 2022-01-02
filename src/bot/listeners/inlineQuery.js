const Organization = require("../../models/Organization");

exports.inlineQuery = async (ctx) => {

    let filter = {};
    if (ctx.update.inline_query.query.length > 1) {
      filter = {
          $text: {$search: ctx.update.inline_query.query},
          is_active: true,
          deleted_at: null
        }
    }
    let options = {
      skip: 0,
      limit: 50,
      sort: { created_at: -1 }
    }

    let organizations = await Organization.find(filter, {}, options);
    let results = [];
    for (let index = 0; index < organizations.length; index++) {
      let organization = organizations[index];

      let phone = "";
      if (organization.phone.length > 0) {
          phone = `📞 ${organization.phone}\n`;
      }
      let website = "";
      if (organization.website.length > 0) {
          website = `🌐 <a href="${organization.website}">Websayt</a>\n`
      }
      let direction = "<i>Yo'nalishlar:</i>\n";
      for (let index = 0; index < organization.direction.length; index++) {
          direction += `${index + 1}. ${organization.direction[index].name}\n`;
      }

      let social = "<i>Ijtimoiy tarmoqlar:</i>\n";
      for (let index = 0; index < organization.social.length; index++) {
          social += ` - <a href="${organization.social[index].link}">${organization.social[index].name}</a>\n`
      }
      let message = `🎓 <b>${organization.name}</b>\n<a href="${organization.picture}">&#8205;</a>${organization.description}\n\n${direction}\n${website}${phone}${social}\n`;

      results.push({
          id: organization.slug,
          type: "article",
          title: organization.name,
          description: organization.description,
          thumb_url: organization.picture,
          input_message_content: {
            message_text: message,
            parse_mode: "HTML"
          },
          reply_markup: {
            inline_keyboard: [
              [{
                text: "👉 Botga ulanish",
                url: "https://t.me/uzbekistan_abt_bot"
              }]
            ]
          }
      })
    }
    ctx.answerInlineQuery(results);
}