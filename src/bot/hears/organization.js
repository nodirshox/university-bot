const Organization = require("../../models/Organization");
const { GET_INFO, PAGE_LIMIT, NEXT_PAGE, ORDER_LIST } = require("../state");

exports.organization = async (ctx) => {
    const filter = {
        deleted_at: null,
        is_active: true
    };

    const options = {
        skip: 0,
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
            text: `${index + 1}. ${organizations[index].name}`,
            callback_data: JSON.stringify({
                action: GET_INFO,
                id: organizations[index].slug,
                page: 1
            })
        }]);
    }
    if (organizationCount > PAGE_LIMIT) {
        keyboard.push([
            {
                text: "▶️",
                callback_data: JSON.stringify({
                    action: NEXT_PAGE,
                    page: 2,
                }),
            }
        ]);
    }
    let message = "Universitetlar ro'yhati";
    if (organizationCount == 0) {
        message += ".\n\nHozircha universitetlar ro'yhati bo'sh."
    }

    await ctx.replyWithMarkdown(message, {
        reply_markup: {
            inline_keyboard: keyboard,
        },
        parse_mode: 'HTML',
    })

    // multi inline keyboard
    // return ctx.replyWithMarkdown("a",
    //     {
    //         reply_markup: {
    //             inline_keyboard: [
    //                 [{
    //                     text: 'Testni yakunlash',
    //                     callback_data: JSON.stringify({
    //                         action: "FINISH_TEST",
    //                         id: "testId",
    //                     }),
    //                 }],
    //                 [{
    //                     text: 'Testni yakunlash',
    //                     callback_data: JSON.stringify({
    //                         action: "FINISH_TEST",
    //                         id: "testId",
    //                     }),
    //                 }]
    //             ],
    //         }
    //     }
    // )
}
