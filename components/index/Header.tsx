import { Text, Heading } from '@chakra-ui/react';


export default function Header() {
  return (
    <header className='flex flex-col items-center justify-center gap-6'>
      <Heading as="h1">Next.js + Notion</Heading>
      <Text>
        This is a simple blog boiler plate built with Next.js and Notion.
      </Text>
    </header>
  );
}