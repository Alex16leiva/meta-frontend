import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    title: string;

    colors: {
      palette: {
        lightBlue: string;
        blue: string;
        orange: string;
        white: string;
        lightGris: string;
        gris: string;
        grisSecondary: string;
        black: string;
        red: string;
        blackSecondary: string;
        backThree: string;
        whiteSecondary: string;
        semiBlack: string;

        light: {
          black: string;
          grey: string;
          white: string;
          greyAlpha: string;
        };

        model: {
          blue: string;
          black: string;
          gray: string;
          white: string;
        };
      };
    };
    fonts: {
      h1: {
        fontFamily: string;
        fontSize: string;
        fontColor: string;
      };

      h2: {
        fontFamily: string;
        fontSize: string;
        fontColor: string;
      };

      p: {
        fontFamily: string;
        fontSize: string;
        fontColor: string;
        align: string;
        lineHeight: string;
      };
    };
  }
}
