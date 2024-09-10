// Motion
import { motion } from 'framer-motion'

// Chakra UI components
import { Text, Heading } from '@chakra-ui/react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
  } from '@chakra-ui/react'


export default function IndexHeader() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center justify-center gap-4"
        >
            <Heading as="h1" size="4xl" className="text-center">
                Dev's Blog
            </Heading>
            <Text fontSize="xl" className="text-center">
                The place of code and creativity 🚀
            </Text>
        </motion.div>
    )
}