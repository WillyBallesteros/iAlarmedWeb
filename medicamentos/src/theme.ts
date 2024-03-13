import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    background: "#1A2040",
    text: "#FFFFFF",
    primary: "#024C8B",
    secondary: "#278C7A",
    white: "#FFFFFF",
  },
  styles: {
    global: {
      body: {
        bg: "background",
        color: "text",
      },
    },
  },
  components: {
    Input: {
      variants: {
        outline: {
          field: {
            h: "55px",
            f: "16px",
            bg: "white",
            borderColor: "#79747E",
            color: "#000000",
            _placeholder: {
              color: "#979797",
            },
          },
        },
      },
    },
    Button: {
      baseStyle: {
        textTransform: "uppercase",
        borderRadius: 4,
        transition: "none",
      },
      variants: {
        enabled: {
          bg: "#1A2040",
          color: "#FFFFFF",
          _hover: {
            bg: "#00182D",
            color: "#FFFFFF",
          },
        },
        disabled: {
          bg: "#616161",
          color: "#FFFFFF",
        },
      },
    },
    FormLabel: {
      baseStyle: {
        fontSize: "14px",
        fontWeight: "regular",
        paddingLeft: "10px",
        paddingTop: "5px",
      },
    },
  },
});

export default theme;
