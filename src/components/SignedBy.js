import { Box, VStack, Image, Flex, Text } from "@chakra-ui/react"
import { spliceAddress } from '../utils/tools'
import React, { useState, useEffect, useMemo } from 'react';
import axios from "../utils/request";
import moment from "moment";

export default function SignedBy(props) {
    const { userAddressData, selectedAddress } = props
    const [listData, setListData] = useState([])
    const getPage = () => {
        const params = {
            count: true,
            pageNum: 1,
            pageSize: userAddressData ? 7 : 8,
            userAddress: selectedAddress
        }
        axios.get('/public/user-signature/pages', { params }).then(res => {
            if (res.data.data) {
                setListData(res.data.data.result)
            }
        })

    }
    useEffect(() => {
        if (userAddressData) {
            getPage()
        }
    }, [userAddressData])

    useMemo(() => {
        getPage()
    }, [])

    return (
        <VStack mt={'20px'}>
            {userAddressData && <Box h='130px' color={'#C41A1F'}>
                <Flex justifyContent={'space-between'} alignItems={'center'} >
                    <Flex alignItems={'Center'} w={'358px'}>
                        <Image src={userAddressData?.accountLogoUrl} borderRadius={'50%'}></Image>
                        <Text className={'ellipsis-line'} fontSize={'20px'} ml={'20px'} w={'290px'}>{userAddressData?.accountName}</Text>
                    </Flex>
                    <Box fontSize={'14px'} w={'184px'}>
                        <Text>{spliceAddress(userAddressData?.userAddress)}</Text>
                        <Text mt={'23px'}>{moment(userAddressData?.signTime).utc().format('DD-MM-YYYY HH:mm') } (UTC+0)</Text>
                    </Box>
                    <Box w={'358px'} textAlign={'right'}>
                        <Image src={'/images/ic_signature_my.svg'} />
                    </Box>
                </Flex>
                <Image src={'/images/border02.svg'}></Image>
            </Box>}
            {listData.map((item,i) => {
                return (
                    <Box h='130px' key={item.id} w={'1100px'}>
                        <Flex justifyContent={'space-between'} alignItems={'center'}>
                            <Flex alignItems={'Center'} w={'358px'}>
                                <Image src={item?.accountLogoUrl} borderRadius={'50%'}></Image>
                                <Text className={'ellipsis-line'} fontSize={'20px'} ml={'20px'} w={'290px'}>{item?.accountName}</Text>
                            </Flex>
                            <Box fontSize={'14px'} w={'184px'} >
                                <Text>{spliceAddress(item?.userAddress)}</Text>
                                <Text mt={'23px'}>{moment(item?.signTime).utc().format('DD-MM-YYYY HH:mm') } (UTC+0)</Text>
                            </Box>
                            <Box w={'358px'} textAlign={'right'}>
                                <Image src={'/images/ic_signature.svg'} />
                            </Box>
                        </Flex>
                        {i !== listData.length -1 && <Image src={'/images/border02.svg'}></Image>}
                    </Box>
                )
            })}
        </VStack>
    )
}
