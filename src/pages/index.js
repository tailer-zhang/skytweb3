/* eslint-disable jsx-a11y/alt-text */
// base
import React, { useState, useEffect } from "react";
import axios from "../utils/request";
import {useIntl} from 'react-intl'
// components
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import DreamerClub from "../components/DreamerClub";
import SignedBy from "../components/SignedBy";
import BrowserModal from "../components/Modal/BrowserModal";
import MetaMaskModal from "../components/Modal/MetaMaskModal";
import SignModal from "../components/Modal/SignModal";
import ManifestoModal from "../components/Modal/ManifestoModal";
import VerifySignModal from "../components/Modal/VerifySignModal";
// layout
import {
  Image,
  Box,
  Text,
  Flex,
  Center,
  useDisclosure,
  Tooltip,
} from "@chakra-ui/react";
import { ethers } from "ethers";

// function
import { getProcessJudge } from "../utils/connectWallet";

// css
import styles from "../styles/Home.module.css";

// common ga4 params
import ga4 from "../utils/ga4";

// init ga4 to global window.gtag(type,name,params)
import GA4React from "ga-4-react";
import { locales } from "moment";

const initGa4 = () => {
  // connect ga4
  try {
    const ga4react = new GA4React(ga4.MEASUREMENT_ID);
    // ga4 source code judgment brave browser while working with GTM
    if (
      typeof window["__ga4React__"] === "undefined" &&
      !window.navigator.brave
    ) {
      // init ga4 and isInitialized
      ga4react.initialize().then(() => {
        // search url ? after
        let urlSearch = window.location.search;
        let fromGroupList = urlSearch.substring(1).split("&");
        let fromGroupValue = "";
        let secFromGroupValue = "";

        // get fromGroup and secFromGroup
        fromGroupList.forEach((element, index) => {
          let val = element.split("=")[1];
          if (index === 0) {
            fromGroupValue = val;
          } else {
            secFromGroupValue = val;
          }
        });

        // first entry data
        let data = {
          ...ga4.trackParams,
          ...{
            page_title: "homePageExposures",
            page_location: window.location.href, // The full URL is required.
            send_to: ga4.MEASUREMENT_ID,
            fromGroup: fromGroupValue,
            secFromGroup: secFromGroupValue,
          },
        };
        window?.gtag("event", "page_view", data);
      });
    }
  } catch (error) {
    console.log("ga4 connent error");
  }
};

