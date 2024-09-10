// React next
import { GetServerSideProps } from "next"; // Next server side props
import { useRouter } from "next/router"; // Routing
import { useEffect, useState } from "react"; // React

import AuthorPostList from "@/components/blog/AuthorPostList"; // Author post list component
import AuthorPostHeader from "@/components/blog/AuthorHeader";

// Chackra components
import { useToast } from "@chakra-ui/react";
import { ClassNames } from "@emotion/react";

// make an request for: http://localhost:3000/api/blog/author/[nickname]
/*
Return:
[
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
      "avatar": "https://lh3.googleusercontent.com/a/ACg8ocKbcJ0_7ZFPqvQfRPCFhcmW3idKldcPxpZVGsTPwSfT3Yw4pM3s=s100",
      "email": "pedrokalebdej1@gmail.com"
    },
    "content": []
  }
]
*/

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { nickname } = context.params ?? {};
    if (!nickname) {
        return {
            notFound: true,
        };
    }
    const res = await fetch(`http://localhost:3000/api/blog/author/${nickname}`); // Fetch the author posts from the api: /api/blog/author/[nickname]
    if (!res.ok) {
        return {
            notFound: true,
        };
    }
    const data = await res.json();
    return {
        props: {
            data,
        },
    };
}

// Recive data from the server 
export function Author( { data }: { data: any } ) {
    const router = useRouter();
    const toast = useToast();
    const { nickname } = router.query;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!data || data == undefined || data == null) {
                toast({
                    title: "Ops! 😅",
                    description: `We having some trouble to find the author ${nickname}, or our services are down.`,
                    status: "info",
                    duration: 9000,
                    isClosable: true,
                });
            }
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
        <div className="h-40" />
        {
            data==null ||  data==undefined ? (
                <div className="flex flex-col justify-center items-center aling-center">
                    <h1>Ops! 😅</h1>
                    <p>We having some trouble to find the author {nickname}, or our services are down.</p>
                </div>
            ) : (
                <div>
                    <AuthorPostHeader data={data} />
                    <AuthorPostList posts={data.posts} />
                </div>
            )
        }
        </div>
    );
}

export default Author;