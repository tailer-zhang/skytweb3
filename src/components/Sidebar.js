import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { getProcessJudge } from "../utils/connectWallet";
// common ga4 params
import ga4 from "../utils/ga4";
import {useIntl} from "react-intl";

// import ga4 from "../utils/track";
export default function Sidebar(props) {
  const { modalType, userAddressData } = props;
  const [signImageHover, setSignImageHover] = useState(false);
  const [manifestoImageHover, setManifestoImageHover] = useState(false);
  const [topImageHover, setTopImageHover] = useState(false);
  const intl = useIntl()
  //  Determine the process
  const handleProcessJudge = () => {
    // track singFromHomeSide
    if (!window.navigator.brave) {
      window.gtag("event", "singFromHomeSide", ga4.trackParams);
    }

    let value = getProcessJudge();

    if (!value) {
      modalType("SignModal");
    } else {
      modalType(value);
    }
  };

  // on Manifesto btn event
  const onManifesto = () => {
    // track manifestoFromHomeButtom
    if (!window.navigator.brave) {
      window.gtag("event", "manifestoFromHomeButtom", ga4.trackParams);
    }

    modalType("ManifestoModal");
  };

  // on goTop event
  const goTop = () => {
    // send track click top btn
    if (!window.navigator.brave) {
      window.gtag("event", "topFromHome", ga4.trackParams);
    }
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Box
      className={"sidebar_box"}
      position={"fixed"}
      top={"40%"}
      left={"88%"}
      background={"#DDD9D2"}
    >
      <Flex
        backgroundImage={
          userAddressData
            ? "/images/sidebar_border2.png"
            : "/images/sidebar_border1.png"
        }
        backgroundRepeat="no"
        width={"81px"}
        height={userAddressData ? "221px" : "321px"}
        fontWeight={"700"}
        flexWrap={"wrap"}
        textAlign={"center"}
        justifyContent={"center"}
      >
        {/* sign */}
        {!userAddressData && (
          <Box>
            <Image
              src={`/images/sidebar_ic_sign${
                signImageHover ? "_hover" : ""
              }.svg`}
              cursor={"pointer"}
              mt={"15px"}
              onMouseOver={() => setSignImageHover(true)}
              onMouseOut={() => setSignImageHover(false)}
              onClick={handleProcessJudge}
            />
            <Text fontSize={"12px"}>
                {
                    intl.formatMessage({id:'sign'})
                }
            </Text>
          </Box>
        )}
        {/* end of sign */}
        {/* MANIFESTO */}
        <Box onClick={onManifesto} mt={"10px"}>
          <Image
            src={`/images/sidebar_ic_manifesto${
              manifestoImageHover ? "_hover" : ""
            }.svg`}
            cursor={"pointer"}
            mt={"10px"}
            onMouseOver={() => setManifestoImageHover(true)}
            onMouseOut={() => setManifestoImageHover(false)}
          />
          <Text fontSize={"12px"}>
              {
                  intl.formatMessage({id:'manifesto'})
              }
          </Text>
        </Box>
        {/* end of MANIFESTO */}
        {/* gotop */}
        <Box mt={"22px"}>
          <Image
            src={`/images/sidebar_ic_top${topImageHover ? "_hover" : ""}.svg`}
            cursor={"pointer"}
            onMouseOver={() => setTopImageHover(true)}
            onMouseOut={() => setTopImageHover(false)}
            onClick={goTop}
          />
          <Text fontSize={"12px"}>
              {
                  intl.formatMessage({id:'top'})
              }
          </Text>
        </Box>
        {/* end of gotop */}
      </Flex>
    </Box>
  );
}
