import { Button, Typography, Container, Box } from "@mui/material";
import HeroSectionImage from "../../../assets/heroSectionImage.png"; // đúng đường dẫn

export default function HeroSection() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Ảnh nền */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${HeroSectionImage})` }}
      />

      {/* Overlay mờ */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/100 to-transparent"></div>

      {/* Nội dung */}

      <Container className="relative z-20 h-full flex items-center">
        <Box className="text-left max-w-xl space-y-6">
          <Typography
            variant="h4"
            sx={{
              fontWeight: 900,
              textTransform: "uppercase",
              color: "#d32f2f", // orange-500
            }}
          >
            Step up your
          </Typography>

          <Typography
            variant="h2"
            className="uppercase font-extrabold leading-tight text-white"
          >
            Fitness <br /> with Gimnas
          </Typography>

          <Button
            variant="contained"
            sx={{
              bgcolor: "#d32f2f",
              borderRadius: "9999px",
              px: 4,
              py: 1.5,
              textTransform: "none",
              fontWeight: "bold",
              "&:hover": {
                bgcolor: "#f44336",
              },
            }}
          >
            Become Member
          </Button>
        </Box>
      </Container>
    </div>
  );
}
