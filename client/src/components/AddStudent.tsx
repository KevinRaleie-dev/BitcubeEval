import React from 'react'
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, FormControl, FormLabel, Input, Select, ScaleFade } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import {useForm} from 'react-hook-form';
import { useDegreeQuery } from '../generated/graphql';

interface FormProps {
    email: string;
    forenames: string;
    dateOfBirth: Date;
    surname: string;
}

const AddStudent:React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {data, error} = useDegreeQuery();
    const { register } = useForm<FormProps>()

    const onSubmit = () => {

    }
    console.log(error)
    return (
        <>
            <Button leftIcon={<AddIcon />} onClick={onOpen}>Add Student</Button>
            <ScaleFade initialScale={0.9} in={isOpen}>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Add a Student</ModalHeader>
                <ModalCloseButton />
                <form onSubmit={onSubmit}>
                <ModalBody>
                        <FormControl id="email-address" isRequired mt={5}>
                            <Input name="email" type="email" placeholder="Email Address" ref={register} />
                        </FormControl>
                        <FormControl id="forenames" isRequired mt={5}>
                            <Input name="forenames" placeholder="Forenames"  ref={register}/>
                        </FormControl>
                        <FormControl id="surname" isRequired mt={5}>
                            <Input name="surname" placeholder="Surname" ref={register} />
                        </FormControl>
                        <FormControl id="date-of-birth" isRequired mt={5}>
                            <FormLabel htmlFor="dateOfBirth">Date of birth</FormLabel>
                            <Input type="date" name="dateOfBirth" placeholder="Date of birth (dd-MM-yyyy)" ref={register} />
                        </FormControl>
                        <FormControl id="degrees" isRequired mt={5}>
                            <FormLabel htmlFor="degrees">Pick a degree</FormLabel>
                            <Select placeholder="Select option">
                                {data?.getDegrees.map(x => (
                                       <option key={x.id} value={x.id}>
                                           {x.degreeName}
                                       </option>
                                ))}
                            </Select>
                        </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Cancel
                    </Button>
                    <Button type='submit' variant="ghost">Submit</Button>
                </ModalFooter>
                </form>
                </ModalContent>
            </Modal>
            </ScaleFade>
        </>
    )
}

export default AddStudent;