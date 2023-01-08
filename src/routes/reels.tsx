import { createEffect, createSignal, For, Show, Suspense } from "solid-js";
import { RouteDataArgs, useRouteData } from "solid-start";
import Loading from "~/components/common/loading";
import ReelsCard from "~/components/reels/reels-card";
import { queryReels } from "~/lib/api/wooah-api/query";
import { ReelsData } from "~/lib/api/wooah-api/wooah-api";

export function routeData({}: RouteDataArgs) {
  const [ssrData] = queryReels();

  return { ssrData };
}

export default function ReelsPage() {
  const { ssrData } = useRouteData<typeof routeData>();

  const shownList = new Set<string>();

  const [from, setFrom] = createSignal("");
  const [list, setList] = createSignal<ReelsData[]>(ssrData()?.data ?? []);

  const [fetchData, { isRefetching }] = queryReels(from);

  const data = fetchData ?? ssrData;

  createEffect(() => {
    setList((prev) => {
      const filtered = (data()?.data ?? [])?.filter(
        ({ src }) => !shownList.has(src),
      );

      return [...prev, ...filtered];
    });
  });

  return (
    <Suspense>
      <Show when={list()?.length}>
        <For each={list()}>
          {(item) => {
            if (shownList.has(item.src)) return null;

            shownList.add(item.src);

            return (
              <div>
                <ReelsCard {...item} />
              </div>
            );
          }}
        </For>
      </Show>

      <Loading
        isRefetching={isRefetching()}
        loadMore={() => {
          if (data()?.more_available) {
            setFrom(data()?.max_id!);
          }
        }}
      />
    </Suspense>
  );
}
