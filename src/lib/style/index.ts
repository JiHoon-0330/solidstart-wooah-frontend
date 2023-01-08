type Color =
  | "--NANA"
  | "--WOOYEON"
  | "--SORA"
  | "--LUCY"
  | "--MINSEO"
  | "--WOOAH"
  | "--DEFAULT";

export const css = {
  color(color: Color) {
    return `var(${color})`;
  },
};
