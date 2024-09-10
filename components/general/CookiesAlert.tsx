// This is a cookies alert compoent

// Chakra imports
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'

// React Cookie 
import { useCookies } from 'react-cookie'

// React
import { useState, useEffect } from 'react'


export default function CookiesAlert() {
    const [cookies, setCookie] = useCookies([ 'consent' ])
    const [isOpen, setIsOpen] = useState(false)
    const [isConsent, setIsConsent] = useState(false)

    // Set an consent cookie if the user agrees
    function handleAgree() {
        setCookie('consent', 'true', { path: '/' })
        setIsConsent(true)
        setIsOpen(false)
    }
    function handleDisagree() {
        setCookie('consent', 'false', { path: '/' })
        setIsConsent(false)
        setIsOpen(false)
    }

    // Alert dialog
    useEffect(() => {
        if (!cookies.consent) {
            setIsOpen(true)
        }
    }, [])

    // Try to get the consent cookie if it not exists pop up the alert dialog
    const consent = cookies.consent
    if (consent === 'true') {
        return <></>
    }
    else if (consent === 'false') {
        return <></>
    }
    else if (consent === undefined) {
        return (
            <Drawer
                isOpen={isOpen}
                placement="bottom"
                onClose={() => setIsOpen(false)}
            >
                <DrawerOverlay>
                    <DrawerContent>
                        <DrawerHeader>Cookie Consent</DrawerHeader>
                        <DrawerBody>
                            We use local cookies to enhance your experience on our website. By clicking "Agree" you consent to the use of cookies. <br />
                            for acessing our website, you do not need to agree to the use of cookies. <br />
                            but some features will not be available, such as saving your preferences. <br />
                            We do not collect any personal data, the cookies are used locally on your device.
                        </DrawerBody>
                        <DrawerFooter>
                            <Button variant="outline" mr={3} onClick={handleDisagree}>
                                I Disagree
                            </Button>
                            <Button colorScheme="blue" onClick={handleAgree}>
                                I Agree
                            </Button>
                        </DrawerFooter>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        )
    }
}