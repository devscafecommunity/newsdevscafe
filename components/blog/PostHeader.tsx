// Chackra UI
import { Text, Heading, Image } from "@chakra-ui/react";
import { Divider } from "@chakra-ui/react";

// framer motion
import { motion } from "framer-motion";

/*
<Heading as="h1">{post.title}</Heading>
      <Text>{post.description}</Text>
      
*/
export default function PostHeader({ post }: { post: any }) {
  function getDateDifference(date: string) {
    const currentDate = new Date();
    const postDate = new Date(date);
    const difference = currentDate.getTime() - postDate.getTime();
    const daysDifference = difference / (1000 * 3600 * 24);
    // return daysDifference; Round to the nearest whole number
    return Math.round(daysDifference);
  }

  function formatDate(date: string) {
    // 7 days ago / 7 sept 2021
    let formattedDate = new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    let daysDifference = getDateDifference(date);
    if (daysDifference < 7) {
      return `${daysDifference} days ago`;
    } else {
      return formattedDate;
    }
  }

  function formatTime(date: string) {
    // Format: 7 september 2021
    return new Date(date).toLocaleTimeString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Image
        src={post.cover}
        alt={post.title}
        className="rounded-lg h-96 w-96 object-cover"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-col gap-4 justify-center items-center"
      >
        <Heading as="h1" size="2xl">
          {post.title}
        </Heading>
        <Text className="flex flex-col gap-4 max-w-xl">
        {post.description}
        </Text>
        <Divider />
        <div className="flex flex-row gap-4">
        <Text>
        By {post.author.name} ◾ {formatTime(post.created_time)} ◾ {formatDate(post.created_time)}
        </Text>
        </div>
        <Divider />
      </motion.div>
    </div>
  );
}
