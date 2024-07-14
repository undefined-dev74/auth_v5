import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

type Config = {
  style: "new-york";
  theme: "zinc";
  radius: number;
};

const configAtom = atomWithStorage<Config>("config", {
  style: "new-york",
  theme: "zinc",
  radius: 0.75,
});

export function useConfig() {
  return useAtom(configAtom);
}
