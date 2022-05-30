import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalBody,
  Box,
  Center,
  Text,
  Image,
  Input,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import styles from "../../styles/modal.module.css";
import React, { useState, useEffect } from "react";
import md5 from "js-md5";
import axios from "../../utils/request";
import { ethers } from "ethers";

// common ga4 params
import ga4 from "../../utils/ga4";

export default function VerifySignModal(props) {
  const { isOpen, onClose } = props;
  const [verifySignContentShow, setVerifySignContentShow] = useState(true);
  const [errorShow, setErrorShow] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [verifySignSuccess, setVerifySignSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const errorMessage = "Something went wrong. Try to paste in the URL again.";

  const handleGoTwitter = async () => {
    // track connWallet
    if (!window.navigator.brave) {
      window.gtag("event", "verifySingToTwitter", ga4.trackParams);

      // fix data
      let data = {
        ...ga4.trackParams,
        ...{
          page_title: "verifySingPopExposures",
          page_location: location.href, // The full URL is required.
          send_to: ga4.MEASUREMENT_ID,
        },
      };
      
      window.gtag("event", "page_view", data);
    }

    // 1. Jump to Twitter
    let text1 = "The Midas Hand of Web3.0! @Laid_BackDC @Confti_";
    let url = "https://twitter.com/Laid_BackDC/status/1526750422828204032";
    let address = selectedAddress;
    if (!selectedAddress) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      address = accounts[0];
      setSelectedAddress(accounts[0]);
    }

    let text = `${text1} Signed by ${md5(address.toLowerCase())}`;
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`);
    // 2. Verifying URL information
    setVerifySignContentShow(false);
  };
  // Data is sent to the background for verification
  const handleClickConfirm = () => {
    // track comfFromWaitUrl
    if (!window.navigator.brave) {
      window.gtag("event", "comfFromWaitUrl", ga4.trackParams);
      // fix data
      let data = {
        ...ga4.trackParams,
        ...{
          page_title: "comfFromWaitUrlPopExposures",
          page_location: location.href, // The full URL is required.
          send_to: ga4.MEASUREMENT_ID,
        },
      };
      window.gtag("event", "page_view", data);
    }

    if (!loading) {
      if (!inputValue || inputValue.trim() === "") {
        setErrorShow(true);
        return;
      }
      setLoading(true);
      let authCodeArr = inputValue.split("/");
      let authCode = authCodeArr[authCodeArr.length - 1].split("?")[0];
      const params = {
        authCode,
        platform: "TWITTER",
        userAddress: selectedAddress,
      };
      axios.post("/user-signature/save", params).then((res) => {
        if (res.data.code === "200") {
          // success
          setVerifySignSuccess(true);

          // track singdPop
          if (!window.navigator.brave) {
            window.gtag("event", "signSuccess", ga4.trackParams);
          }
          setTimeout(() => {
            onClose();
          }, 2000);
          setLoading(false);
        } else {
          // error
          setErrorShow(true);
          setLoading(false);
        }
      });
    }
  };
  const handleBack = () => {
    // track backFromWaitUrl
    if (!window.navigator.brave) {
      window.gtag("event", "backFromWaitUrl", ga4.trackParams);

      // fix data
      let data = {
        ...ga4.trackParams,
        ...{
          page_title: "backFromWaitUrlPopExposures",
          page_location: location.href, // The full URL is required.
          send_to: ga4.MEASUREMENT_ID,
        },
      };
      window.gtag("event", "page_view", data);
    }

    init();
    setVerifySignContentShow(true);
  };

  // initialize
  const init = () => {
    setVerifySignContentShow(true);
    setVerifySignSuccess(false);
    setErrorShow(false);
    setInputValue("");
    setLoading(false);
  };

  useEffect(() => {
    if (window?.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      if (provider.provider.selectedAddress) {
        setSelectedAddress(provider.provider.selectedAddress);
      }
    }
    return () => {
      init();
    };
  }, []);

  useEffect(() => {
    init();
  }, [onClose]);

  useEffect(() => {
    if (window?.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      if (provider.provider.selectedAddress) {
        setSelectedAddress(provider.provider.selectedAddress);
      }
    }
    return () => {
      init();
    };
  }, []);

  useEffect(() => {
    init();
  }, [onClose]);

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent width={"500px"}>
        {!verifySignSuccess && (
          <Text className={"iconfont icon-ic_close"} onClick={onClose}></Text>
        )}
        <ModalBody width={"500px"} h={"280px"} bg={"white"}>
          {!verifySignSuccess && (
            <Box position="absolute" width={"100%"} top={"20px"}>
              <Center fontSize={"30px"}>VERIFY YOUR SIGNATURE</Center>
              {/* Step 1 Signature */}
              {verifySignContentShow && (
                <Box>
                  <Center>
                    <Box position={"relative"} mt={"15px"}>
                      <Box
                        position={"absolute"}
                        p={"15px 20px"}
                        fontSize={"14px"}
                        fontWeight="400"
                        fontFamily={"Arial"}
                      >
                        <Box>
                          <Flex>
                            <Text>1. </Text>
                            <Text>
                              Tweet a message to prove that you control this
                              address.
                            </Text>
                          </Flex>
                          <Flex my={"12px"} lineHeight={"18px"}>
                            <Text>2. </Text>
                            <Text>
                              Follow @Laid_BackDC @Confti_ and Tag 3 friends to
                              meet one of the contributor&apos;s criteria.
                            </Text>
                          </Flex>
                          <Flex>
                            <Text>3. </Text>
                            <Text>
                              Return back to this page afterwards to complete
                              verification.
                            </Text>
                          </Flex>
                        </Box>
                      </Box>
                      <Image src={"/images/line011.svg"}></Image>
                    </Box>
                  </Center>
                  <Center mt={"18px"}>
                    <Box
                      background="#C41A1F"
                      _hover={{ background: "#D62F34" }}
                      w={"118px"}
                      lineHeight={"36px"}
                      cursor={"pointer"}
                      borderRadius={"8px"}
                      onClick={handleGoTwitter}
                    >
                      <Text
                        className="iconfont icon-nav_ic_tw"
                        color={"#fff"}
                        fontSize={"28px"}
                        textAlign={"center"}
                      ></Text>
                    </Box>
                  </Center>
                </Box>
              )}
              {/* he second step validates the URL */}
              {!verifySignContentShow && (
                <Box>
                  <Center mb={"30px"} fontWeight={"500"}>
                    Paste the URL of the Twitter you just posted
                  </Center>
                  <Box position={"relative"} ml={"25px"}>
                    <Image src={"/images/input_line.svg"} />
                    <Input
                      className={styles.input}
                      placeholder={"twitter.com/username/status/1999"}
                      value={inputValue}
                      onChange={(event) => {
                        // track connWallet
                        if (!window.navigator.brave) {
                          window.gtag("event", "InputUrl", ga4.trackParams);
                          // fix data
                          let data = {
                            ...ga4.trackParams,
                            ...{
                              page_title: "InputUrlPopExposures",
                              page_location: location.href, // The full URL is required.
                              send_to: ga4.MEASUREMENT_ID,
                            },
                          };

                          window.gtag("event", "page_view", data);
                        }

                        setInputValue(event.target.value);
                      }}
                    ></Input>
                    {errorShow && (
                      <Text
                        color={"#C41A1F"}
                        position="absolute"
                        fontSize={"14px"}
                        mt={"5px"}
                      >
                        {errorMessage}
                      </Text>
                    )}
                  </Box>
                  <Center
                    justifyContent={"space-around"}
                    px={"40px"}
                    mt={"50px"}
                  >
                    <Box
                      className={styles.verify_modal_button}
                      cursor={"pointer"}
                      bgColor={"#fff"}
                      color={"#BDB090"}
                      _hover={{ bgColor: "#E9E9E9" }}
                      onClick={handleBack}
                    >
                      BACK
                    </Box>
                    <Box
                      className={styles.verify_modal_button}
                      cursor={loading ? "no-drop" : "pointer"}
                      color={"#fff"}
                      bgColor={"#C41A1F"}
                      _hover={{ bgColor: "#D62F34" }}
                      onClick={handleClickConfirm}
                    >
                      {loading ? (
                        <Box>
                          <Spinner />
                        </Box>
                      ) : (
                        "CONFIRM"
                      )}
                    </Box>
                  </Center>
                </Box>
              )}
            </Box>
          )}
          {/* The content is displayed after the signing */}
          {verifySignSuccess && (
            <Box position="absolute" width={"100%"} top={"45px"}>
              <Center fontSize={"30px"}>SIGNED COMPLETE</Center>
              <Center textAlign={"center"} fontSize={"14px"} mt={"15px"}>
                <Box width={"357px"}>
                  You have signed the imagination manifesto and become a member
                  of the Laid Back Dreamer Club!
                </Box>
              </Center>
              <Center mt={"15px"}>
                <Image src={"/images/ic_signature02.svg"} />
              </Center>
            </Box>
          )}
          <Image src={"/images/old-paper.jpg"} width={"100%"} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
