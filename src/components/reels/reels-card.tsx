import { A } from "solid-start";
import Card from "~/components/common/card";
import CreatedAt from "~/components/common/created-at";
import TextContent from "~/components/common/text-content";
import Username from "~/components/common/username";
import Video from "~/components/common/video";
import { ReelsData } from "~/lib/api/wooah-api/wooah-api";
import { parseHashtag } from "~/lib/string/hashtag";

type Props = ReelsData;

export default function ReelsCard({ body, createdAt, poster, src }: Props) {
  return (
    <Card
      style={{
        padding: "10rem",
      }}
    >
      <div
        style={{
          display: "flex",
          "justify-content": "space-between",
          "align-items": "flex-end",
        }}
      >
        <A href="https://www.instagram.com/wooah_nv/" class="link">
          <Username username="@wooah_nv" />
        </A>
        <CreatedAt createdAt={createdAt * 1000} />
      </div>
      <Video
        src={`https://wooah-api.dlwlrma.app/instagram/video?url=${encodeURIComponent(
          src,
        )}&createdAt=${createdAt}`}
        poster={poster?.replace(
          /.*\/v\//,
          "/api/image?src=https://scontent.cdninstagram.com/v/",
        )}
        width={720}
        height={1280}
      />

      <TextContent text={formatter(body)} />
    </Card>
  );
}

function formatter(body: ReelsData["body"]) {
  body = body.replace(/\#[^\s\#]+/g, (match) => {
    return parseHashtag(
      `https://www.instagram.com/explore/tags/${match.replace("#", "")}`,
      match,
    );
  });

  return body.replace(/@[^\s@]+/g, (match) => {
    return parseHashtag(
      `https://www.instagram.com/${match.replace("@", "")}`,
      match,
    );
  });
}
