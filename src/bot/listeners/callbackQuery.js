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
            let message = "Universitet topilmadi";
            if (organization != null) {
                message = `🎓 <b>${organization.name}</b>\n${organization.description}\n📞 ${organization.phone}\n🌐 ${organization.website}\n-------<a href="${organization.picture}">&#8205;</a>`;
            }
            
            await ctx.telegram.deleteMessage(ctx.chat.id, ctx.callbackQuery.message.message_id);

            await ctx.replyWithMarkdown(message, {
                reply_markup: {
                    inline_keyboard: [[{
                        text: 'Ortga',
                        callback_data: JSON.stringify({
                            action: NEXT_PAGE,
                            page: data.page,
                        }),
                }]]},
                parse_mode: 'HTML',
            });
            // await ctx.telegram.editMessageText(ctx.update.callback_query.from.id, ctx.update.callback_query.message.message_id, ctx.update.update_id, message, {
            //     reply_markup: {
            //         inline_keyboard: [[{
            //             text: 'Ortga',
            //             callback_data: JSON.stringify({
            //                 action: NEXT_PAGE,
            //                 page: data.page,
            //             }),
            //     }]]},
            //     parse_mode: 'HTML',
            // });

            break;
        }
    }
}