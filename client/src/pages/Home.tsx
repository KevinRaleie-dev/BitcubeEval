import React from 'react';
import { useHelloQuery } from '../generated/graphql';
import  AddStudent  from '../components/AddStudent'
import { Flex, Box, Spacer } from '@chakra-ui/react';

export const Home: React.FC = ()=> {
    const {data, error, loading} = useHelloQuery();

    if(loading) {
        return <p>loading...</p>
    }
    if (error) {
        console.log(error)
        return <p>error</p>
    }
    return (
        <>
        <Flex p={4}>
            <Box>
                <p>{data?.hello}</p>
            </Box>
            <Spacer />
            <Box>
                <AddStudent />
            </Box>
        </Flex>
        </>
    );
}
