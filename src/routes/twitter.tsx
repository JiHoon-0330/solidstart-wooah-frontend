import { createEffect, createSignal, For, Show, Suspense } from "solid-js";
import { RouteDataArgs, useRouteData } from "solid-start";
import Card from "~/components/common/card";
import Loading from "~/components/common/loading";
import TwitterCard from "~/components/twitter/twitter-card";
import { queryTwitter } from "~/lib/api/wooah-api/query";
import { TwitterData } from "~/lib/api/wooah-api/wooah-api";

export function routeData({}: RouteDataArgs) {
  const [ssrData] = queryTwitter();

  return { ssrData };
}

export default function TwitterPage() {
  const { ssrData } = useRouteData<typeof routeData>();

  const shownList = new Set<string>();

  const [from, setFrom] = createSignal("");
  const [list, setList] = createSignal<TwitterData[]>(ssrData()?.data ?? []);

  const [fetchData, { isRefetching }] = queryTwitter(from);

  const data = fetchData ?? ssrData;

  createEffect(() => {
    setList((prev) => {
      const filtered = (data()?.data ?? [])?.filter(
        ({ sortIndex }) => !shownList.has(sortIndex),
      );

      return [...prev, ...filtered];
    });
  });

  return (
    <Suspense>
      <Show when={list()?.length}>
        <For each={list()}>
          {(item) => {
            if (shownList.has(item.sortIndex)) return null;

            shownList.add(item.sortIndex);

            return (
              <Card
                style={{
                  padding: "7rem",
                }}
              >
                <TwitterCard {...item} />
              </Card>
            );
          }}
        </For>
      </Show>

      <Loading
        isRefetching={isRefetching()}
        loadMore={() => {
          if (data()?.cursor) {
            setFrom(data()?.cursor!);
          }
        }}
      />
    </Suspense>
  );
}
