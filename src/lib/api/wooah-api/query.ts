import { Accessor } from "solid-js";
import { createTurboResource } from "turbo-solid";
import {
  GetReels,
  GetTwitter,
  GetWeverse,
  wooahApi,
} from "~/lib/api/wooah-api/wooah-api";

export function queryWeverse(from: Accessor<string> = () => "") {
  return createTurboResource<GetWeverse>(
    () => `https://wooah-api.dlwlrma.app/weverse?from=${from()}`,
    {
      async fetcher(key, additional) {
        const { data, error, status } = await wooahApi.getWeverse(from());

        if (status === "failure") throw error;

        return data;
      },
    },
  );
}

export function queryTwitter(from: Accessor<string> = () => "") {
  return createTurboResource<GetTwitter>(
    () => `https://wooah-api.dlwlrma.app/twitter?from=${from()}`,
    {
      async fetcher(key, additional) {
        const { data, error, status } = await wooahApi.getTwitter(from());

        if (status === "failure") throw error;

        return data;
      },
    },
  );
}

export function queryReels(from: Accessor<string> = () => "") {
  return createTurboResource<GetReels>(
    () => `https://wooah-api.dlwlrma.app/instagram/reels?from=${from()}`,
    {
      async fetcher(key, additional) {
        const { data, error, status } = await wooahApi.getReels(from());

        if (status === "failure") throw error;

        return data;
      },
    },
  );
}
