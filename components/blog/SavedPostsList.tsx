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

export default function SavedPostsList() {
  // Cookies
  const [cookies, setCookie] = useCookies([
    "consent",
    "saved-posts",
    "read-posts",
  ]);

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const [savedPosts, setSavedPosts] = useState<Post[]>([]);

  const toast = useToast();
  useEffect(() => {
    const timer = setTimeout(() => {
      if (loading) {
        toast({
          title: "Loading taking too long",
          description: "Please try again later",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        setTimeout(() => {
          //   window.location.href = "/";
          toast.closeAll();
          toast({
            title: "Can't load posts",
            description:
              "We are having trouble loading the posts, please try again later, redirecting to home page...",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          setTimeout(() => {
            window.location.href = "/";
          }, 500);
        }, 10000);
      }
    }, 20000);
    return () => clearTimeout(timer);
  }, [loading]);

  let attempts = 0;

  useEffect(() => {
    fetch("/api/blog/getrecent")
      .then((res) => res.json())
      .then((data) => {
        // Verify if the data is an error or empty
        attempts++;
        if (data.error) {
          toast({
            title: "Error",
            description: data.error,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          return;
        } else if (data.length === 0) {
          toast({
            title: "No posts",
            description:
              "Recived empty posts, trying again..., [Attempt: " +
              attempts +
              "]",
            status: "info",
            duration: 9000,
            isClosable: true,
          });
          return;
        } else {
          setPosts(data);
          setLoading(false);
        }
      });
  }, []);

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

  // Normalize search list if not imput just return the posts
  const fuse = new Fuse(posts, {
    keys: ["title", "description", "tags"],
    includeScore: true,
    includeMatches: true,
    minMatchCharLength: 0,
    ignoreLocation: true,
    threshold: 0.3,
    useExtendedSearch: true,
    ignoreFieldNorm: true,
  });

  // Filter posts that postIsSaved is true
  const savedPostsraw = posts.filter((post) => postIsSaved(post));

  // If the consents is false return a message
  if (cookies.consent === false) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 w-full">
        <Text>Consent required</Text>
        <Text>Please enable cookies to save posts</Text>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center gap-4 w-full">
        {savedPostsraw.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 w-full">
            <Text>No saved posts</Text>
          </div>
        ) : (
          savedPostsraw.map((post: Post) => (
            <PostCard key={post.id} loading={loading} post={post} />
          ))
        )}
      </div>
    );
  }
}
