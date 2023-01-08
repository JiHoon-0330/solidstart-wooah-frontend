import { createEffect, createSignal, For, Show, Suspense } from "solid-js";
import { RouteDataArgs, useRouteData } from "solid-start";
import Card from "~/components/common/card";
import Loading from "~/components/common/loading";
import WeverseCard from "~/components/weverse/weverse-card";
import { queryWeverse } from "~/lib/api/wooah-api/query";
import { WeverseData } from "~/lib/api/wooah-api/wooah-api";

export function routeData({}: RouteDataArgs) {
  const [ssrData] = queryWeverse();

  return { ssrData };
}

export default function WeversePage() {
  const { ssrData } = useRouteData<typeof routeData>();

  const shownList = new Set<string>();

  const [from, setFrom] = createSignal("");
  const [list, setList] = createSignal<WeverseData[]>(ssrData()?.data ?? []);

  const [fetchData, { isRefetching }] = queryWeverse(from);

  const data = fetchData ?? ssrData;

  createEffect(() => {
    setList((prev) => {
      const filtered = (data()?.data ?? [])?.filter(
        ({ postId }) => !shownList.has(postId),
      );

      return [...prev, ...filtered];
    });
  });

  return (
    <Suspense>
      <Show when={list()?.length}>
        <For each={list()}>
          {(item) => {
            if (shownList.has(item.postId)) return null;

            shownList.add(item.postId);

            return (
              <Card
                style={{
                  padding: "7rem",
                }}
              >
                <WeverseCard {...item} />
              </Card>
            );
          }}
        </For>
      </Show>

      <Loading
        isRefetching={isRefetching()}
        loadMore={() => {
          if (data()?.hasMore) {
            setFrom(data()?.lastId!);
          }
        }}
      />
    </Suspense>
  );
}
