// Request: http://localhost:3000/api/events/getevents
/*
    http://localhost:3000/api/events/getevents

    [
    {
        "id": "1933ad47-35a0-4a43-bd07-8c5f04254c2d",
        "name": "Test event",
        "description": "Lorem ipsun is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy\n text ever since the 1500s, when an unknown printer took a galley of \ntype and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, \nremaining essentially unchanged. It was popularised in the 1960s with \nthe release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n\n",
        "date": "2024-09-10",
        "location": "Virtual",
        "tags": [
        "Test",
        "Test2",
        "Test3",
        "Test4"
        ],
        "public": true,
        "organizer": "Pedro Kaleb De Je1",
        "equip": [
        "Pedro Jesus"
        ],
        "created_time": "2024-09-09T14:34:00.000Z",
        "last_edited_time": "2024-09-09T15:07:00.000Z",
        status: "Not started",
        "url": "https://www.notion.so/Test-event-1933ad4735a04a43bd078c5f04254c2d"
    }
    ]
    */

// http://localhost:3000/api/events/eventcount
// Res: {"count":1}


import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// Chakra ui

import { Text, Heading, Image, Divider } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Tag, Input } from "@chakra-ui/react";
import { Progress } from "@chakra-ui/react";

// Motion
import { motion } from "framer-motion";

import Fuse from "fuse.js";
import { remove as removeDiacritics } from "diacritics";

// Icons
import { FaMapPin, FaCalendar } from "react-icons/fa";


export default function ListEvents() {
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const toast = useToast();

    useEffect(() => {
        fetch("/api/events/getevents")
            .then((res) => res.json())
            .then((data) => {
                setEvents(data);
                setFilteredEvents(data);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (search === "") {
            setFilteredEvents(events);
        } else {
            const fuse = new Fuse(events, {
                keys: ["name", "description", "tags"],
                includeScore: true,
            });

            const result = fuse.search(search).map((event) => event.item);
            setFilteredEvents(result);
        }
    }, [search, events]);

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

    function eventIsToday(event: any) {
        const eventDate = new Date(event.date);
        const currentDate = new Date();
        return eventDate === currentDate;
    }

    function eventIncoming(event: any) {
        const eventDate = new Date(event.date);
        const currentDate = new Date();
        return eventDate > currentDate;
    }

    function eventPercentage(event: any) {
        const eventDate = new Date(event.date) as any;
        const currentDate = new Date() as any;
        const diffTime = Math.abs(eventDate - currentDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        let percentage = 100 - diffDays;
        let value = 100 - percentage;
        return value;
    }
    

    function daysToEvent(event: any) {
        const eventDate = new Date(event.date) as any;
        const currentDate = new Date() as any;
        const diffTime = Math.abs(eventDate - currentDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col space-y-4 justify-center items-center w-full"
        >
            <Heading>Events</Heading>
            <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for events"
                className="w-full max-w-lg"
            />
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                filteredEvents.map((event: any) => (
                    <motion.div
                        key={event.id}
                        whileHover={{ scale: 1.00 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <div className="flex flex-col gap-4 p-28">
                            <div className="flex flex-row justify-center items-center w-full">
                                <Image
                                    src={event.banner}
                                    alt={event.name}
                                    width={900}
                                    height={250}
                                />
                            </div>
                            <Heading>{event.name}</Heading>
                            <Text>{event.description}</Text>
                            <motion.div
                                initial={{ x: -1000 }}
                                animate={{ x: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <Text className="flex flex-row justify-left items-center gap-2">
                                    <FaCalendar size={20}/>
                                    {
                                        new Date(event.date).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })
                                    }
                                </Text>
                            </motion.div>
                            <motion.div
                                initial={{ x: -1000 }}
                                animate={{ x: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <Text className="flex flex-row justify-left items-center gap-2">
                                    <FaMapPin size={20}/>
                                    {event.location}
                                </Text>
                            </motion.div>
                            <div className="flex flex-row gap-4">
                                {/* Event status */}
                                {eventIsInFuture(event) && (
                                    <Tag colorScheme="green">Upcoming</Tag>
                                )}
                                {eventIsInPast(event) && (
                                    <Tag colorScheme="red">Past</Tag>
                                )}
                                {eventIsInProgress(event) && (
                                    <Tag colorScheme="blue">In progress</Tag>
                                )}
                                {eventIsExpired(event) && (
                                    <Tag colorScheme="gray">Expired</Tag>
                                )}
                            </div>
                            <div className="flex flex-row gap-4">
                                {event.tags.map((tag: string, index: number) => (
                                    <Tag key={index} size="sm" colorScheme="blue">
                                        {tag}
                                    </Tag>
                                ))}
                            </div>
                            <div className="flex flex-row gap-4 justify-center items-center w-full">
                                {/* Progress to the event */}
                                <Text>{daysToEvent(event)} Days left </Text>
                                <Progress value={eventPercentage(event)} 
                                hasStripe w={20}
                                className="bg-blue-500 w-2/3"
                                />
                            </div>
                            <Divider />
                            <ButtonGroup>
                                <Button
                                    as="a"
                                    href={event.url}
                                    target="_blank"
                                    colorScheme="blue"
                                >
                                    More info
                                </Button>
                            </ButtonGroup>
                        </div>
                    </motion.div>
                ))
            )}
        </motion.div>
    );
}
