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

    let organization = await Organization.find(filter, {}, options);
    let keyboard = [];
    for (let index = 0; index < organization.length; index++) {
        keyboard.push([{
            text: `${index + 1}. ${organization[index].name}`,
            callback_data: JSON.stringify({
                action: GET_INFO,
                id: organization[index]._id,
            }),
        }]);
    }
    keyboard.push([
        {
            text: "▶️",
            callback_data: JSON.stringify({
                action: NEXT_PAGE,
                page: 2,
            }),
        }
    ])
    return ctx.replyWithMarkdown("Universitetlar ro'yhati", {
        reply_markup: {
            inline_keyboard: keyboard,
        }
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
