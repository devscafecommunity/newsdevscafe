import { Client } from "@notionhq/client";
import {
  BlockObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { stat } from "fs";
import { cache } from "react";

export const notionClient = new Client({
  auth: process.env.NOTION_SECRET,
});

/*
{
  "object": "list",
  "results": [
    {
      "object": "page",
      "id": "1933ad47-35a0-4a43-bd07-8c5f04254c2d",
      "created_time": "2024-09-09T14:34:00.000Z",
      "last_edited_time": "2024-09-09T14:46:00.000Z",
      "created_by": {
        "object": "user",
        "id": "2439e043-c4de-4dac-8bca-225299af2a76"
      },
      "last_edited_by": {
        "object": "user",
        "id": "2439e043-c4de-4dac-8bca-225299af2a76"
      },
      "cover": null,
      "icon": null,
      "parent": {
        "type": "database_id",
        "database_id": "d397ee49-d3be-45b9-8eda-2fae1b56f00b"
      },
      "archived": false,
      "in_trash": false,
      "properties": {
        "Website": {
          "id": "%3C%5C%60s",
          "type": "url",
          "url": "https://devscafe.pt"
        },
        "Date": {
          "id": "Snut",
          "type": "date",
          "date": {
            "start": "2024-09-10",
            "end": null,
            "time_zone": null
          }
        },
        "Description": {
          "id": "bC%5EV",
          "type": "rich_text",
          "rich_text": [
            {
              "type": "text",
              "text": {
                "content": "Lorem Ipsum",
                "link": null
              },
              "annotations": {
                "bold": true,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": false,
                "color": "default"
              },
              "plain_text": "Lorem Ipsum",
              "href": null
            },
            {
              "type": "text",
              "text": {
                "content": " is simply dummy text of the printing and \ntypesetting industry. Lorem Ipsum has been the industry's standard dummy\n text ever since the 1500s, when an unknown printer took a galley of \ntype and scrambled it to make a type specimen book. It has survived not \nonly five centuries, but also the leap into electronic typesetting, \nremaining essentially unchanged. It was popularised in the 1960s with \nthe release of Letraset sheets containing Lorem Ipsum passages, and more\n recently with desktop publishing software like Aldus PageMaker \nincluding versions of Lorem Ipsum.\n\n",
                "link": null
              },
              "annotations": {
                "bold": false,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": false,
                "color": "default"
              },
              "plain_text": " is simply dummy text of the printing and \ntypesetting industry. Lorem Ipsum has been the industry's standard dummy\n text ever since the 1500s, when an unknown printer took a galley of \ntype and scrambled it to make a type specimen book. It has survived not \nonly five centuries, but also the leap into electronic typesetting, \nremaining essentially unchanged. It was popularised in the 1960s with \nthe release of Letraset sheets containing Lorem Ipsum passages, and more\n recently with desktop publishing software like Aldus PageMaker \nincluding versions of Lorem Ipsum.\n\n",
              "href": null
            }
          ]
        },
        "Tags": {
          "id": "dcyQ",
          "type": "multi_select",
          "multi_select": [
            {
              "id": "aa6aff44-1846-41b9-82a3-4bfd82122839",
              "name": "Test",
              "color": "gray"
            },
            {
              "id": "2db622ff-cba0-499b-8118-ee2b1ce5bf9d",
              "name": "Test2",
              "color": "brown"
            },
            {
              "id": "198aa060-516f-48a2-8ec6-37089a5898a8",
              "name": "Test3",
              "color": "green"
            },
            {
              "id": "6091ec07-ceb3-4fc4-9feb-bf72efbb4e5d",
              "name": "Test4",
              "color": "default"
            }
          ]
        },
        "Public": {
          "id": "fzp%3B",
          "type": "checkbox",
          "checkbox": true
        },
        "Location": {
          "id": "m%60Gb",
          "type": "rich_text",
          "rich_text": [
            {
              "type": "text",
              "text": {
                "content": "Virtual",
                "link": null
              },
              "annotations": {
                "bold": false,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": false,
                "color": "default"
              },
              "plain_text": "Virtual",
              "href": null
            }
          ]
        },
        "Organizer": {
          "id": "%7Dzck",
          "type": "people",
          "people": [
            {
              "object": "user",
              "id": "2439e043-c4de-4dac-8bca-225299af2a76",
              "name": "Pedro Kaleb De Je1",
              "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocKbcJ0_7ZFPqvQfRPCFhcmW3idKldcPxpZVGsTPwSfT3Yw4pM3s=s100",
              "type": "person",
              "person": {
                "email": "pedrokalebdej1@gmail.com"
              }
            }
          ]
        },
        "Equip": {
          "id": "~Kpv",
          "type": "multi_select",
          "multi_select": [
            {
              "id": "285b9c3b-1da0-4e80-9d08-0d71a07f5eeb",
              "name": "Pedro Jesus",
              "color": "gray"
            }
          ]
        },
        "Name": {
          "id": "title",
          "type": "title",
          "title": [
            {
              "type": "text",
              "text": {
                "content": "Test event",
                "link": null
              },
              "annotations": {
                "bold": false,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": false,
                "color": "default"
              },
              "plain_text": "Test event",
              "href": null
            }
          ]
        }
      },
      "url": "https://www.notion.so/Test-event-1933ad4735a04a43bd078c5f04254c2d",
      "public_url": null
    }
  ],
  "next_cursor": null,
  "has_more": false,
  "type": "page_or_database",
  "page_or_database": {},
  "request_id": "353ff10d-45e1-4ca4-b9f1-7055215bf407"
}
*/

interface Event {
    id: string;
    name: string;
    description: string;
    date: string;
    location: string;
    tags: string[];
    public: boolean;
    organizer: string;
    equip: string[];
    url: string;
    created_time: string;
    status: string;
    banner: string;
    last_edited_time: string;
    public_url: string;
}

// EVENTS_DATABASE_ID
export const getEvents = async () => {
    return notionClient.databases.query({
        filter: {
        property: "Public",
            checkbox: {
                equals: true,
            },
        },
        database_id: process.env.EVENTS_DATABASE_ID!,
    });
};


export const getTotalEventCount = async () => {
    let events = notionClient.databases.query({
        filter: {
            property: "Public",
            checkbox: {
                equals: true,
            },
        },
        database_id: process.env.EVENTS_DATABASE_ID!,
    });

    return events.then((res) => res.results.length);
}

/*
{
  "object": "list",
  "results": [
    {
      "object": "page",
      "id": "1933ad47-35a0-4a43-bd07-8c5f04254c2d",
      "created_time": "2024-09-09T14:34:00.000Z",
      "last_edited_time": "2024-09-10T09:12:00.000Z",
      "created_by": {
        "object": "user",
        "id": "2439e043-c4de-4dac-8bca-225299af2a76"
      },
      "last_edited_by": {
        "object": "user",
        "id": "2439e043-c4de-4dac-8bca-225299af2a76"
      },
      "cover": null,
      "icon": null,
      "parent": {
        "type": "database_id",
        "database_id": "d397ee49-d3be-45b9-8eda-2fae1b56f00b"
      },
      "archived": false,
      "in_trash": false,
      "properties": {
        "Website": {
          "id": "%3C%5C%60s",
          "type": "url",
          "url": "https://devscafe.pt"
        },
        "Date": {
          "id": "Snut",
          "type": "date",
          "date": {
            "start": "2024-09-30",
            "end": null,
            "time_zone": null
          }
        },
        "Status": {
          "id": "_Ppi",
          "type": "status",
          "status": {
            "id": "103d4a75-b86c-46e4-96b9-8d8db21bb5d0",
            "name": "In progress",
            "color": "blue"
          }
        },
        "Description": {
          "id": "bC%5EV",
          "type": "rich_text",
          "rich_text": [
            {
              "type": "text",
              "text": {
                "content": "Lorem ipsun is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy\n text ever since the 1500s, when an unknown printer took a galley of \ntype and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, \nremaining essentially unchanged. It was popularised in the 1960s with \nthe release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n\n",
                "link": null
              },
              "annotations": {
                "bold": false,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": false,
                "color": "default"
              },
              "plain_text": "Lorem ipsun is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy\n text ever since the 1500s, when an unknown printer took a galley of \ntype and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, \nremaining essentially unchanged. It was popularised in the 1960s with \nthe release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n\n",
              "href": null
            }
          ]
        },
        "Tags": {
          "id": "dcyQ",
          "type": "multi_select",
          "multi_select": [
            {
              "id": "aa6aff44-1846-41b9-82a3-4bfd82122839",
              "name": "Test",
              "color": "gray"
            },
            {
              "id": "2db622ff-cba0-499b-8118-ee2b1ce5bf9d",
              "name": "Test2",
              "color": "brown"
            },
            {
              "id": "198aa060-516f-48a2-8ec6-37089a5898a8",
              "name": "Test3",
              "color": "green"
            },
            {
              "id": "6091ec07-ceb3-4fc4-9feb-bf72efbb4e5d",
              "name": "Test4",
              "color": "default"
            }
          ]
        },
        "Public": {
          "id": "fzp%3B",
          "type": "checkbox",
          "checkbox": true
        },
        "Location": {
          "id": "m%60Gb",
          "type": "rich_text",
          "rich_text": [
            {
              "type": "text",
              "text": {
                "content": "Virtual",
                "link": null
              },
              "annotations": {
                "bold": false,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": false,
                "color": "default"
              },
              "plain_text": "Virtual",
              "href": null
            }
          ]
        },
        "Banner": {
          "id": "qfkH",
          "type": "files",
          "files": [
            {
              "name": "https://i.imgur.com/UxNDPFP.png",
              "type": "external",
              "external": {
                "url": "https://i.imgur.com/UxNDPFP.png"
              }
            }
          ]
        },
        "Organizer": {
          "id": "%7Dzck",
          "type": "people",
          "people": [
            {
              "object": "user",
              "id": "2439e043-c4de-4dac-8bca-225299af2a76",
              "name": "Pedro Kaleb De Je1",
              "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocKbcJ0_7ZFPqvQfRPCFhcmW3idKldcPxpZVGsTPwSfT3Yw4pM3s=s100",
              "type": "person",
              "person": {
                "email": "pedrokalebdej1@gmail.com"
              }
            }
          ]
        },
        "Equip": {
          "id": "~Kpv",
          "type": "multi_select",
          "multi_select": [
            {
              "id": "285b9c3b-1da0-4e80-9d08-0d71a07f5eeb",
              "name": "Pedro Jesus",
              "color": "gray"
            }
          ]
        },
        "Name": {
          "id": "title",
          "type": "title",
          "title": [
            {
              "type": "text",
              "text": {
                "content": "Test event",
                "link": null
              },
              "annotations": {
                "bold": false,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": false,
                "color": "default"
              },
              "plain_text": "Test event",
              "href": null
            }
          ]
        }
      },
      "url": "https://www.notion.so/Test-event-1933ad4735a04a43bd078c5f04254c2d",
      "public_url": null
    }
  ],
  "next_cursor": null,
  "has_more": false,
  "type": "page_or_database",
  "page_or_database": {},
  "request_id": "f630ff45-aa5a-4f2b-8927-36fb8175849c"
}
*/

export const getEventsSimplified = async () => {
    let events = await getEvents();

    let simplifiedEvents = events.results.map((event: any) => {
        return {
            id: event.id,
            name: event.properties.Name.title[0].text.content,
            description: event.properties.Description.rich_text[0].text.content,
            date: event.properties.Date.date.start,
            location: event.properties.Location.rich_text[0].text.content,
            tags: event.properties.Tags.multi_select.map((tag: any) => tag.name),
            public: event.properties.Public.checkbox,
            organizer: event.properties.Organizer.people[0].name,
            equip: event.properties.Equip.multi_select.map((equip: any) => equip.name),
            created_time: event.created_time,
            last_edited_time: event.last_edited_time,
            status: event.properties.Status.status.name,
            banner: event.properties.Banner.files[0].external.url || event.properties.Banner.files[0].file.url,
            url: event.url,
        };
    });

    return simplifiedEvents;
}

export const getEventsSimplifiedByDateRecent = async () => {
    let events = await getEvents();
  console.log(JSON.stringify(events));  
    let simplifiedEvents = events.results.map((event: any) => {
        return {
            id: event.id,
            name: event.properties.Name.title[0].text.content,
            description: event.properties.Description.rich_text[0].text.content,
            date: event.properties.Date.date.start,
            location: event.properties.Location.rich_text[0].text.content,
            tags: event.properties.Tags.multi_select.map((tag: any) => tag.name),
            public: event.properties.Public.checkbox,
            organizer: event.properties.Organizer.people[0].name,
            equip: event.properties.Equip.multi_select.map((equip: any) => equip.name),
            created_time: event.created_time,
            last_edited_time: event.last_edited_time,
            status: event.properties.Status.status.name,
            banner: event.properties.Banner.files[0].external.url || event.properties.Banner.files[0].file.url,
            url: event.url,
        };
    });

    simplifiedEvents.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return simplifiedEvents;
}