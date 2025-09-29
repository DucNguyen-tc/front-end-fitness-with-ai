import { Button, Container, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import logo from "../../assets/logo.png";

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-gray-900 to-black shadow-lg ">
      {/* Top Info Bar */}

      {/* Main Header */}
      <Box className="flex justify-between items-center px-4 sm:px-6 py-4 sm:py-6 mx-16">
        {/* Logo */}
        <Box className="flex items-center gap-2 mb-2 sm:mb-0">
          <img src={logo} alt="Logo" className="h-10 w-10" />
          <Typography
            variant={isMobile ? "h6" : "h5"}
            className="font-extrabold tracking-tight text-white"
          >
            <span className="text-red-500">FITNESS</span> <br /> WITH US
          </Typography>
        </Box>
        {/* Navigation */}
        <nav>
          <ul
            className={`flex ${
              isMobile ? "flex-col gap-2" : "gap-8"
            } text-sm font-medium`}
          >
            {["HOME", "ABOUT US", "PAGES", "SERVICES", "BLOG"].map((item) => (
              <li
                key={item}
                className="relative group cursor-pointer text-gray-200 hover:text-red-500 transition-colors duration-300"
              >
                {item}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300" />
              </li>
            ))}
          </ul>
        </nav>
        <Button
          variant="contained"
          color="error"
          size="small"
          className="rounded-full px-4 py-1.5 font-semibold hover:bg-red-700 transition-colors"
        >
          CONTACT US
        </Button>
      </Box>
    </header>
  );
};

export default Header;
