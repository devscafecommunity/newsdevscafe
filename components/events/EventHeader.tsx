// Chakra
import { Text, Heading, Divider } from "@chakra-ui/react";

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

export default function EventHeader() {
  const [eventCount, setEventCount] = useState(0);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/api/events/eventcount")
      .then((res) => res.json())
      .then((data) => {
        setEventCount(data.count);
      });

    fetch("/api/events/getevents")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
      });
  }, []);


  function totalStartedEvents(events: any) {
    return events.filter((event: any) => event.status === "In progress").length;
  }

  function totalDoneEvents(events: any) {
    return events.filter((event: any) => event.status === "Done").length;
  }

  function totalNotStartedEvents(events: any) {
    return events.filter((event: any) => event.status === "Not started").length;
  }

  function totalEvents(events: any) {
    return events.length;
  }

  function getEventTracking(events: any) {
    const total = totalEvents(events);
    const progress = totalStartedEvents(events);
    const done = totalDoneEvents(events);
    const notStarted = totalNotStartedEvents(events);

    const progressPercentage = (progress / total) * 100;
    const donePercentage = (done / total) * 100;
    const notStartedPercentage = (notStarted / total) * 100;

    // Status: gain, loss, neutral

    let status = "neutral";
    if (progressPercentage > donePercentage) {
      status = "gain";
    } else if (progressPercentage < donePercentage) {
      status = "loss";
    }

    return {
      progressPercentage,
      donePercentage,
      notStartedPercentage,
      status,
    };
  }

  function getEventPercentage(events: any) {
    const progress = totalStartedEvents(events);
    const done = totalDoneEvents(events);
    const notStarted = totalNotStartedEvents(events);

    const total = totalEvents(events);

    const progressPercentage = (progress / total) * 100;
    const donePercentage = (done / total) * 100;
    const notStartedPercentage = (notStarted / total) * 100;
    const major = Math.max(
      progressPercentage,
      donePercentage,
      notStartedPercentage
    );
    const statusMajority = ""; // The status with the majority of percentage

    if (major === progressPercentage) {
      return {
        status: "In progress",
        percentage: progressPercentage,
      };
    } else if (major === donePercentage) {
      return {
        status: "Done",
        percentage: donePercentage,
      };
    } else if (major === notStartedPercentage) {
      return {
        status: "Not started",
        percentage: notStartedPercentage,
      };
    }
  }

  // The averege days between the events
  function getEventSpacing(events: any) {
    let total = 0;
    for (let i = 0; i < events.length - 1; i++) {
      const date1 = new Date(events[i].date);
      const date2 = new Date(events[i + 1].date);
      const diffTime = Math.abs(date2.getTime() - date1.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      total += diffDays;
    }
    return total / events.length;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center w-full m-6 p-6"
    >
      <Heading as="h1" size="2xl">
        Events
      </Heading>
      <Text fontSize="xl" color="gray.500">
        Here you can find all the events that we have organized
      </Text>
      <Divider my={5} />
      <StatGroup className="flex flex-row gap-4 w-full justify-center items-center">
        <Stat>
          <StatLabel>Events majority</StatLabel>
          <StatNumber>{getEventPercentage(events)?.percentage}%</StatNumber>
          <StatHelpText>Are {getEventPercentage(events)?.status}</StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Events</StatLabel>
          <StatNumber>{eventCount}</StatNumber>
          <StatHelpText>Events</StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Events distribution</StatLabel>
          <StatNumber>
            {" "}
            {totalStartedEvents(events)} / {totalDoneEvents(events)} /{" "}
            {totalNotStartedEvents(events)}
          </StatNumber>
          <StatHelpText>Start / Done / Progress</StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Events tracking</StatLabel>
          <StatNumber>
            {getEventTracking(events).status === "gain" ? (
              <StatArrow type="increase" />
            ) : getEventTracking(events).status === "loss" ? (
              <StatArrow type="decrease" />
            ) : (
              <></>
            )}{" "}
            {getEventTracking(events).status === "gain"
              ? getEventTracking(events).progressPercentage
              : getEventTracking(events).status === "loss"
              ? getEventTracking(events).donePercentage
              : getEventTracking(events).notStartedPercentage}
            %
          </StatNumber>
          <StatHelpText>Gain / Loss</StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Events spacing</StatLabel>
          <StatNumber>{getEventSpacing(events)} days</StatNumber>
          <StatHelpText>Between events</StatHelpText>
        </Stat>
      </StatGroup>
      <Divider my={5} />
    </motion.div>
  );
}
