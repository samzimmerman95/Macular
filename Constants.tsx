import { StyleSheet, Dimensions, PixelRatio } from "react-native";
let sizeRatio = PixelRatio.getFontScale();
//Default font size is 14

//Fonts
export const BOLDFONT = "bold";
export const FONTSIZE = 17;

//Buttons
export const BUTTONHEIGHT = 25 * sizeRatio;
export const LIGHTGRAY = "#eee";
export const BUTTONTEXT = StyleSheet.create({
  buttonText: {
    fontSize: FONTSIZE,
  },
});

//Text Inputs
export const INPUTHEIGHT = 32 * sizeRatio;
export const BORDERRADIUS = 8;
export const INPUTPADLEFT = 10;
