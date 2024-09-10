import React from "react";
import { useColorMode } from "@chakra-ui/react";

// Import cookie
import { useCookies } from "react-cookie";


export default function RenderPosts({ html }: { html: string }) {
  const [cookies, setCookie] = useCookies(["consent", "saved-posts"]);

  const { colorMode, toggleColorMode } = useColorMode();

  let bgColor = colorMode === "light" ? "prose-proselight" : "prose-prosedark";

  return (
    <div className="flex flex-col items-center justify-center gap-6 pt-8">
      <div
        className={`prose ${bgColor}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
    </div>
  );
}