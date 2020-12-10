import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { useStudentsQuery } from '../generated/graphql';
import Loading from './Loading';

export const Students:React.FC = () => {
    const { data, loading, error } = useStudentsQuery({fetchPolicy: 'network-only'});

    if(loading && !data) {
        return <Loading />
    }

    if(error) {
        console.log(error);
    }
    return (
        <>
            {
              data?.getLecturerStudents?.map(x => x.students?.map(s => (
                <Box p={5} key={s.id} shadow="sm" borderWidth="1px">
                    <Heading fontSize="xl">{s.fullName}</Heading>
                    <Text mt={4}>{s.emailAddress}</Text>
                </Box>
              )))
            }
        </>
    )
}
