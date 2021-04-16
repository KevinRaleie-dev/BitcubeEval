import { Box, Button, Flex, Grid, Heading, Image, Spacer, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { RouteComponentProps } from 'react-router-dom';

export const Home: React.FC<RouteComponentProps> = ({history}) => {
    return (
        <>
            <Flex py={3} px={10} position="sticky" top={0} zIndex={1} bg="white">
                <Text as="h1" fontSize="xl" fontWeight="600">Studently 👩🏽‍🎓</Text>
                <Spacer />
                <Box>
                    <Button onClick={() => history.push("/login")} bg="#071e3d" color="white" colorScheme="purple.900">Sign in</Button>
                </Box>
            </Flex>
            <Box
            w="100vw"
            p={5}
            >
                <Grid templateColumns="repeat(2, 1fr)" gap={1} p={5} mt="20px">
                    <Box w="100%" mt="50px">
                        {/* box to hold the hero text */}
                        <Stack spacing={7}>
                            <Heading as="h1" size="4xl">Making your work as a lecturer easy.</Heading>
                            <Text fontSize="lg" color="gray.600">
                            Manage your students, classes and your schedule all a few clicks away.
                            Get direct messages from your students, post announcements on the student board
                            and a beautiful dashboard tailored for you.
                            </Text>
                            <Box>
                                <Button
                                paddingX={20}
                                paddingY={8}
                                color="white"
                                bgColor="#071e3d"
                                colorScheme="purple.900"
                                >
                                    Get started
                                </Button>
                            </Box>
                        </Stack>
                    </Box>
                    <Box w="100%">
                        {/* box to hold the image */}
                        <Image
                        p={5}
                        h="auto"
                        w="auto"
                        src="/business.svg"
                        />
                    </Box>
                </Grid>
                <Box
                h="200vh"
                >

                </Box>
            </Box>

        </>
    )
}

// making your life as a lecturer easy
// manage your students, classes and your schedule all at a few clicks of a button

