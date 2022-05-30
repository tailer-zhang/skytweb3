import { Box, Flex, Image, Text, Tooltip, Select } from "@chakra-ui/react";
import styles from "../styles/Home.module.css";
import { ethers } from "ethers";
import React, { useState, useEffect } from "react";
import { spliceAddress } from "../utils/tools";
import { getProcessJudge } from "../utils/connectWallet";
import Jazzicon from "react-jazzicon";
import { set } from "lodash";

// common ga4 params
import ga4 from "../utils/ga4";
import {useIntl} from "react-intl";

export default function Nav(props) {
  const { modalType, getSelectedAddress, selectedAddress } = props;
  const [account, setAccount] = useState(null);
  const intl = useIntl()
  const handleConnectWallet = async () => {
    if (!account) {
      // track connWalletButton
      if (!window.navigator.brave) {
        window.gtag("event", "connWalletButton", ga4.trackParams);
      }

      // Determine the process
      let value = getProcessJudge();
      if (value) {
        modalType(value);
        return;
      } else {
        // connect wallet
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setAccount(accounts[0]);
        getSelectedAddress(accounts[0]);
      }
    }
  };
  //    go Discord
  const goDiscord = () => {
    // track leaveHomeTopToDiscord
    if (!window.navigator.brave) {
      window.gtag("event", "leaveHomeTopToDiscord", ga4.trackParams);
    }
  };
  //   go Twitter
  const goTwitter = () => {
    // track leaveHomeTopToTwitter
    if (!window.navigator.brave) {
      window.gtag("event", "leaveHomeTopToTwitter", ga4.trackParams);
    }
    // new tab
    window.open("https://twitter.com/Laid_BackDC");
  };
  useEffect(() => {
    if (selectedAddress) {
      setAccount(selectedAddress);
    } else {
      // Due to environmental problems, the status cannot be obtained after deployment, so a delay is added
      setTimeout(() => {
        if (window?.ethereum) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          if (provider.provider.selectedAddress) {
            setAccount(provider.provider.selectedAddress);
          }
        }
      }, 500);
    }
  }, [selectedAddress]);

  const handleLanguage = function (e) {
      props.handlelanguage(e.target.value)
  }
  return (
    <Box>
      <Flex
        alignItems={"center"}
        width={"70%"}
        margin={"0 auto"}
        justifyContent={"space-between"}
        pt={"5px"}
      >
        <Image width={"50px"} src={"/images/logo.jpg"}></Image>
        <Flex alignItems={"center"}>
          <Tooltip label="Coming soon, stay tuned" className={"my_tootip_css"}>
            <Image
              onClick={goDiscord}
              src={"/images/Group.svg"}
              cursor={"pointer"}
            ></Image>
          </Tooltip>
          <Text
            className="iconfont icon-nav_ic_tw"
            cursor={"pointer"}
            color={"#898989"}
            _hover={{ color: "#0090ED" }}
            fontSize={"28px"}
            mx={"20px"}
            onClick={goTwitter}
          ></Text>
          {account ? (
            <Flex
              className={styles.buttonRed}
              _hover={{ backgroundImage: "/images/background_red_hover.png" }}
              pl={"8px"}
            >
              <Box mx={"10px"}>
                <Jazzicon
                  diameter={10}
                  seed={parseInt(account.slice(2, 10), 16)}
                />
              </Box>{" "}
              <Text>{spliceAddress(account)}</Text>
            </Flex>
          ) : (
            <Box
              className={styles.buttonRed}
              _hover={{ backgroundImage: "/images/background_red_hover.png" }}
              onClick={handleConnectWallet}
            >
                {
                    intl.formatMessage({id:'wallet'})
                }
            </Box>

          )}
            <Box ml={10}>
                <Select onChange={handleLanguage}>
                    <option selected value='en-US'>English</option>
                    <option value='zh-TW'>中文繁体</option>
                    <option value='ja-JP'>日語</option>
                    <option value='ko-KR'>한국인</option>
                    <option value='ar-EG'>عربي</option>
                </Select>
            </Box>

        </Flex>
      </Flex>
      <Box maxW={"1600px"} margin={"0 auto"} lineHeight={"5px"}>
        <Image src={"/images/Vector.svg"} w={"100%"}></Image>
      </Box>
    </Box>
  );
}
