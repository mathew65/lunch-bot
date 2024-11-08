import { FuseResult } from "fuse.js";
import { Restaurant, MenuItem } from "./types";
import type { AnyBlock, RichTextSection, View } from '@slack/types';
import { SayArguments } from "@slack/bolt";

const getSearchResults = (results: FuseResult<Restaurant>[] | null) => {
    if (!results || results && results?.length === 0) return;
    return {
        text: `Hi, here are the results:`,
        blocks: [{
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": `Hi, here are the results:`
            },
        }, ...results.map((resultItem) => getRestaurantResultsBlock(resultItem)).flat()
        ]
    }
}

const getRestaurantResultsBlock = (restaurantResult: FuseResult<Restaurant>) => {
    return [
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": `V *${restaurantResult.item.name}* mají:\n ${restaurantResult.matches?.filter((i) => i.key === "menu.jidlo").map((match) => `${match.value}\n`)}`
            }
        },
        {
            "type": "actions",
            "elements": [
                {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "Full menu",
                        "emoji": true
                    },
                    "value": restaurantResult.item.id,
                    "action_id": "open_menu_action_id"
                }
            ]
        },
    ].flat();
}
const getRestaurantMenu = (resturant: Restaurant) => {
    return {
        blocks: [
            {
                type: "rich_text",
                elements: [
                    {
                        "type": "rich_text_section",
                        "elements": [
                            {
                                "type": "text",
                                "text": `V `,
                            },
                            {
                                "type": "text",
                                "text": ` ${resturant?.name} `,
                                "style": {
                                    "bold": true
                                }
                            },
                            {
                                "type": "text",
                                "text": ` mají:`,
                            },
                        ]
                    },
                    {
                        "type": "rich_text_list",
                        "style": "bullet",
                        "indent": 0,
                        "border": 0,
                        "elements": resturant.menu.map((item) => getMenuBlock(item))
                    }
                ]
            }
        ] as AnyBlock[]
    }
}

const getMenuBlock = (item: MenuItem): RichTextSection => {
    return {
        "type": "rich_text_section",
        "elements": [
            {
                "type": "text",
                "text": `${item.jidlo}`,
                "style": {
                    "bold": true
                }
            },
            {
                "type": "text",
                "text": " za ",
            },
            {
                "type": "text",
                "text": `${item.cena}`,
                "style": {
                    "bold": true
                }
            }
        ]
    }
}

const getModalView = (restaurantWithFullMenu: Restaurant): View => {
    return {
        "type": "modal",
        "title": {
            "type": "plain_text",
            "text": `${restaurantWithFullMenu.name.substring(0, 25) ?? ''}`
        },
        "blocks": [
            {
                type: "rich_text",
                elements: [
                    {
                        "type": "rich_text_list",
                        "style": "bullet",
                        "indent": 0,
                        "border": 0,
                        "elements": restaurantWithFullMenu.menu.map((item) => getMenuBlock(item))
                    }
                ]
            }
        ] as AnyBlock[]
    }
}

export { getSearchResults, getModalView, getRestaurantMenu };