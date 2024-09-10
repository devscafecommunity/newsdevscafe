
import Author from "@/pages/blog/authors/[nickname]";
import { Client } from "@notionhq/client";
import {
  BlockObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { cache } from "react";

export const notionClient = new Client({
  auth: process.env.NOTION_SECRET,
});


/*
*/
export interface SimplifiedPost {
  id: string;
  title: string;
  description: string;
  cover: string;
  slug?: string;
  tags: string[];
  created_time: string;
  last_edited_time: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    banner: string;
    email: string;
  };
  content: BlockObjectResponse[];
  contentstring: string;
}

//
export const getPages = async () => {
  return notionClient.databases.query({
    filter: {
      property: "Public",
      checkbox: {
        equals: true,
      },
    },
    database_id: process.env.POSTS_DATABASE_ID!,
  });
};

export const getTotalPostCount = async () => {
  let pages = notionClient.databases.query({
    filter: {
      property: "Public",
      checkbox: {
        equals: true,
      },
    },
    database_id: process.env.POSTS_DATABASE_ID!,
  });

  return pages.then((res) => res.results.length);
}

export const getPostBySlug = async (slug: string) => {
  return notionClient.databases.query({
    filter: {
      property: "slug",
      rich_text: {
        equals: slug,
      },
    },
    database_id: process.env.POSTS_DATABASE_ID!,
  });
}

export const getPostIdBySlug = async (slug: string) => {
  return notionClient.databases.query({
    filter: {
      property: "slug",
      rich_text: {
        equals: slug,
      },
    },
    database_id: process.env.POSTS_DATABASE_ID!,
  }).then((res) => res.results[0].id);
};

export const getPostContent = async (pageId: string) => {
  return notionClient.blocks.children
    .list({ block_id: pageId })
    .then((res) => res.results as BlockObjectResponse[]);
};

export const getPostDataSimplifiedBySlug = async (slug: string) => {
  const data = notionClient.databases.query({
    filter: {
      property: "slug",
      rich_text: {
        equals: slug,
      },
    },
    database_id: process.env.POSTS_DATABASE_ID!,
  }) as Promise<any>;

  const page = new Promise<SimplifiedPost>((resolve, reject) => {
    data.then((res) => {
      const page = res.results[0] as PageObjectResponse;
      const properties = page.properties as any;

      const cover = properties.Cover.files[0].external.url || properties.Cover.files[0].file.url;

      const simplifiedPost: SimplifiedPost = {
        id: page.id,
        title: properties.Title.title[0].plain_text,
        description: properties.Description.rich_text[0].plain_text,
        cover,
        slug: properties.slug.rich_text[0].plain_text,
        tags: properties.Tags.multi_select.map((tag: any) => tag.name),
        created_time: page.created_time,
        last_edited_time: page.last_edited_time,
        author: {
          id: properties.Author.people[0].id,
          name: properties.Author.people[0].name,
          avatar: "",
          banner: "",
          email: properties.Author.people[0].person.email,
        },
        content: [],
        contentstring: "",
      };

      resolve(simplifiedPost);
    });
  });

  return page;
};

export const getPostDataSimplified = async () => {
  const data = notionClient.databases.query({
    filter: {
      property: "Public",
      checkbox: {
        equals: true,
      },
    },
    database_id: process.env.POSTS_DATABASE_ID!,
  }) as Promise<any>;

  const simplifiedPost = new Promise<SimplifiedPost[]>((resolve, reject) => {
    data.then((res) => {
      const pages = res.results as PageObjectResponse[];

      const simplifiedPosts = pages.map((page) => {
        const properties = page.properties as any;

        const cover = properties.Cover.files[0].external.url || properties.Cover.files[0].file.url;

        const simplifiedPost: SimplifiedPost = {
          id: page.id,
          title: properties.Title.title[0].plain_text,
          description: properties.Description.rich_text[0].plain_text,
          cover,
          slug: properties.slug.rich_text[0].plain_text,
          tags: properties.Tags.multi_select.map((tag: any) => tag.name),
          created_time: page.created_time,
          last_edited_time: page.last_edited_time,
          author: {
            id: properties.Author.people[0].id,
            name: properties.Author.people[0].name,
            avatar: "",
            banner: "",
            email: properties.Author.people[0].person.email,
          },
          content: [],
          contentstring: "",
        };

        return simplifiedPost;
      });

      resolve(simplifiedPosts);
    });
  });

  return simplifiedPost;
};