export default function Home(props) {
  const [buttonHover, setButtonHover] = useState(false);
  const [signButtonHover, setSignButtonHover] = useState(false);
  const intl = useIntl()
  // bind triggle event
  const {
    isOpen: BrowserModalIsOpen,
    onOpen: BrowserModalOpen,
    onClose: BrowserModalClose,
  } = useDisclosure();
  const {
    isOpen: MetaMaskModalIsOpen,
    onOpen: MetaMaskModalOpen,
    onClose: MetaMaskModalClose,
  } = useDisclosure();
  const {
    isOpen: SignModalIsOpen,
    onOpen: SignModalOpen,
    onClose: SignModalClose,
  } = useDisclosure();
  const {
    isOpen: ManifestoModalIsOpen,
    onOpen: ManifestoModalOpen,
    onClose: ManifestoModalClose,
  } = useDisclosure();
  const {
    isOpen: VerifySignModalIsOpen,
    onOpen: VerifySignModalOpen,
    onClose: VerifySignModalClose,
  } = useDisclosure();

  const [userAddressData, setUserAddressData] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [scrollSidebarShow, setScrollSidebarShow] = useState(false);
  // stay time
  let [startTime, setStartTime] = useState(null);

  const handleClickSign = () => {
    setSignButtonHover(true);
  };
  const getModalType = (type) => {
    switch (type) {
      case "SignModal":
        return SignModalOpen();
      case "BrowserModal":
        return BrowserModalOpen();
      case "MetaMaskModal":
        SignModalClose();
        return MetaMaskModalOpen();
      case "ManifestoModal":
        // track manifestoFromHomePic
        if (!window.navigator.brave) {
          window.gtag("event", "manifestoFromHomePic", ga4.trackParams);
        }
        return ManifestoModalOpen();
      case "VerifySignModal":
        SignModalClose();
        return VerifySignModalOpen();
    }
  };
  //  Determine the process
  const handleProcessJudge = (type) => {
    let trackName = "singFromHomeTop";
    if (type === "bottom") {
      trackName = "singFromHomeBottom";
    }
    // track top or bottom
    if (!window.navigator.brave) {
      window.gtag("event", trackName, ga4.trackParams);
    }
    let value = getProcessJudge();
    if (!value) {
      SignModalOpen();
    } else {
      getModalType(value);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);
    // Due to environmental problems, the status cannot be obtained after deployment, so a delay is added
    setTimeout(() => {
      // init ga4
      initGa4();
      setStartTime(new Date());
      if (window?.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        if (provider.provider.selectedAddress) {
          setSelectedAddress(provider.provider.selectedAddress);
        }
      }
    }, 500);
    return (startTime) => {
      window.removeEventListener("scroll", handleScroll, true); //  clear scroll event

      let endTime = new Date();
      let e = endTime.getTime();
      let s = startTime?.getTime();
      let stay = parseInt(e - s) / 1000;

      // first entry data
      let data = {
        ...ga4.trackParams,
        ...{
          startTime,
          endTime,
          stay,
        },
      };
      if (!window.navigator.brave) {
        window?.gtag("event", "homePageStay", data);
      }
    };
  }, []);

  const handleScroll = () => {
    let scrollTop = document.documentElement.scrollTop;
    setScrollSidebarShow(scrollTop > 600 ? true : false);
  };
  const handleVerifySignModalClose = () => {
    VerifySignModalClose();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    getUserAddressData(provider.provider.selectedAddress);
  };

  const getUserAddressData = (selectedAddress) => {
    axios.get(`/user-signature?userAddress=${selectedAddress}`).then((res) => {
      if (res.data.data) {
        setUserAddressData(res.data.data);
      }
    });
  };
  //  If the current user logs in to the wallet, the wallet address of the current user is directly obtained
  useEffect(() => {
    if (selectedAddress) {
      getUserAddressData(selectedAddress);
    }
  }, [selectedAddress]);

  //    go Discord
  const goDiscord = () => {
    // track leaveHomeBottomToDiscord
    if (!window.navigator.brave) {
      window.gtag("event", "leaveHomeBottomToDiscord", ga4.trackParams);
    }
  };
  //   go Twitter
  const goTwitter = () => {
    // track leaveHomeBottomToTwitter
    if (!window.navigator.brave) {
      window.gtag("event", "leaveHomeBottomToTwitter", ga4.trackParams);
    }
    // new tab
    window.open("https://twitter.com/Laid_BackDC");
  };

  // top book event
  const goManifesto = () => {
    // track manifestoFromHomeBottom
    if (!window.navigator.brave) {
      window.gtag("event", "manifestoFromHomeBottom", ga4.trackParams);
    }

    getModalType("ManifestoModal");
  };
    const handlelanguage = function (value) {
        props.handlelanguage(value)
    }
  return (
    <div className={styles.container}>
      <Nav
        modalType={(type) => {
          getModalType(type);
        }}
        getSelectedAddress={(val) => {
          setSelectedAddress(val);
        }}
        selectedAddress={selectedAddress}
        handlelanguage={handlelanguage}
      />
      <main className={styles.main}>
        <Box
          position={"relative"}
          bgImage={"/images/bg_image.jpg"}
          width={"100%"}
          height={"800px"}
          backgroundSize={"100% 100%"}
          overflow={"hidden"}
        >
          <Flex width={"70%"} margin={"100px auto 0px"} justifyContent={"left"}>
            <Box>
              <Image src={"/images/bannerTitle.png"}></Image>
              <Box mt={"300px"}>
                <Image src={"/images/bannerTitle02.svg"}></Image>
                <Text
                  color={"#fff"}
                  fontFamily={"Arial"}
                  mt={"2%"}
                  fontWeight={"700"}
                >
                    {
                        intl.formatMessage({id:'bannerSubContent'})
                    }
                </Text>
                {userAddressData ? (
                  <Box w={"249px"} mt={"20px"}>
                    <Image src={`/images/line3.svg`} />
                    <Center color={"#fff"} fontWeight={"700"} mt={"-30px"}>
                        {
                            intl.formatMessage({id:'signedButtonText'})
                        }
                    </Center>
                  </Box>
                ) : (
                  <Box
                    w={"249px"}
                    cursor={"pointer"}
                    height={"35px"}
                    mt={"20px"}
                    onMouseOver={() => setSignButtonHover(true)}
                    onMouseOut={() => setSignButtonHover(false)}
                    onClick={handleClickSign}
                  >
                    <Image
                      src={`/images/button01${
                        signButtonHover ? "_hover" : ""
                      }.svg`}
                    ></Image>
                    <Center
                      color={signButtonHover ? "#fff" : "#C41A1F"}
                      fontWeight={"700"}
                      mt={"-30px"}
                      onClick={handleProcessJudge}
                    >
                        {
                            intl.formatMessage({id:'signButtonText'})
                        }
                    </Center>
                  </Box>
                )}
              </Box>
            </Box>
            <Box mt={"80px"} position="relative">
              <Tooltip label="Manifesto" className={"my_tootip_Manifesto_css"}>
                <Image
                  className={styles.book}
                  src={"/images/book.webp"}
                  position={"relative"}
                  top={"100px"}
                  cursor={"pointer"}
                  onClick={goManifesto}
                ></Image>
              </Tooltip>
            </Box>
          </Flex>
        </Box>
        <DreamerClub />
        <Image src={"/images/title02.svg"} mt={"100px"}></Image>
        <Flex position={"relative"} flexWrap={"wrap"} justifyContent={"center"}>
          {userAddressData ? (
            <Image src={"/images/img07_sign.png"} mt={"50px"}></Image>
          ) : (
            <Image src={"/images/img07.png"} mt={"50px"}></Image>
          )}
          <Box
            position={"absolute"}
            right={"-15px"}
            width={"360px"}
            top={"166px"}
          >
            <Text className={styles.textTitle}>
                {
                    intl.formatMessage({id:'entryTitle'})
                }
            </Text>
            <Text fontFamily={"Arial"} fontSize={"14px"}>
                {
                    intl.formatMessage({id:'entryContent'})
                }
            </Text>
            <Text className={styles.textTitle} mt={"55px"}>
                {
                    intl.formatMessage({id:'airdropTitle'})
                }
            </Text>
            <Text fontFamily={"Arial"} fontSize={"14px"}>
                {
                    intl.formatMessage({id:'airdropContent'})
                }
            </Text>
          </Box>
          <Box position={"absolute"} bottom={"70px"}>
            {userAddressData ? (
              <Box>
                <Image src={"/images/title04.svg"} />
                <Center textAlign={"center"} mt={"20px"}>
                  <Text width={"515px"} fontSize={"20px"}>
                      {
                          intl.formatMessage({id:'signedSuccess'})
                      }
                  </Text>
                </Center>
              </Box>
            ) : (
              <Image
                cursor={"pointer"}
                src={`/images/button${buttonHover ? "_hover" : ""}.svg`}
                onMouseOver={() => setButtonHover(true)}
                onMouseOut={() => setButtonHover(false)}
                onClick={() => handleProcessJudge("bottom")}
              ></Image>
            )}
          </Box>
        </Flex>
        <Image src={"/images/title03.svg"} mt={"140px"}></Image>
        <SignedBy
          userAddressData={userAddressData}
          selectedAddress={selectedAddress}
        />
      </main>
      {scrollSidebarShow && (
        <Sidebar
          modalType={(type) => {
            getModalType(type);
          }}
          userAddressData={userAddressData}
        />
      )}
      <BrowserModal
        isOpen={BrowserModalIsOpen}
        onClose={() => BrowserModalClose()}
      />
      <MetaMaskModal
        isOpen={MetaMaskModalIsOpen}
        onClose={() => MetaMaskModalClose()}
      />
      <SignModal
        isOpen={SignModalIsOpen}
        onClose={() => SignModalClose()}
        modalType={(type) => {
          getModalType(type);
        }}
      />
      <ManifestoModal
        isOpen={ManifestoModalIsOpen}
        onClose={() => ManifestoModalClose()}
      />
      <VerifySignModal
        isOpen={VerifySignModalIsOpen}
        onClose={() => handleVerifySignModalClose()}
        selectedAddress={selectedAddress}
      />
      <Box py={"50px"} maxW={"1600px"} margin={"0 auto"}>
        <Box lineHeight={"5px"} mb={"40px"}>
          <Image src={"/images/Vector.svg"} w={"100%"}></Image>
        </Box>
        <Center>
          <Tooltip label="Coming soon, stay tuned" className={"my_tootip_css"}>
            <Image
              onClick={goDiscord}
              src={"/images/Group.svg"}
              width={"58px"}
            ></Image>
          </Tooltip>
          <Text
            className="iconfont icon-nav_ic_tw"
            cursor={"pointer"}
            color={"#898989"}
            _hover={{ color: "#0090ED" }}
            fontSize={"58px"}
            ml={"50px"}
            onClick={goTwitter}
          ></Text>
        </Center>
        <Center>
          <Text fontFamily={"Arial"} fontSize={"14px"} mt={"28px"}>
              {
                  intl.formatMessage({id:'licence'})
              }
          </Text>
        </Center>
      </Box>
    </div>
  );
}
