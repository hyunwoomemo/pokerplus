import { atom } from "recoil";

export const pushState = atom({
  key: "pushState",
  default: {
    loading: true,
  },
});