interface Author {
  id: string;
  name: string;
  bio: string;
  social: {
    website: string;
    github: string;
    twitter: string;
    instagram: string;
    linkedin: string;
  };
  avatar: string;
  banner: string;
  nickname: string;
}

export const getAuthors = async () => {
  return notionClient.databases.query({
    database_id: process.env.AUTHORS_DATABASE_ID!,
  });
};

export const getAuthorById = async (id: string) => {
  return notionClient.pages.retrieve({ page_id: id });
};

export const getAuthorByNickname = async (nickname: string) => {
  return notionClient.databases.query({
    filter: {
      property: "Nickname",
      title: {
        equals: nickname,
      },
    },
    database_id: process.env.AUTHORS_DATABASE_ID!,
  });
};

export const getAuthorByEmail = async (email: string) => {
  return notionClient.databases.query({
    filter: {
      property: "Person",
      people: {
        contains: email,
      },
    },
    database_id: process.env.AUTHORS_DATABASE_ID!,
  });
}

export const getAuthorPosts = async (nickname: string) => {
  let author = await notionClient.databases.query({
    filter: {
      property: "Nickname",
      title: {
        equals: nickname,
      },
    },
    database_id: process.env.AUTHORS_DATABASE_ID!,
  }) as any;
  let authorId = author.results[0].properties.Person.people[0].id;

  let posts = await notionClient.databases.query({
    filter: {
      and: [
        {
          property: "Author",
          people: {
            contains: authorId,
          },
        },
        {
          property: "Public",
          checkbox: {
            equals: true,
          },
        },
      ],
    },
    database_id: process.env.POSTS_DATABASE_ID!,
  });

  return posts.results.map((page: any) => {
    const properties = page.properties as any;
    const cover = properties.Cover.files[0].external.url || properties.Cover.files[0].file.url;
    const simplifiedPost: SimplifiedPost = {
      id: page.id,
      title: properties.Title.title[0].plain_text,
      description: properties.Description.rich_text[0].plain_text,
      cover,
      slug: properties.slug.rich_text[0].plain_text,
      tags: properties.Tags.multi_select.map((tag: any) => tag.name),
      created_time: page.created_time,
      last_edited_time: page.last_edited_time,
      author: {
        id: properties.Author.people[0].id,
        name: properties.Author.people[0].name,
        avatar: "",
        banner: "",
        email: properties.Author.people[0].person.email,
      },
      content: [],
      contentstring: "",
    };
    return simplifiedPost;
  });
}

export const getAuthorData = async (nickname: string) => {
  return await notionClient.databases.query({
    filter: {
      property: "Nickname",
      title: {
        equals: nickname,
      },
    },
    database_id: process.env.AUTHORS_DATABASE_ID!,
  }) as any;
}

export const getAuthorDataSimplifyedByNickname = async (nickname: string) => {
  let authorraw = await notionClient.databases.query({
    filter: {
      property: "Nickname",
      title: {
        equals: nickname,
      },
    },
    database_id: process.env.AUTHORS_DATABASE_ID!,
  }) as any;  

  let author = {
    id: authorraw.results[0].id,
    name: authorraw.results[0].properties.Name.rich_text[0].plain_text,
    bio: authorraw.results[0].properties.Bio.rich_text[0].plain_text,
    avatar: authorraw.results[0].properties.Avatar.files[0].external.url || authorraw.results[0].properties.Avatar.files[0].file.url,
    banner: authorraw.results[0].properties.Banner.files[0].external.url || authorraw.results[0].properties.Banner.files[0].file.url,
    social: {
      github: authorraw.results[0].properties.Github?.url,
      instagram: authorraw.results[0].properties.Instagram?.url,
      website: authorraw.results[0].properties.Website?.url,
      linkedin: authorraw.results[0].properties.Linkedin?.url,
      twitter: authorraw.results[0].properties.Twitter?.url,
    },
  }

  return author;
};