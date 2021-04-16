import React, { useState } from 'react';
import { useMeQuery } from '../generated/graphql';
import { Flex, Box, Spacer, Text, Stack } from '@chakra-ui/react';
import { FiCalendar, FiLayers, FiMessageSquare, FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import Loading from '../components/Loading';
import { DashboardLayout } from "../components/DashboardLayout";
import { Error } from '../components/Error';
import AddStudent from '../components/AddStudent';
import { NavItem } from '../components/NavItem';
import { ToggleNav } from '../components/ToggleNav';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = ()=> {
    const {data, loading, error} = useMeQuery();
    const [toggleSideNav, setToggleSideNav] = useState(true)


    if(loading) {
        return <Loading />
    }
    if (error) {
       return <Error message={error.message} />
    }
    return (
        <>
        {data?.meQuery?.id && <>
            <Flex>
                <Box 
                h="100vh" 
                position="-webkit-sticky" 
                right={0} 
                bg="#071e3d" 
                w="250px" 
                p={4} 
                color="white" 
                display={toggleSideNav ? "flex" : "none"} 
                flexDirection="column" 
                justifyContent="space-between"
                >
                    <Link to="/">
                        <Text fontSize="xl" fontWeight="700" mb={10}>Studently</Text>
                    </Link>
                    <Stack direction={["column"]} spacing={4} cursor="pointer">
                        <NavItem title="Dashboard" url="/dashboard" icon={<FiLayers />} />
                        <NavItem title="Messages" icon={<FiMessageSquare />}/>
                        <NavItem title="Schedule" icon={<FiCalendar />}/>
                    </Stack>
                    <Spacer />
                    <AddStudent />
                </Box>
                <Box h="100vh" overflowY="auto" flex={1} bg="#1f4287" p={4}>
                    <Box
                    px={5}
                    color="white"
                    _hover={{cursor: "pointer"}}
                    onClick={() => setToggleSideNav(!toggleSideNav)}
                    >
                        {toggleSideNav ? <ToggleNav icon={<FiChevronsLeft />}/> : <ToggleNav icon={<FiChevronsRight />} />}
                        
                    </Box>
                    <DashboardLayout me={data} />
                </Box>
            </Flex>
        </> 
            }
        </>
    );
}
