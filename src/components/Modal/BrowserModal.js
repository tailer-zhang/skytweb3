import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalBody,
  Box,
  Flex,
  Center,
  Text,
  Image,
} from "@chakra-ui/react";

import React, { useEffect } from "react";

// common ga4 params
import ga4 from "../../utils/ga4";

export default function BrowserModal(props) {
  const { isOpen, onClose } = props;
  const iconData = [
    { src: "/images/logo_chrome.svg", title: "Chrome" },
    { src: "/images/logo_firefox.svg", title: "Firefox" },
    { src: "/images/logo_brave.svg", title: "Brave" },
    { src: "/images/logo_edge.svg", title: "Edge" },
  ];

  useEffect(() => {
    setTimeout(() => {
      // open dialog track
      if (isOpen) {
        // track chooseBrowserView
        if (!window.navigator.brave) {
          window.gtag("event", "chooseBrowserView", ga4.trackParams);

          // fix data
          let data = {
            ...ga4.trackParams,
            ...{
              page_title: "chooseBrowserPopExposures",
              page_location: window.location.href, // The full URL is required.
              send_to: ga4.MEASUREMENT_ID,
            },
          };

          window.gtag("event", "page_view", data);
        }
      }
    }, 1000);
  }, [isOpen]);

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent width={"500px"}>
        <Text className={"iconfont icon-ic_close"} onClick={onClose}></Text>
        <ModalBody width={"500px"} h={"280px"} bg={"white"}>
          <Box position="absolute" width={"100%"} top={"70px"}>
            <Flex justifyContent={"space-around"} zIndex={1} fontSize={"16px"}>
              {iconData.map((item) => {
                return (
                  <Box key={item.title}>
                    <Image src={item.src} />
                    <Center mt={"10px"} fontWeight={"500"}>
                      {item.title}
                    </Center>
                  </Box>
                );
              })}
            </Flex>
            <Center mt={"50px"} fontFamily={"Roboto"}>
              Only the preceding browsers are supported
            </Center>
          </Box>
          <Image src={"/images/old-paper.jpg"} width={"100%"} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
