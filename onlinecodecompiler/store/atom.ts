import { atom } from "recoil";

interface Props {
  code?: string,
  language?: string,
  flag?: boolean
}

export const codeatom = atom<Props>({
  key: 'code',
  default: {
    code: ""
  },
});

export const languageatom = atom<Props>({
  key: 'language',
  default: {
    language: ""
  },
});

export const flagatom = atom<Props>({
  key: 'flag',
  default: {
    flag: false
  },
});