export const mapColor = (color) => {
  switch (color) {
    case "Green":
      return "#A2EF44";
    case "Yellow":
      return "#FCD47D";
    case "Red":
      return "#B23256";
    default:
      "#000";
  }
}


export const translateColorToPolish = (color) => {
  switch (color) {
    case "Green":
      return "Zielony";
    case "Yellow":
      return "Żółty";
    case "Red":
      return "Czerwony";
    default:
      "Czarny";
  }
}
