import React from 'react'
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Container as Layout } from '@chakra-ui/react';
import { Students } from './Students';
import { Degrees } from './Degrees';

export const Container = () => {
    return (
        <Layout>
            <Accordion allowToggle>
                <AccordionItem>
                    <AccordionButton>
                    <Box flex="1" textAlign="left">
                        Students
                    </Box>
                    <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                        <Students />
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <AccordionButton>
                    <Box flex="1" textAlign="left">
                        Degrees
                    </Box>
                    <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                        <Degrees />
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Layout>
    )
}
