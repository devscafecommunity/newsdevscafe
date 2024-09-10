import { Text, Heading, Image } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Tag, Input } from "@chakra-ui/react";
import { Progress } from "@chakra-ui/react";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Fuse from "fuse.js";
import { remove as removeDiacritics } from "diacritics";

// import {
//     Pin
// } from "react-icons/fa";

export default function EventCard({ event }: { event: any }) {
  // Remaining time to the event using on the live countdown
  const [timeRemaining, setTimeRemaining] = useState("");

  function eventIsInFuture(event: any) {
    const eventDate = new Date(event.date);
    const currentDate = new Date();
    return eventDate > currentDate;
  }

  function eventIsInPast(event: any) {
    const eventDate = new Date(event.date);
    const currentDate = new Date();
    return eventDate < currentDate;
  }

  function eventIsInProgress(event: any) {
    const eventDate = new Date(event.date);
    const currentDate = new Date();
    return eventDate === currentDate;
  }

  function eventIsExpired(event: any) {
    const eventDate = new Date(event.date);
    const currentDate = new Date();
    return eventDate < currentDate;
  }

  function eventPercentage(event: any) {
    const createdDate = new Date(event.created_time).getTime();
    const eventDate = new Date(event.date).getTime();
    const currentDate = new Date().getTime();
  
    // Total duration from the created date to the event date
    const totalDuration = eventDate - createdDate;
  
    // Duration from the created date to the current date
    const elapsedDuration = currentDate - createdDate;
  
    // Calculate percentage progress
    const percentage = (elapsedDuration / totalDuration) * 100;
  
    // Ensure the percentage is between 0 and 100
    return Math.max(0, Math.min(100, percentage));
  }
  

    // Countdown timer in milliseconds
    function countdownTimer(event: any) {
    const eventDate = new Date(event.date).getTime();
    const currentDate = new Date().getTime();
    const diffTime = eventDate - currentDate;
    return Math.max(0, diffTime); // Ensures it doesn't return negative values
  }
  
  // Format the countdown timer in dd:hh:mm:ss format
  function formatCountdownTimer(event: any) {
    const diffTime = countdownTimer(event);
  
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffTime % (1000 * 60)) / 1000);
  
    return `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
  }
  

  useEffect(() => {
    const timer = setInterval(() => {
        setTimeRemaining(formatCountdownTimer(event));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      key={event.id}
      whileHover={{ scale: 1.0 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex flex-col gap-4 p-28">
        <Image
          src="https://via.placeholder.com/150"
          alt={event.name}
          width={150}
          height={150}
        />
        <Heading>{event.name}</Heading>
        <Text>{event.description}</Text>
        <Text>{ 
            // Format the date to a more readable format pt-BR 4 de setembro de 2021
            new Date(event.date).toLocaleDateString("pt-BR", {
                day: "numeric",
                month: "long",
                year: "numeric",
            })
            }</Text>
        <Text>{event.location}</Text>
        <div className="flex flex-row gap-4">
          {event.tags.map((tag: string, index: number) => (
            <Tag key={index} size="sm" colorScheme="blue">
              {tag}
            </Tag>
          ))}
        </div>
        <div className="flex flex-row gap-4">
          {/* Event status */}
          {eventIsInFuture(event) && <Tag colorScheme="green">Upcoming</Tag>}
          {eventIsInPast(event) && <Tag colorScheme="red">Past</Tag>}
          {eventIsInProgress(event) && (
            <Tag colorScheme="blue">In progress</Tag>
          )}
          {eventIsExpired(event) && <Tag colorScheme="gray">Expired</Tag>}
        </div>
        <div className="flex flex-row gap-4 justify-center items-center w-full">
          {/* Using set interval update the counter */}
            <Text>{
                timeRemaining
                }</Text>
          <Progress
            value={eventPercentage(event)}
            hasStripe
            w={20}
            className="bg-blue-500 w-2/3"
          />
        </div>
        <ButtonGroup>
          <Button as="a" href={event.url} target="_blank" colorScheme="blue">
            More info
          </Button>
        </ButtonGroup>
      </div>
    </motion.div>
  );
}
