/*
data: 

{
  "id": "7fbdcbf1-de6c-472b-b35a-e4c3dbbe22ab",
  "name": "Pedro Kaleb de Jesus",
  "bio": "Test",
  "avatar": "https://i.imgur.com/SL6jvOr.png",
  "banner": "https://i.imgur.com/UxNDPFP.png",
  "social": {
    "github": "https://github.com/LyeZinho",
    "instagram": "https://instagram/pedrokj",
    "website": "https://pedrokalebdev.pt",
    "linkedin": "linkedin.com/pedrojesus",
    "twitter": "https://x.com/PeJesus"
  },
  "posts": [
    {
      "id": "e3b7d032-44bd-4a77-8fef-6472617d5c21",
      "title": "Titulo do post",
      "description": "Descrição do post etc…",
      "cover": "https://i.imgur.com/SL6jvOr.png",
      "slug": "test",
      "tags": [
        "test"
      ],
      "created_time": "2024-09-07T19:02:00.000Z",
      "last_edited_time": "2024-09-09T09:27:00.000Z",
      "author": {
        "id": "2439e043-c4de-4dac-8bca-225299af2a76",
        "name": "Pedro Kaleb De Je1",
        "avatar": "",
        "banner": "",
        "email": "pedrokalebdej1@gmail.com"
      },
      "content": []
    }
  ]
}
*/

// Chakra
import { Image } from "@chakra-ui/react";
import { Text, Heading, Divider } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Tag, Input } from "@chakra-ui/react";

import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from "@chakra-ui/react";

// Motion
import { motion } from "framer-motion";

// React
import { use, useEffect, useState } from "react";

// Icons
import {
  FaGithub,
  FaInstagram,
  FaGlobe,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

export default function AuthorPostHeader({ data }: { data: any }) {
  // Request: http://localhost:3000/api/blog/postcount
  // Res: {"count":1}
  const [postCount, setPostCount] = useState(0);

  useEffect(() => {
    fetch("/api/blog/postcount")
      .then((res) => res.json())
      .then((data) => {
        setPostCount(data.count);
      });
  }, []);

  // Percentage of post counting on base of the total posts count
  function getPostPercentage(postsCount: number, totalPosts: number) {
    return (postsCount / totalPosts) * 100;
  }

  // The averege days between the posts of the author
  function getPostSpacing(posts: any) {
    let total = 0;
    for (let i = 0; i < posts.length - 1; i++) {
      let date1 = new Date(posts[i].created_time);
      let date2 = new Date(posts[i + 1].created_time);
      let diffTime = Math.abs(date2.getTime() - date1.getTime());
      let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      total += diffDays;
    }
    return Math.ceil(total / posts.length);
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        {/* 
        First image is the avatar and the second is the banner
        The avatar is a circle and the banner is a rectangle
        */}
        <div className="flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 280 }}
            animate={{ opacity: 1, y: 280 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center justify-center z-10"
          >
            <Image
              src={data.avatar}
              alt={data.name}
              width={200}
              height={200}
              borderRadius="full"
              className="bg-white"
            />
          </motion.div>
          <Image
            src={data.banner}
            alt={data.name}
            width={600}
            height={400}
            borderRadius="md"
          />
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: -100 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center justify-center z-10"
          >
            <Heading as="h1" size="lg" mt={4} className="text-white">
              {data.name}
            </Heading>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: -100 }}
            transition={{ delay: 0.2 }}
            className="flex flex-row gap-4 items-center justify-center z-10"
          >
            <Text>
              {
                // Max text length 100
                data.bio.length > 100
                  ? data.bio.substring(0, 100) + "..."
                  : data.bio
              }
            </Text>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: -50 }}
            transition={{ delay: 0.2 }}
            className="flex flex-row gap-4 items-center justify-center z-10"
          >
            <ButtonGroup>
              <Button
                as="a"
                href={data.social.github ?? "#"}
                target="_blank"
                leftIcon={<FaGithub />}
              >
                Github
              </Button>
              <Button
                as="a"
                href={data.social.instagram ?? "#"}
                target="_blank"
                leftIcon={<FaInstagram />}
              >
                Instagram
              </Button>
              <Button
                as="a"
                href={data.social.website ?? "#"}
                target="_blank"
                leftIcon={<FaGlobe />}
              >
                Website
              </Button>
              <Button
                as="a"
                href={data.social.linkedin ?? "#"}
                target="_blank"
                leftIcon={<FaLinkedin />}
              >
                Linkedin
              </Button>
              <Button
                as="a"
                href={data.social.twitter ?? "#"}
                target="_blank"
                leftIcon={<FaTwitter />}
              >
                Twitter
              </Button>
            </ButtonGroup>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: -20, x: 35 }}
            transition={{ delay: 0.2 }}
            className="flex flex-row gap-8 z-10 w-full"
          >
            <StatGroup className="flex flex-row gap-4 items-center justify-center w-full">
              <Stat>
                <StatLabel>Posts Percentage</StatLabel>
                <StatNumber>
                  {getPostPercentage(data.posts.length, postCount)}%
                </StatNumber>
                <StatHelpText>Of total posts</StatHelpText>
              </Stat>

              <Stat>
                <StatLabel>Posts Count</StatLabel>
                <StatNumber>{data.posts.length}</StatNumber>
                <StatHelpText>Total author posts</StatHelpText>
              </Stat>

              <Stat>
                <StatLabel>Post Spacing</StatLabel>
                <StatNumber>{getPostSpacing(data.posts)} days</StatNumber>
                <StatHelpText>Days between posts</StatHelpText>
              </Stat>
            </StatGroup>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
