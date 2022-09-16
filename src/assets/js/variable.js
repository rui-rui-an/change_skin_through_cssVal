// 字体变量
const baseSize = {
  "--font-size-large-x": "22px",
  "--font-size-large": "18px",
  "--font-size-medium": "14px",
  "--font-size-medium-x": "16px",
  "--font-size-small-s": "10px",
  "--font-size-small": "12px",
};

//浅色
export const lightTheme = {
  "--left-bg": "rgb(182, 23, 23)",
  "--right-bg": "rgb(63, 9, 9)",
  "--top-bg": "rgb(6, 36, 65)",
  "--bottom-bg": "rgb(55, 214, 10)",
  ...baseSize,
};

// 深色
export const darkTheme = {
  "--left-bg": "#0094ff",
  "--right-bg": "blue",
  "--top-bg": "red",
  "--bottom-bg": "pink",
  ...baseSize,
};