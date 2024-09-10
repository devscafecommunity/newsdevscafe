// Get all recent posts from: /api/blog/getrecent
/*
[
  {
    "id": "e3b7d032-44bd-4a77-8fef-6472617d5c21",
    "title": "Titulo do post",
    "description": "Descrição do post etc…",
    "cover": "https://i.imgur.com/SL6jvOr.png",
    "tags": [
      "test"
    ],
    "created_time": "2024-09-07T19:02:00.000Z",
    "last_edited_time": "2024-09-07T23:20:00.000Z",
    "content": []
  }
]
*/

// Chakra
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { Text, Heading, Divider } from "@chakra-ui/react";
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Tag, Input } from "@chakra-ui/react";

// Motion
import { motion } from "framer-motion";

// React
import { use, useEffect, useState } from "react";

// Icons
import { CiBookmark, CiBookmarkCheck } from "react-icons/ci";
import { LuBookOpen, LuBookOpenCheck } from "react-icons/lu";
import { FaBookReader } from "react-icons/fa";

// Import cookie
import { useCookies } from "react-cookie";

// PostCard component
import PostCard from "./PostCard";

// Normalize search list
import Fuse from "fuse.js";
import { remove as removeDiacritics } from "diacritics"; // You can use a package like 'diacritics'
import { Header } from "next/dist/lib/load-custom-routes";

export interface Post {
  id: string;
  title: string;
  description: string;
  cover: string;
  slug?: string;
  tags: string[];
  created_time: string;
  last_edited_time: string;
  author?: string;
  content: string;
}

export default function AuthorPostList(
    { posts }: { posts: Post[] }
) {
  // Cookies
  const [cookies, setCookie] = useCookies([
    "consent",
    "saved-posts",
    "read-posts",
  ]);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<Post[]>([]);

  const toast = useToast();
  let attempts = 0;

  function handleSave(post: any) {
    if (cookies.consent === false) {
      toast({
        title: "Consent required",
        description: "Please enable cookies to save posts",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    } else if (cookies.consent === true) {
      let savedPosts = cookies["saved-posts"] || [];
      let index = savedPosts.findIndex((p: any) => p.id === post.id);
      if (index === -1) {
        savedPosts.push(post);
        toast({
          title: "Post saved",
          description: "You can view your saved posts in the saved posts page",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } else {
        savedPosts.splice(index, 1);
        toast({
          title: "Post removed",
          description: "You can view your saved posts in the saved posts page",
          status: "info",
          duration: 9000,
          isClosable: true,
        });
      }
      setCookie("saved-posts", savedPosts, { path: "/" });
    } else {
      toast({
        title: "Consent required",
        description: "Please enable cookies to save posts",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  function postIsSaved(post: any) {
    let savedPosts = cookies["saved-posts"] || [];
    let index = savedPosts.findIndex((p: any) => p.id === post.id);
    if (index === -1) {
      return false;
    } else {
      return true;
    }
  }

  function postIsReaded(post: any) {
    let readPosts = cookies["read-posts"] || [];
    let index = readPosts.findIndex((p: any) => p.post === post.id);
    if (index === -1) {
      return false;
    } else {
      return true;
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {
        posts.length === 0 ? (
          <div>
            <Heading>
              No posts found, or being loaded
            </Heading>
          </div>
        ) : (
          <div>
            {
              posts.map((post, index) => (
                <PostCard key={index} post={post} />
              ))
            }
          </div>
        )
      }
    </div>
  );
}