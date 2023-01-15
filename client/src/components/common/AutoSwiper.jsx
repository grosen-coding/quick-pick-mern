import { Box } from "@mui/material";
import { Swiper } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";

const AutoSwiper = ({ children }) => {
  SwiperCore.use([Autoplay]);

  return (
    <Box
      sx={{
        "& .swiper-slide": {
          marginX: "10px",
          width: {
            xs: "50%",
            sm: "35%",
            md: "25%",
            lg: "20.5%",
          },
        },
      }}
    >
      <Swiper
        slidesPerView="auto"
        grabCursor={true}
        modules={[Autoplay]}
        style={{ width: "100%", height: "max-content" }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: true,
        }}
      >
        {children}
      </Swiper>
    </Box>
  );
};

export default AutoSwiper;
