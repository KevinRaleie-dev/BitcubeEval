import { ChevronDownIcon, UpDownIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, Menu, MenuButton, MenuItem, MenuList, Spacer, Text } from '@chakra-ui/react';
import React from 'react';
import { useRemoveStudentMutation, useStudentsQuery } from '../generated/graphql';
import Loading from './Loading';

export const Students:React.FC = () => {
    const { data, loading, error } = useStudentsQuery({fetchPolicy: 'network-only'});
    const [removeStudent] = useRemoveStudentMutation();

    if(loading) {
        return <Loading />
    }

    if(!data) {
        return <p>Such empty...🙁</p>
    }

    if(error) {
        console.log(error);
    }
    return (
        <>
            {
              data?.getLecturerStudents?.map(x => x.students?.map(s => (
                <Box p={5} key={s.id} shadow="sm" borderWidth="1px">
                    <Flex>
                        <Box>
                            <Heading fontSize="xl">{s.fullName}</Heading>   
                        </Box>
                        <Spacer />
                        <Box>
                        <Menu>
                        <MenuButton  rightIcon={<ChevronDownIcon />}>
                            <UpDownIcon />
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={ async () => {
                                await removeStudent({
                                    variables: {
                                        studentID: s.id
                                    }
                                });
                            }}>Remove student</MenuItem>
                        </MenuList>
                        </Menu>
                        </Box>
                    </Flex>
                    <Text mt={4}>{s.emailAddress}</Text>
                </Box>
              )))
            }
        </>
    )
}
