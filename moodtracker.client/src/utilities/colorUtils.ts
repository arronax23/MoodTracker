export type ColorName = "Green" | "Yellow" | "Red";

export const mapColor = (color: ColorName | string): string => {
  switch (color) {
    case "Green":
      return "#A2EF44";
    case "Yellow":
      return "#FCD47D";
    case "Red":
      return "#B23256";
    default:
      return "#fffefe";
  }
};

export const translateColorToPolish = (color: ColorName | string): string => {
  switch (color) {
    case "Green":
      return "Zielony";
    case "Yellow":
      return "Żółty";
    case "Red":
      return "Czerwony";
    default:
      return "Czarny";
  }
};