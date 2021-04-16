import { Box, Spinner } from '@chakra-ui/react';
import React from 'react';

const Loading:React.FC = () => {
    return (
        <Box
        w="100vw"
        h="100vh"
        display="grid"
        placeItems="center"
        >
            <Spinner color="#278ea5" size="xl"/>
        </Box>

    )
}

export default Loading
