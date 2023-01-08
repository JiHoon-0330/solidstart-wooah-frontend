import { For, Show } from "solid-js";
import Card from "~/components/common/card";
import CreateAt from "~/components/common/created-at";
import Image from "~/components/common/image";
import TextContent from "~/components/common/text-content";
import Username from "~/components/common/username";
import { WeverseData } from "~/lib/api/wooah-api/wooah-api";
import { WEVERSE_MEMBER_ID } from "~/lib/constant";
import { css } from "~/lib/style";

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
      <Card background-color={cardBackgroundColor(author)} padding="10rem">
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
              return (
                <Image
                  src={`${url}?type=w670`}
                  origin={url}
                  height={height}
                  width={width}
                />
              );
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

function cardBackgroundColor(author?: WeverseData["author"]) {
  switch (author?.memberId) {
    case WEVERSE_MEMBER_ID.나나:
      return css.color("--NANA");

    case WEVERSE_MEMBER_ID.우연:
      return css.color("--WOOYEON");

    case WEVERSE_MEMBER_ID.소라:
      return css.color("--SORA");

    case WEVERSE_MEMBER_ID.루시:
      return css.color("--LUCY");

    case WEVERSE_MEMBER_ID.민서:
      return css.color("--MINSEO");

    default:
      return css.color("--DEFAULT");
  }
}
