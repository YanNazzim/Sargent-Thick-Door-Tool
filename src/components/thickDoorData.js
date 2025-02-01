// thickDoorData.js

export const thicknessOptions = [
  { value: '1.75"', label: '1-3/4"' },
  { value: '1.875"', label: '1-7/8"' },
  { value: '2.0"', label: '2"' },
  { value: '2.125"', label: '2-1/8"' },
  { value: '2.25"', label: '2-1/4"' },
  { value: '2.375"', label: '2-3/8"' },
  { value: '2.5"', label: '2-1/2"' },
  { value: '2.5625"', label: '2-9/16"' },
  { value: '2.75"', label: '2-3/4"' },
  { value: '3.0"', label: '3"' },
  { value: '3.25"', label: '3-1/4"' },
  { value: '3.375"', label: '3-3/8"' },
  { value: '3.5"', label: '3-1/2"' },
  { value: '3.625"', label: '3-5/8"' },
  { value: '3.75"', label: '3-3/4"' },
  { value: '3.875"', label: '3-7/8"' },
  { value: '4.0"', label: '4"' },
  { value: '4.125"', label: '4-1/8"' },
  { value: '4.25"', label: '4-1/4"' },
  { value: '4.375"', label: '4-3/8"' },
  { value: '4.5"', label: '4-1/2"' },
  { value: '4.75"', label: '4-3/4"' },
  { value: '4.875"', label: '4-7/8"' },
  { value: '5.0"', label: '5"' },
];

export const deviceLists = {
  SVR: ["8700", "NB-8700", "9700"],
  CVR: ["8400", "8600", "9400"],
  Rim: ["8500", "8800", "9800"],
  Mortise: ["8300", "8900", "9900"],
};

export const functionLists = {
  /* 80 Series Devices */

  8300: ["04", "10", "13", "15", "40", "43", "44", "73", "74", "75", "76"],
  8400: ["06", "10", "13", "15", "40", "43", "46", "73", "74"],
  8500: ["04", "06", "10", "13", "15", "40", "43", "44", "46", "73", "74"],
  8600: ["06", "10", "13", "15", "40", "43", "46", "73", "74"],
  8700: ["06", "10", "13", "15", "40", "43", "46", "73", "74"],
  "NB-8700": ["06", "10", "13", "15", "40", "43", "46", "73", "74"],
  8800: [
    "04",
    "06",
    "10",
    "13",
    "15",
    "16",
    "40",
    "43",
    "44",
    "46",
    "73",
    "74",
    "75",
    "76",
  ],
  8900: [
    "04",
    "06",
    "10",
    "13",
    "15",
    "16",
    "40",
    "43",
    "44",
    "73",
    "74",
    "75",
    "76",
  ],

  /* 90 Series Devices */

  9400: ["04", "10"],
  9700: ["06", "10", "13", "15", "73", "74"],
  9800: ["04", "10", "13", "15", "73", "74", "75", "76"],
  9900: ["04", "10", "13", "15", "73", "74", "75", "76"],
};
