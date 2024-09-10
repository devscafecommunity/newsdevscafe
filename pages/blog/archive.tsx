// Components
import PostSearchList from "@/components/blog/PostSearchList"
import BlogBc from "@/components/blog/BlogBc"
import { Heading } from "@chakra-ui/react"

export default function Blog() {
    return (
        // Center on the 
        <div className="flex flex-col items-center justify-center gap-4 min-h-screen">
            <div className="h-40"/>
            <Heading as="h1">Search posts</Heading>

            <BlogBc />
            <div className="h-20"/>
            <PostSearchList />
        </div>
    )
}