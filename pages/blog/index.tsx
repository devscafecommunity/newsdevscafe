// Components
import IndexHeader from "@/components/blog/IndexHeader";
import IndexPostList from "@/components/blog/IndexPostList";
import BlogBc from "@/components/blog/BlogBc";


export default function Blog() {
    return (
        // Center on the 
        <div className="flex flex-col items-center justify-center gap-4 min-h-screen">
            <div className="h-40"/>
            <IndexHeader />
            <BlogBc />
            <div className="h-20"/>
            <IndexPostList />
        </div>
    )
}