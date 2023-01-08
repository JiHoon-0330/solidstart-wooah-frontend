import { For, Show } from "solid-js";
import { A } from "solid-start";
import Card from "~/components/common/card";
import CreatedAt from "~/components/common/created-at";
import Image from "~/components/common/image";
import TextContent from "~/components/common/text-content";
import Username from "~/components/common/username";
import Video from "~/components/common/video";
import { TwitterData } from "~/lib/api/wooah-api/wooah-api";
import { parseHashtag } from "~/lib/string/hashtag";

type Props = TwitterData;

export default function TwitterCard({
  created_at,
  full_text,
  hashtags,
  isRt,
  media,
  meta,
  name,
  screen_name,
  sortIndex,
  urls,
  user_mentions,
  quoted,
}: Props) {
  return (
    <div data-component={"TwitterCard"}>
      <Card
        style={{
          padding: "10rem",
          "background-color": cardBackgroundColor(screen_name, full_text),
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              "justify-content": "space-between",
              "align-items": "flex-end",
            }}
          >
            <div
              style={{
                display: "flex",
                "align-items": "center",
                gap: "4rem",
              }}
            >
              <Show when={isRt}>
                <svg
                  width={"20rem"}
                  height={"20rem"}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M23.615 15.477c-.47-.47-1.23-.47-1.697 0l-1.326 1.326V7.4c0-2.178-1.772-3.95-3.95-3.95h-5.2c-.663 0-1.2.538-1.2 1.2s.537 1.2 1.2 1.2h5.2c.854 0 1.55.695 1.55 1.55v9.403l-1.326-1.326c-.47-.47-1.23-.47-1.697 0s-.47 1.23 0 1.697l3.374 3.375c.234.233.542.35.85.35s.613-.116.848-.35l3.375-3.376c.467-.47.467-1.23-.002-1.697zM12.562 18.5h-5.2c-.854 0-1.55-.695-1.55-1.55V7.547l1.326 1.326c.234.235.542.352.848.352s.614-.117.85-.352c.468-.47.468-1.23 0-1.697L5.46 3.8c-.47-.468-1.23-.468-1.697 0L.388 7.177c-.47.47-.47 1.23 0 1.697s1.23.47 1.697 0L3.41 7.547v9.403c0 2.178 1.773 3.95 3.95 3.95h5.2c.664 0 1.2-.538 1.2-1.2s-.535-1.2-1.198-1.2z"
                    fill="#536471"
                  />
                </svg>
              </Show>
              <A
                href={`https://twitter.com/${screen_name}/status/${sortIndex}`}
                target={"_blank"}
                class="link"
              >
                <Username username={name} />
              </A>
            </div>
            <CreatedAt createdAt={created_at} />
          </div>
          <div
            style={{
              "font-size": "14rem",
              "font-weight": "700",
              color: "#6b7280",
            }}
          >
            @{screen_name}
          </div>
        </div>

        <TextContent
          text={parseFullText(full_text, media, urls, user_mentions, hashtags)}
        />

        <Show when={media.length}>
          <For each={media}>
            {(item) => {
              if (item.type === "photo") {
                return (
                  <Image
                    src={item.src}
                    origin={item.origin}
                    width={item.width}
                    height={item.height}
                  />
                );
              }
              return <Video src={item.src} poster={item.poster} />;
            }}
          </For>
        </Show>
      </Card>

      <Show when={quoted}>
        <TwitterCard {...(quoted as TwitterData)} />
      </Show>
    </div>
  );
}

function cardBackgroundColor(
  screen_name: TwitterData["screen_name"],
  full_text: TwitterData["full_text"],
) {
  switch (true) {
    case /\[\#나나.*?\]/.test(full_text):
      return "var(--NANA)";

    case /\[\#우연.*?\]/.test(full_text):
      return "var(--WOOYEON)";

    case /\[\#소라.*?\]/.test(full_text):
      return "var(--SORA)";

    case /\[\#루시.*?\]/.test(full_text):
      return "var(--LUCY)";

    case /\[\#민서.*?\]/.test(full_text):
      return "var(--MINSEO)";

    default:
      return screen_name === "wooah_nv" ? "var(--WOOAH)" : "var(--DEFAULT)";
  }
}

function parseFullText(
  full_text: TwitterData["full_text"],
  media: TwitterData["media"],
  urls: TwitterData["urls"],
  user_mentions: TwitterData["user_mentions"],
  hashtags: TwitterData["hashtags"],
) {
  if (media?.length) {
    media.forEach(({ url }) => {
      full_text = full_text.replace(url, "");
    });
  }

  if (urls?.length) {
    urls.forEach(({ display_url, expanded_url, url }) => {
      full_text = full_text.replace(url, parseHashtag(url, display_url));
    });
  }

  if (user_mentions?.length) {
    user_mentions.forEach((user_mention, index) => {
      full_text = full_text.replace(`@${user_mention}`, `@${index}@`);
    });

    user_mentions.forEach((user_mention, index) => {
      full_text = full_text.replace(
        `@${index}@`,
        parseHashtag(`https://twitter.com/${user_mention}`, `@${user_mention}`),
      );
    });
  }

  if (hashtags?.length) {
    hashtags.forEach((hashtag, index) => {
      full_text = full_text.replace(`#${hashtag}`, `#${index}#`);
    });

    hashtags.forEach((hashtag, index) => {
      full_text = full_text.replace(
        `#${index}#`,
        parseHashtag(
          `https://twitter.com/hashtag/${hashtag}?src=hashtag_click`,
          `#${hashtag}`,
        ),
      );
    });
  }

  return full_text;
}
