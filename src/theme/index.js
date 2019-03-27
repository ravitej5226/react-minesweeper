import { CELL_TYPE } from "../shared/constants";
const colors = {
  purple: "rgb(114,36,108)", // #72246C
  pinkyPurple: "rgb(154,32,95)", // #9A205F
  white: "rgb(255,255,255)", // #fff
  black: "rgb(0,0,0)", // #000
  offBlack: "rgb(53,52,54)", // #353436
  dynamicYellow: "rgb(255,193,7)", // #ffc107
  dynamicBlue: "rgb(65,182,230)", // #41B6E6
  dynamicGreen: "rgb(72,162,63)", // #48A23F
  influentialOrange: "rgb(220,107,47)", // #DC6B2F
  influentialBlue: "rgb(58,93,174)", // #3A5DAE
  influentialGreen: "rgb(0,133,125)", // #00857D
  breadcrumbGrey: "rgb(247,247,247)", // #F7F7F7
  lighterGray: "rgb(233,232,232)", // #E9E8E8
  lighterishGray: "rgb(221,221,221)", // #DDD
  lightGrey: "rgb(187,188,188)", // #BBBCBC
  venus: "rgb(154,151,154)", // #9A979A
  mediumGrey: "rgb(148,148,148)", // #949494
  darkGrey: "rgb(99,101,107)", // #63656B
  silver: "rgb(188,186,186)", // #BCBABA
  errorRed: "rgb(208,2,27)" // #D0021B
};

const valueColors = {
  "1": colors.purple,
  "2": colors.dynamicBlue,
  "3": colors.errorRed,
  "4": colors.dynamicYellow,
  "5": colors.pinkyPurple,
  "6": colors.venus
};

const frameBorder = colors.lightGrey;

const keyframes = {
  blink: `@keyframes blink {
    to {
      visibility: hidden;
    }
  }
  @-webkit-keyframes blink {
    to {
      visibility: hidden;
    }
  }`,
  colorBlink: `@keyframes colorBlink {
    to {
      color:${colors.black}
    }
  }
  @-webkit-keyframes blink {
    to {
      color:${colors.dynamicGreen}
    }
  }`
};
const animations = {
  blink: `
    animation:  blink 1s steps(5, start) infinite;
    ${keyframes.blink}
  `,
  colorBlink: `
  animation:  colorBlink 1s steps(5, start) infinite;
  ${keyframes.colorBlink}
`
};

const cellStyle = {
  [CELL_TYPE.MINE]: `
  padding-top:6px;
  padding-left:2px;`,
  [CELL_TYPE.NEIGHBOR]: `
  padding-top:12px;`
};

const theme = {
  colors,
  valueColors,
  frameBorder,
  animations,
  keyframes,
  cellStyle
};

export default theme;
