import React from 'react'
import { Box, Heading } from '@chakra-ui/react';
import { useLecturerDegreesQuery } from '../generated/graphql'
import Loading from './Loading';

export const Degrees:React.FC = () => {
    const {data, loading, error} = useLecturerDegreesQuery({fetchPolicy: 'network-only'});

    if(loading && !data) {
        return <Loading />
    }

    if(error) {
        console.log(error);
    }

    return (
        <>
            {
                data?.getLecturer?.degrees.map(x => (
                    <Box p={5} key={x.id} shadow="sm" borderWidth="1px">
                        <Heading fontSize="xl">{x.degreeName}</Heading>
                    </Box>
                ))
            }
        </>
    )
}

