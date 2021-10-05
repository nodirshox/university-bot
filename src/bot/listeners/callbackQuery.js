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
        
            let organization = await Organization.find(filter, {}, options);
            
            let keyboard = [];
            for (let index = 0; index < organization.length; index++) {
                keyboard.push([{
                    text: `${index + 1 + skipValue}. ${organization[index].name}`,
                    callback_data: JSON.stringify({
                        action: GET_INFO,
                        id: organization[index]._id,
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

            if (organization.length == PAGE_LIMIT) {
                keyboard[keyboard.length - 1].push({
                    text: "▶️",
                    callback_data: JSON.stringify({
                        action: NEXT_PAGE,
                        page: data.page + 1,
                    })
                })
            }

            return ctx.editMessageReplyMarkup({
                inline_keyboard: keyboard
            })
        }
    }
}