import { useState, useEffect } from "react";
import { Box, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import {ChevronRightIcon,ChevronLeftIcon} from "@chakra-ui/icons"
import Link from "next/link";

const images = [
  {
    url:
      "https://cdn.shopify.com/s/files/1/0650/8609/files/rolex_preowned_Banner_1.jpg?v=1619813418",
    alt: "Relojes Rolex",
    desc: "Relojes Rolex",
    href:"/Rolex",
  },
  {
    url:
      "https://anscommerce.s3.ap-south-1.amazonaws.com/live/image/catalog/brandstore/johnson/Information/service-center-5.jpg",
    alt: "Relojes Omega",
    desc: "Relojes Omega",
    href:"/Omega",
  },
  {
    url:
      "https://www.revolution.watch/mxl/wp-content/uploads/2019/05/01-Monaco-1969-1979-Limited-Edition_0989.jpg",
    alt: "Relojes Tag Heuer",
    desc: "Relojes Tag Heuer",
    href:"/Tag Heuer",
  },
];

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

export default function Banner() {
    const [currentImage, setCurrentImage] = useState(0);
    const [direction, setDirection] = useState(0);
  
    useEffect(() => {
      const timer = setInterval(() => {
        setDirection(1);
        setCurrentImage((prevImage) =>
          prevImage === images.length - 1 ? 0 : prevImage + 1
        );
      }, 5000);
  
      return () => clearInterval(timer);
    }, []);
  
    const prevImage = currentImage === 0 ? images.length - 1 : currentImage - 1;
    const nextImage =
      currentImage === images.length - 1 ? 0 : currentImage + 1;
  
    return (
      <Box position="relative" width="100%" height="400px">
        <motion.div
          key={currentImage}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5 }}
        >
        <Link href={images[currentImage].href}>
            <Image
                position="absolute"
                src={images[currentImage].url}
                alt={images[currentImage].alt}
                objectFit="cover"
                width="100%"
                height="100%"
            />
        </Link>
        </motion.div>
        <Box
          position="absolute"
          top="50%"
          left="0"
          transform="translateY(-50%)"
          zIndex="10"
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          px={4}
        >
          <Box
            onClick={() => {
              setDirection(-1);
              setCurrentImage(prevImage);
            }}
            cursor="pointer"
          >
            <ChevronLeftIcon  
              width="30px"
              height="30px"
              color='whiteAlpha.500'
            />
          </Box>
          <Box
            onClick={() => {
              setDirection(1);
              setCurrentImage(nextImage);
            }}
            cursor="pointer"
          >
            <ChevronRightIcon
              width="30px"
              height="30px"
              color='whiteAlpha.500'
            />
          </Box>
        </Box>
      </Box>
    );
  }