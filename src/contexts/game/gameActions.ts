
export type GameAction =
  | { type: 'START_GAME' }
  | { type: 'COLLECT_ITEM'; id: string }
  | { type: 'MISS_ITEM'; id: string }
  | { type: 'GENERATE_ITEMS' }
  | { type: 'DROP_NEXT_ITEM' }
  | { type: 'DROP_TWO_ITEMS' }
  | { type: 'RESET_GAME' }
  | { type: 'PAUSE_STREAM' }
  | { type: 'RESUME_STREAM' };

export const weatherItems = [
  {
    name: 'Sunny',
    icon: 'https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/other/sunny.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJvdGhlci9zdW5ueS5wbmciLCJpYXQiOjE3NDQ5ODcwMDgsImV4cCI6MTc0NTU5MTgwOH0.4uqo-vQ46Lm4cF8sm-uqaRjMWBWEdzwM90945NTnOEk',
    type: 'good'
  },
  {
    name: 'Cloudy',
    icon: 'https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/other/cloudy.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJvdGhlci9jbG91ZHkucG5nIiwiaWF0IjoxNzQ0OTg3MDYwLCJleHAiOjE3NDU1OTE4NjB9.XEZUQ4jpJhHJjMSya4-R65Ah8iZaq_Asxz0m9ztO5OE',
    type: 'bad'
  },
  {
    name: 'Windy',
    icon: 'https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/other/windy.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJvdGhlci93aW5keS5wbmciLCJpYXQiOjE3NDQ5ODcwNzAsImV4cCI6MTc0NTU5MTg3MH0.6p4cpzgz-0aKEylj5vYxUr-QOJayHbXYCucbbxObQTc',
    type: 'bad'
  },
  {
    name: 'Rainy',
    icon: 'https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/other/rainy.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJvdGhlci9yYWlueS5wbmciLCJpYXQiOjE3NDQ5ODcwODQsImV4cCI6MTc0NTU5MTg4NH0.qeUbHfvtgMuLg8wW-ZtyLf-7EMIPXT48myemy3SzETo',
    type: 'bad'
  }
];
