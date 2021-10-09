const Organization = require("../../models/Organization");
const { NEXT_PAGE, PAGE_LIMIT, GET_INFO, ORDER_LIST } = require("../state");

exports.callbackQuery = async (ctx) => {
    const data = JSON.parse(ctx.callbackQuery.data);
    
    switch (data.action) {
        case NEXT_PAGE: {
            const filter = {
                deleted_at: null,
                is_active: true
            };

            let skipValue = (data.page - 1) * PAGE_LIMIT;
            if (data.page == 1) {
                skipValue = 0;
            }

            const options = {
                skip: skipValue,
                limit: PAGE_LIMIT,
                sort: {
                    created_at: ORDER_LIST
                }
            }
        
            let organizations = await Organization.find(filter, {}, options);
            let organizationCount = await Organization.countDocuments(filter);

            let keyboard = [];
            for (let index = 0; index < organizations.length; index++) {
                keyboard.push([{
                    text: `${index + 1 + skipValue}. ${organizations[index].name}`,
                    callback_data: JSON.stringify({
                        action: GET_INFO,
                        id: organizations[index].slug,
                        page: data.page
                    }),
                }]);
            }

            if (data.page != 1) {
                keyboard.push([
                    {
                        text: "◀️",
                        callback_data: JSON.stringify({
                            action: NEXT_PAGE,
                            page: data.page - 1,
                        })
                    }
                ])    
            } else {
                keyboard.push([]);
            }

            if (organizationCount > data.page * PAGE_LIMIT) {
                keyboard[keyboard.length - 1].push({
                    text: "▶️",
                    callback_data: JSON.stringify({
                        action: NEXT_PAGE,
                        page: data.page + 1,
                    })
                })
            }
            let message = "Universitetlar ro'yhati";
            if (organizationCount == 0) {
                message += ".\n\nHozircha universitetlar ro'yhati bo'sh."
            }
            await ctx.telegram.deleteMessage(ctx.chat.id, ctx.callbackQuery.message.message_id);
            
            await ctx.replyWithMarkdown(message, {
                reply_markup: {
                    inline_keyboard: keyboard
                },
                parse_mode: 'HTML',
            });

            break;
        }
        case GET_INFO: {
            const query = {
                slug: data.id,
                deleted_at: null,
                is_active: true
            }
            const organization = await Organization.findOne(query);

            let keyboard = [[{
                text: 'Ortga',
                callback_data: JSON.stringify({
                    action: NEXT_PAGE,
                    page: data.page,
                }),
            }]];
            let message = "Universitet topilmadi";
            if (organization != null) {
                keyboard.unshift([{
                    text: '👉 Do\'stlar bilan ulashish',
                    switch_inline_query: organization.name
                }]);
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
                message = `🎓 <b>${organization.name}</b>\n<a href="${organization.picture}">&#8205;</a>${organization.description}\n\n${direction}\n${website}${phone}${social}\n`;
            }
            
            await ctx.telegram.deleteMessage(ctx.chat.id, ctx.callbackQuery.message.message_id);

            await ctx.replyWithMarkdown(message, {
                reply_markup: {
                    inline_keyboard: keyboard
                },
                parse_mode: 'HTML',
            });

            break;
        }
    }
}