import { Center, Box, Flex, Image, Text, Tooltip } from "@chakra-ui/react"
import {useIntl} from 'react-intl'
export default function DreamerClub(props) {
    const intl = useIntl()
    return (
        <Center flexWrap={'wrap'} width={'1100px'}>
            <Image src={'/images/text_one.svg'} mt={'70px'} mb={'40px'}></Image>
            <Box position={'relative'}>
                <Box position={'absolute'} top={'50px'}>
                    <Flex>
                        <Box width={'390px'} bgColor={'#000'} height={'280px'}>
                            <Text pt={'75px'} color={'#fff'} width={'285px'} margin={'auto'} fontSize={'14px'} lineHeight={'20px'}>
                                {
                                    intl.formatMessage({id:'dreamerClub'})
                                }
                            </Text>
                        </Box>
                        <Image w={'706px'} src={'/images/img02.webp'}></Image>
                    </Flex>
                    <Flex justifyContent={'space-between'} mt={'70px'}>
                        <Box>
                            <Image width={'320px'} src={'/images/img_club_1.webp'}></Image>
                            <Text className={'club_title'}>
                                {
                                    intl.formatMessage({id:'blueChips'})
                                }
                            </Text>
                            <Text fontSize="14px" width={'315px'}>
                                {
                                    intl.formatMessage({id:'blueChipContent'})
                                }

                            </Text>
                        </Box>
                        <Box>
                            <Image width={'320px'} src={'/images/img_club_2.webp'}></Image>
                            <Text className={'club_title'}>
                                {
                                    intl.formatMessage({id:'division'})
                                }
                            </Text>
                            <Text fontSize="14px" width={'315px'}>
                                {
                                    intl.formatMessage({id:'divisionContent'})
                                }
                            </Text>
                        </Box>
                        <Box>
                            <Image width={'320px'} src={'/images/img_club_3.webp'}></Image>
                            <Text className={'club_title'}>
                                {
                                    intl.formatMessage({id:'seminars'})
                                }
                            </Text>
                            <Text fontSize="14px" width={'315px'}>
                                {
                                    intl.formatMessage({id:'seminarsContent'})
                                }
                            </Text>
                        </Box>
                    </Flex>
                    <Flex justifyContent={'space-between'} mt={'70px'}>
                        <Box>
                            <Flex>
                                <Image src={'/images/img_club_4.png'}></Image>
                                <Box w={'204px'} ml={'23px'}>

                                    <Text className={'club_title'}>
                                        {
                                            intl.formatMessage({id:'projectTitle'})
                                        }
                                    </Text>
                                    <Text fontSize="14px">
                                        {
                                            intl.formatMessage({id:'projectContent'})
                                        }
                                    </Text>
                                </Box>
                            </Flex>
                            <Flex mt={'40px'}>
                                <Image src={'/images/img_club_5.png'}></Image>
                                <Box w={'221px'} ml={'23px'}>

                                    <Text className={'club_title'} w={'150px'}>
                                        {
                                            intl.formatMessage({id:'valueRewards'})
                                        }
                                    </Text>
                                    <Text fontSize="14px">
                                        {
                                            intl.formatMessage({id:'valueContent'})
                                        }
                                    </Text>
                                </Box>
                            </Flex>
                        </Box>
                        <Box>
                            <Image w={'587px'} src={'/images/img_club_6.webp'} ></Image>
                            <Text className={'club_title'}>
                                {
                                    intl.formatMessage({id:'creation'})
                                }
                            </Text>
                            <Text fontSize="14px" width={'590px'}>
                                {
                                    intl.formatMessage({id:'creationContent'})
                                }
                            </Text>
                        </Box>
                    </Flex>
                </Box>
                <Image src={'/images/border01.png'}></Image>
            </Box>
        </Center>
    )
}
