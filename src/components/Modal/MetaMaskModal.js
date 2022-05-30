import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalBody,
  ModalCloseButton,
  Box,
  Center,
  Text,
  Image,
} from "@chakra-ui/react";

// common ga4 params
import ga4 from "../../utils/ga4";
import {useIntl} from "react-intl";

export default function MetaMaskModal(props) {
    const intl = useIntl()
  const { isOpen, onClose } = props;
  const handleOpenMetaMask = () => {
    // track top or bottom
    if (!window.navigator.brave) {
      window.gtag("event", "InstallWallet", ga4.trackParams);

      // fix data
      let data = {
        ...ga4.trackParams,
        ...{
          page_title: "InstallWalletPopExposures",
          page_location: location.href, // The full URL is required.
          send_to: ga4.MEASUREMENT_ID,
        },
      };

      window.gtag("event", "page_view", data);
    }

    window.open("https://metamask.io/");
  };
  const handleClick = () => {
    window.location.reload();
  };
  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <Text className={"iconfont icon-ic_close"} onClick={onClose}></Text>
        <ModalBody pl={0} pt={0} pr={0} pb={0} width={"500px"} h={"280px"} bg={"transparent"}>
          <Box position="absolute" width={"100%"} top={"30px"}>
            <Center>
              <Image src={"/images/ic_metamask02.svg"}></Image>
            </Center>
            <Center
              fontSize={"26px"}
              mt={"10px"}
              fontWeight={"bold"}
              fontFamily={"Roboto"}
            >
              MetaMask
            </Center>
            <Center mt={"20px"} fontFamily={"Roboto"} flexWrap={"wrap"}>
              <Text w={"400px"} textAlign={"center"}>
                You need to install Metamask to continue,
              </Text>
              <Center w={"400px"} textAlign={"center"}>
                <Text
                  color={"#0091FF"}
                  cursor={"pointer"}
                  onClick={handleClick}
                >
                  refresh the page&nbsp;
                </Text>{" "}
                after installation
              </Center>
              <Box
                w={"158px"}
                cursor={"pointer"}
                mt={"30px"}
                textAlign={"center"}
                borderRadius={"8px"}
                color={"white"}
                lineHeight={"36px"}
                fontSize={"16px"}
                bg={"#C41A1F"}
                _hover={{ backgroundColor: "#D62F34" }}
                onClick={handleOpenMetaMask}
              >
                  {
                      intl.formatMessage({id:'openMetaMask'})
                  }
              </Box>
            </Center>
          </Box>
          <Image src={"/images/old-paper.jpg"} width={"100%"} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
