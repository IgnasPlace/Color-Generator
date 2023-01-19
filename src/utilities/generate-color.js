const COLOR_CHARACTERS = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
];

export const GenerateColor = () => {
  let newColor = "#";
    for (let i = 0; i < 6; i++) {
      let symb = Math.floor(Math.random() * 16);
      newColor += COLOR_CHARACTERS[symb];
  }
  return newColor
}