import SavedPostsList from "@/components/blog/SavedPostsList";
import { Heading } from "@chakra-ui/react";
import BlogBc from "@/components/blog/BlogBc";

export default function Saved() {
    return (
        <div className="flex flex-col items-center justify-center gap-4 min-h-screen">
            <div className="h-40"/>
            <Heading as="h1">Saved posts</Heading>
            <BlogBc />
            <div className="h-4"/>
            <SavedPostsList />
        </div>
    )
}