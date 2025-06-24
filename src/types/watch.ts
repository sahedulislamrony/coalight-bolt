type Colors = {
  primary: string;
  bgGradient: string;
  metallic: {
    top: string;
    left: string;
    right: string;
    bottom: string;
  };
};

type Time = {
  hours: string;
  minutes: string;
  seconds: string;
  day: string;
  date: string;
  month: string;
  ampm: string;
};

export type { Colors, Time };
