import { createEffect, createSignal, For, Show, Suspense } from "solid-js";
import Card from "~/components/common/card";
import Loading from "~/components/common/loading";
import WeverseCard from "~/components/weverse/weverse-card";
import { queryWeverse } from "~/lib/api/wooah-api/query";
import { WeverseData } from "~/lib/api/wooah-api/wooah-api";

export default function WeversePage() {
  const shownList = new Set<string>();
  const [from, setFrom] = createSignal("");
  const [list, setList] = createSignal<WeverseData[]>([]);

  const [data, { isRefetching, refetch }] = queryWeverse(from);

  if (!data() && !list().length) {
    refetch();
  }

  createEffect(() => {
    setList((prev) => {
      return [...prev, ...(data()?.data ?? [])];
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
              <Card padding="7rem">
                <WeverseCard {...item} />
              </Card>
            );
          }}
        </For>
      </Show>

      <Show when={!isRefetching()}>
        <Loading
          loadMore={() => {
            if (data()?.hasMore) {
              setFrom(data()?.lastId!);
            }
          }}
        />
      </Show>
    </Suspense>
  );
}
