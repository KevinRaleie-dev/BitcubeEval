import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { MeQuery } from '../generated/graphql';

type DashboardLayoutProps = {
    me: MeQuery | undefined;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({me}) => {

    const nickName = me?.meQuery?.fullName.split(' ')[2];

    return (
        <>
            <Box color="white" p={5}>
                <Stack spacing={3}>
                    <Heading>Dashboard</Heading>
                    <Text><span style={{ fontWeight: "bold"}}>Welcome</span>, {nickName}👋</Text>
                </Stack>
            </Box>
            {/* <Box
            h="100vh"
            >
                hello
            </Box> */}
        </>
    )
}
