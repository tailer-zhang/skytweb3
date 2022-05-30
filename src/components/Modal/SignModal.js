import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalBody,
  ModalCloseButton,
  Box,
  Center,
  Image,
  Text,
} from "@chakra-ui/react";

import { ethers } from "ethers";

// common ga4 params
import ga4 from "../../utils/ga4";
import {useIntl} from "react-intl";

export default function SignModal(props) {
  const { isOpen, onClose, modalType } = props;
  const intl = useIntl()

  const handleClick = async () => {
    // track connWallet
    if (!window.navigator.brave) {
      window.gtag("event", "connWallet", ga4.trackParams);

      // fix data
      let data = {
        ...ga4.trackParams,
        ...{
          page_title: "connWalletPopExposures",
          page_location: location.href, // The full URL is required.
          send_to: ga4.MEASUREMENT_ID,
        },
      };

      window.gtag("event", "page_view", data);
    }

    // Check if there is a connected wallet. If not, connect the wallet first
    if (window?.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      if (provider.provider.selectedAddress) {
        getChainId();
      } else {
        await provider.send("eth_requestAccounts", []);
        getChainId();
      }
    }
  };
  const getChainId = async () => {
    //  Is it a primary link? Only the primary link can be signed
    //  get chainId
    const chainId = ethereum.networkVersion;
    if (chainId !== "1") {
      window.ethereum
        .request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x1",
              chainName: "rinkebyETH testnet",
            },
          ],
        })
        .catch((error) => {
          console.log(error);
        });

      await window.ethereum
        .request({
          method: "wallet_switchEthereumChain",
          params: [
            {
              chainId: "0x1",
            },
          ],
        })
        .then(() => {
          handleSign();
          return;
        })
        .catch((e) => {
          console.log("wallet_switchEthereumChain error: ", e);
          return;
        })
        .finally(() => {});
    } else {
      handleSign();
    }
  };
  const handleSign = async () => {
    // deep copy
    let data = { ...ga4.trackParams };

    // Invoking wallet signature
    var provider = new ethers.providers.Web3Provider(window["ethereum"]);
    console.log("provider", provider);
    var signer = await provider.getSigner();
    console.log("signer", signer);
    // The return after obtaining the signature
    try {
      const message = await signer.signMessage(
        "The Midas Hand of Web3.0! @Laid_BackDC @Confti_"
      );

      data.result = true;
      // ga4 can't accpet 0x000 string
      data.user_id = provider.provider.selectedAddress.substring(1);
      // track connWallet
      if (!window.navigator.brave) {
        window.gtag("event", "getWalletRespon", data);
      }
    } catch (error) {
      data.result = false;
      // track connWallet
      if (!window.navigator.brave) {
        window.gtag("event", "getWalletRespon", data);
      }
      return;
    }

    // console.log(message)
    // The verify signature dialog box is displayed
    modalType("VerifySignModal");
  };

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
          <Box position="absolute" width={"100%"} top={"10px"}>
            <Center
              fontSize={"26px"}
              mt={"10px"}
              fontWeight={"bold"}
              fontFamily={"Roboto"}
            >
                {
                    intl.formatMessage({id:'wallet'})
                }
            </Center>
            <Center mb={"10px"}>Click below:</Center>
            <Center
              backgroundImage={"/images/line03.svg"}
              margin={"auto"}
              onClick={handleClick}
              _hover={{ backgroundColor: "#c2aa78" }}
              _active={{ backgroundColor: "#c2aa78" }}
              cursor={"pointer"}
              backgroundRepeat={"no-repeat"}
              h={"165px"}
              width={"282px"}
            >
              <Image src={"/images/ic_metamask02.svg"} w={"134px"}></Image>
            </Center>
          </Box>
          <Image src={"/images/old-paper.jpg"} width={"100%"} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
