import { Button } from '@chakra-ui/react'
import React from 'react';

type ToggleNavProps = {
    icon: any // set proper types for icon later
}

export const ToggleNav: React.FC<ToggleNavProps> = ({icon}) => {
    return (
        <Button colorScheme="none" borderColor="#278ea5" variant="outline">{icon}</Button>
    )
}
