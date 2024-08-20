import { ConfigInterface } from "@/lib/types";
import Config from "@/content/config";

export const getConfigValue = (key: keyof ConfigInterface) => {
  return Config[key] as unknown;
};
