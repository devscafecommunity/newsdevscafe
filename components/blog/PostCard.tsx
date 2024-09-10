import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { Text, Heading, Divider } from "@chakra-ui/react";
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Tag } from "@chakra-ui/react";

import { motion } from "framer-motion";
import { use, useEffect, useState } from "react";

import { CiBookmark, CiBookmarkCheck } from "react-icons/ci";
import { LuBookOpen, LuBookOpenCheck } from "react-icons/lu";
import { FaBookReader } from "react-icons/fa";

import { useCookies } from "react-cookie";

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

export default function PostCard({
  post,
  loading,
}: {
  post: Post;
  loading?: boolean;
}) {
  const [cookies, setCookie] = useCookies([
    "consent",
    "saved-posts",
    "read-posts",
  ]);

  // if loading is not defined, set it to true places that not use the loading prop will not have a loading skeleton
  if (loading == undefined || loading == null) {
    loading = false;
  }

  const toast = useToast();

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      key={post.id}
    >
      <Card className="w-full max-w-2/3 p-4 m-2 ">
        <CardHeader></CardHeader>
        <CardBody className="flex flex-row gap-2">
          {loading ? (
            <Skeleton height="20px" />
          ) : (
            <Image
              src={post.cover}
              alt={post.title}
              className="rounded-lg h-40 w-40 object-cover"
            />
          )}
          <div className="flex flex-col gap-4">
            <Heading as="h2" size="lg">
              {post.title}
            </Heading>
            <Text>{post.description}</Text>
            <Text>{post.content}</Text>
            <div className="flex flex-row gap-4">
              {post.tags.map((tag, index) => (
                <Tag key={index} size="sm" colorScheme="blue">
                  {tag}
                </Tag>
              ))}
            </div>
          </div>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup className="flex flex-row gap-4 justify-center items-center">
            <Button
              leftIcon={<FaBookReader />}
              onClick={() =>
                (document.location.href = `/blog/posts/${post.slug}`)
              }
            >
              Read The Post
            </Button>
            <div className="flex flex-row gap-4 justify-center items-center">
              {postIsSaved(post) ? (
                <Button onClick={() => handleSave(post)}>
                  <CiBookmarkCheck size={25} />
                </Button>
              ) : (
                <Button onClick={() => handleSave(post)}>
                  <CiBookmark size={25} />
                </Button>
              )}
            </div>
            <div className="flex flex-row gap-4 justify-center items-center">
              {postIsReaded(post) ? (
                <LuBookOpenCheck size={30} />
              ) : (
                <LuBookOpen size={30} />
              )}
            </div>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
