import { For, Show } from "solid-js";
import Card from "~/components/common/card";
import CreateAt from "~/components/common/created-at";
import Image from "~/components/common/image";
import TextContent from "~/components/common/text-content";
import Username from "~/components/common/username";
import { WeverseData } from "~/lib/api/wooah-api/wooah-api";
import { WeverseMemberId } from "~/lib/constant";

type Props = Partial<WeverseData>;

export default function WeverseCard({
  body,
  author,
  comments,
  createdAt,
  locked,
  postId,
  photo,
  translated,
  video,
}: Props) {
  return (
    <div>
      <Card member={author?.memberId as WeverseMemberId} padding="10rem">
        <div
          style={{
            display: "flex",
            "justify-content": "space-between",
            "align-items": "flex-end",
          }}
        >
          <Username username={`[${author?.profileName}]`} />

          <CreateAt createdAt={+(createdAt ?? 0)} />
        </div>
        <TextContent text={body ?? ""} />

        <Show when={photo?.length}>
          <For each={photo}>
            {({ url, height, width }) => {
              return <Image src={`${url}?type=w670`} origin={url} />;
            }}
          </For>
        </Show>
      </Card>

      <Show when={comments?.length}>
        <For each={comments}>
          {([parent, childComments], index) => {
            const isLast = index() === comments!.length - 1;

            return (
              <div style={{ "margin-bottom": isLast ? "" : "20rem" }}>
                {
                  <>
                    <WeverseCard {...parent} />
                    <For each={childComments}>
                      {(comment) => {
                        return <WeverseCard {...comment} />;
                      }}
                    </For>
                  </>
                }
              </div>
            );
          }}
        </For>
      </Show>
    </div>
  );
}
