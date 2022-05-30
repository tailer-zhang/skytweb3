import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalBody,
  Flex,
  Box,
  Center,
  Text,
  Image,
} from "@chakra-ui/react";

import React, { useState, useEffect } from "react";

// common ga4 params
import ga4 from "../../utils/ga4";
import {useIntl} from "react-intl";

export default function ManifestoModal(props) {
  const { isOpen, onClose } = props;

  const [isSendScroll, setIsSendScroll] = useState(false);
  let [startTime, setStartTime] = useState(null);
    const intl = useIntl()
  // on scroll 90% track user all readed
  const onScroll = (e) => {
    console.log(e.target.scrollTop);
    if (e.target.scrollTop > 2370) {
      // once track
      if (!isSendScroll) {
        // track manifestoPop
        if (!window.navigator.brave) {
          window.gtag("event", "manifestoPop", ga4.trackParams);
        }
        setIsSendScroll(true);
      }
    }
  };

  useEffect(() => {
    //  set time
    if (isOpen) {
      setStartTime(new Date());
    }
  }, [isOpen]);

  const onCloseEvent = () => {
    if (!window.navigator.brave) {

    let endTime = new Date();
    let e = endTime.getTime();
    let s = startTime.getTime();
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

      window?.gtag("event", "manifestStary", data);
    }

    onClose();
  };
  const content =
            "<span style='font-weight: bold'>Imagination Manifesto</span><br/><br/>Let Your Imagination Take Power, Let the Imagination Spread<br/><br/>We believe that in the web3 world and the future life.<br/><br/>Imagination will be the main productive force.<br/><br/>The imagination era has come.<br/><br/>Imagination can carry you through all the invisible walls.<br/><br/>This is the time when we write this Imagination Manifesto.<br/><br/>We are graphic designers, programmers, product managers, creators, electricians, tailors, tour guides, hairdressers...<br/><br/>We are veterinarians, news reporters, photographers, real estate agents, fishing boat sailors, bakers, air conditioning servicemen...<br/><br/>We are painters, warehouse managers, porters, farmers, tramps, night guards, surf instructors...<br/><br/>We are mfers, 3Landers, losers...<br/><br/>We are everybody.<br/><br/>No matter who we are, we all want to unleash our imagination.<br/><br/>We don’t want our imagination to be bound.<br/><br/>We want imagination to become powerful in web3.<br/><br/>We demand an imagination revolution.<br/><br/>We want to build a world dominated by imagination.<br/><br/>We Want to <i>Let Your Imagination Take Power.</i><br/><br/>This is our dream.<br/><br/><i>Wandering between two worlds, one dead, the other powerless to be born.</i><br/><br/>—Matthew Arnold<br/><br/>In 1922, T.S. Eliot published <i>The Waste Land</i>, the landmark modernist poem about the spiritual disillusionment and the spiritual wasteland of the post-World War I generation.<br/><br/>It was exactly 100 years ago. After 100 years, the wasteland still exists, and we are facing a bigger dilemma with the raging epidemic, military flareups, algorithmic-society prisoners, capitalist landscape of the world, consumerism disorder, personality annihilation...<br/><br/>They gathered for the feast.<br/><br/>They stab it with their steely knives.<br/><br/>But they just can't kill the beast.<br/><br/>We fell into the trap set by the time and are struggling to maintain the shaky balance. In the post-modern atomic society, we live like orphans with nowhere to go and yet are eager to change the world. We are both afraid of falling off the ladder and encouraged by false ambitions. We end up being the undead, forever hungry beast that never found its real food and never knew what it was.<br/><br/>Still, imagination can let us escape from the trap of time.<br/><br/>Ghosts of imagination are roaming web3.<br/><br/>Countless young people are waking up to web3.<br/><br/>They call for freedom with ancient hostility.<br/><br/>They are looking for changes and are getting out of control.<br/><br/>They embarked on a new journey in web3.<br/><br/>Let us say it again: Let Your Imagination Take Power!<br/><br/>We believe that in the web3 world imagination is the main productive force.<br/><br/>We must also understand that the nature of manifests and revolutions has changed. They are no longer political like <i>The Communist Manifesto</i> by Marx or as Raoul Vaneigem put it <i>“...the kind of revolution which revolutionaries make against themselves, that permanent revolution which is destined to usher in the sovereignty of life”.</i><br/><br/>Today’s world is full of invisible walls of big data and algorithms... We are brainwashed by illusory control and consumerism and trapped inside. Our Manifesto aims to get rid of the daily life controlled by capitalism and the consumption ideology, and to revive the poetic sovereignty of life.<br/><br/>According to Antonio Negri, capitalism now confronts not so much a working class as a <i>multitude</i> of dispersed subjectivities, collectivities and movements springing up across the globe from post-Fordism onwards. In a sense, we are all dispersed subjectivities of this age.<br/><br/>The founder of Lettrism Isidore Isou considered youth the new revolutionary class. Without the family and work burden, they are outside the capitalist market and temporarily free from its control.<br/><br/>Now, a new possibility arrived <i>the combination of web3 and youth </i> that will free up huge energy. The web3 youth is the new resistance. They are countless, distributed all over the world, and free from regional, racial, religious, or skin color constraints.<br/><br/>They are waking up and want to make the world better. They are young and free, beautiful and crazy.<br/><br/>They are not willing to be mainstreamed. They create through code, poetry, and text.<br/><br/>They long for freedom from data control, they look for new possibilities in life.<br/><br/>They embark on an unknown journey.<br/><br/>They are brave and adventurous.<br/><br/>Thus, at the dawn of web3, we repeat the call of Vaneigem: Let the imagination take power and break through the invisible walls.<br/><br/>We see that imagination spreads like a virus on web3. Communities like mfers, 3Landers, and Loser Club have emerged, where young people are full of imaginative and creative power. Nonetheless, we must remain vigilant. web3 is not a utopia, it is rather the knight who slays the dragon and eventually becomes the dragon himself because there is a monopoly issue in web3 like in web2. BAYC NFTs have become a social currency and status symbol for the selected few, and most people cannot afford them. They built high walls and left us on the outside. They got carried away from the original idea of web3. Opensea is now more like a closed sea. They are getting less sexy and losing their imagination. They are the knight who wanted to slay the dragon and is now turning into this dragon.<br/><br/>This is why we call on the web3 people all over the world to unite, make imagination the ultimate power and put the fruits of web3 in hands of the vast majority. If Marx’s old slogan <i>liquidate the exploiters</i> no longer echoes in the city, this is because it has been replaced with a new, more passionate one: <i>Let Your Imagination Take Power.</i><br/><br/>Previously, manifestos were initiated by one or several individuals (e.g., <i>The Communist Manifesto</i> by Marx and Engels. <i>The Manifesto of Surrealism</i> by André Breton. <i>The Manifesto of Infrarealism</i> by Roberto Bolaño, or<i> A Cypherpunk's Manifesto </i>by Eric Hughes in 1993, etc). This time, we want to make the manifesto different. We want to let more people join it and be its initiators.<br/><br/>Sign the manifesto and leave the marks you want to leave. Ultimately, this manifesto including the signatures of all participants will be minted as an NFT and serve as a testimony. Every participant will become a part of history and get a part of the manifesto.<br/><br/>We will also create a metaverse imagination paradise. Holding the manifesto part will be the key to entering it. The undersigned will be the natives who enter this imagination paradise.<br/><br/>The storm is coming. We stand at the point of no return.<br/><br/>Ghosts of imagination are already roaming web3.<br/><br/>References:<br/><br/><i>Hotel California lyrics by Eagles.</i><br/><br/><i>Raoul Vaneigem, The Revolution of Everyday Life: The Perspective of Power, 1967.</i>";
  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onCloseEvent}
      closeOnOverlayClick={false}
      size={'xl'}
    >
      <ModalOverlay />
      <ModalContent width={'1100px'} style={{
          maxWidth: '1100px'
      }} top={"50px"}>
        <Text
          className={"iconfont icon-ic_close"}
          onClick={onCloseEvent}
        ></Text>
        <ModalBody pl={0} pt={0} pr={0} pb={0} width={'1100px'} h={"800px"} bg={"transparent"}>
          <Box position="absolute" width={"100%"}>
            <Center
              width={"780px"}
              margin={"10px auto"}
              fontWeight={"700"}
              flexWrap={"wrap"}
              justifyContent={"right"}
            >
              <Box fontSize={"22px"}>
                  {
                      intl.formatMessage({id:'MatthewText'})
                  }
              </Box>
              <Box fontSize={"16px"} mb={"10px"}>
                {" "}
                  {
                      intl.formatMessage({id:'MatthewName'})
                  }
              </Box>
            </Center>
            <Box position={"relative"}>
              <Box position="absolute" top={"20px"} px={"40px"} w={"100%"}>
                <Flex justifyContent={"space-between"}>
                  <Image src={"/images/Modal_text01.svg"} />
                  <Box fontSize={"40px"} fontWeight={"700"} w={"270px"}>
                      {
                          intl.formatMessage({id:'Imagination'})
                      }
                  </Box>
                </Flex>
              </Box>
              <Image src={"/images/line4@2x.png"} width={"1100px"} />
            </Box>
            <Box position={"relative"}>
              <Box position="absolute" pl={"45px"} w={"100%"}>
                <Flex justifyContent={"space-between"}>
                  <Image src={"/images/Modal_Image01.svg"} />
                  <Box
                    className={"ManifestoScroll"}
                    width={"540px"}
                    mt={"13px"}
                    pt={"20px"}
                    height={"500px"}
                    overflowY={"auto"}
                    mr={"22px"}
                    onScroll={onScroll}
                  >
                    <Box padding={"0px 10px 20px"} fontFamily={"Arial"}>
                      <Box dangerouslySetInnerHTML={{ __html: content }}></Box>
                    </Box>
                  </Box>
                </Flex>
              </Box>
              <Center>
                <Image src={"/images/line5.svg"} mt={"10px"} />
              </Center>
            </Box>
          </Box>
          <Image src={"/images/popup_bg_Manifesto@2x.png"} width={"100%"} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
