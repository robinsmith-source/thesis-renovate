import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import { nextui } from "@nextui-org/react";
import { withUt } from "uploadthing/tw";

export default withUt({
  content: [
    "./src/**/*.tsx",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        sm: '0.750rem',
        base: '1rem',
        xl: '1.333rem',
        '2xl': '1.777rem',
        '3xl': '2.369rem',
        '4xl': '3.158rem',
        '5xl': '4.210rem',
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      fontWeight: {
        normal: '400',
        bold: '700',
      }
    },
    darkMode: "class",
  },
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: "#ebebeb",  // this is the default background color
            foreground: "#262626",  // use this for text
            primary: {              // use this for the most important interaction elements
              "50": "#f0fee7",
              "100": "#defccb",
              "200": "#bef99d",
              "300": "#96f165",
              "400": "#6fe534",
              "500": "#50cb17",
              "600": "#3aa20e",
              "700": "#2e7c0f",
              "800": "#286212",
              "900": "#245314",
              DEFAULT: "#6fe534",
            },
            secondary: {            // use this for secondary interaction elements
              "50": "#fbf6fe",
              "100": "#f6ebfc",
              "200": "#eedafa",
              "300": "#e1bdf5",
              "400": "#cf93ed",
              "500": "#bb69e3",
              "600": "#a84ad3",
              "700": "#9138b8",
              "800": "#793297",
              "900": "#63297a",
              DEFAULT: "#55176d",
            },
            success: {              // use this for success messages or accents
              "50": "#edfaff",    
              "100": "#d6f1ff",
              "200": "#b6e9ff",
              "300": "#85ddff",
              "400": "#4bc7ff",
              "500": "#22a9ff",
              "600": "#0a8bff",
              "700": "#0472f1",
              "800": "#0a5bc3",
              "900": "#0f4f99",
              DEFAULT: "#0a5bc3",
            },
            warning: {              // use this for warning messages or accents
              "50": "#FFF9E7",             
              "100": "#FEF3CC",
              "200": "#FDE399",
              "300": "#FBCD66",
              "400": "#F7B840",
              "500": "#F29704",
              "600": "#D07902",
              "700": "#AE5E02",
              "800": "#8C4601",
              "900": "#743600",
            },
            danger: {               // use this for error messages or accents
              "50": "#FFEFE7",               
              "100": "#FFE6D7",
              "200": "#FFC8B0",
              "300": "#FFA288",
              "400": "#FF7F6B",
              "500": "#FF443A",
              "600": "#DB2A30",
              "700": "#B71D2F",
              "800": "#93122C",
              "900": "#7A0B2A",
              DEFAULT: "#FF443A",
            },
          },
        },
        dark: {
          colors: {
            background: "#141414",  // this is the default background color
            foreground: "#d9d9d9", // use this for text
            primary: {              // use this for the most important interaction elements
              "50": "#f1fee7",
              "100": "#dffbcc",
              "200": "#c0f79f",
              "300": "#98ef67",
              "400": "#74e239",
              "500": "#55cb1a",
              "600": "#3da010",
              "700": "#317a11",
              "800": "#2a6014",
              "900": "#255215",
              DEFAULT: "#55cb1a",
            },
            secondary: {            // use this for secondary interaction elements
              "50": "#fbf7fd",
              "100": "#f6ecfb",
              "200": "#efdcf8",
              "300": "#e2c0f2",
              "400": "#cf92e8",
              "500": "#be6fdd",
              "600": "#ac50cd",
              "700": "#953db3",
              "800": "#7c3693",
              "900": "#652d76",
              DEFAULT: "#cf92e8",
            },
            success: {              // use this for success messages or accents
              "50": "#eefbfd",
              "100": "#d4f3f9",
              "200": "#afe6f2",
              "300": "#77d4e9",
              "400": "#31b5d6",
              "500": "#1d9bbd",
              "600": "#1b7d9f",
              "700": "#1c6582",
              "800": "#20536a",
              "900": "#1e465b",
              DEFAULT: "#31b5d6",
            },
            warning: {            // use this for warning messages or accents
              "50": "#FEF7E7",
              "100": "#FEF2DD",
              "200": "#FDE3BB",
              "300": "#F9CD98",
              "400": "#F3B77D",
              "500": "#EB9653",
              "600": "#CA733C",
              "700": "#A95329",
              "800": "#88381A",
              "900": "#70250F",
            },
            danger: {             // use this for error messages or accents
              "50": "#FDF0E7",
              "100": "#F9D6D1",
              "200": "#F4A8A5",
              "300": "#DE7278",
              "400": "#BE4A5C",
              "500": "#931C3A",
              "600": "#7E1439",
              "700": "#690E36",
              "800": "#550832",
              "900": "#46052F",
              DEFAULT: "#931C3A",
            },
          },
        },
      },
    }),
  ],
} satisfies Config);
