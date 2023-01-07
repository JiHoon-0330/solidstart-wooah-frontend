import { Accessor } from "solid-js";
import { createTurboResource } from "turbo-solid";
import { GetWeverse, wooahApi } from "~/lib/api/wooah-api/wooah-api";

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
