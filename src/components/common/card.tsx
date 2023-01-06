import { JSX } from "solid-js";
import { Member, WeverseMemberId, WEVERSE_MEMBER_ID } from "~/lib/constant";
import { memberColor } from "~/lib/style";

type Props = {
  member?: WeverseMemberId;
  children?: JSX.Element;
} & JSX.CSSProperties;

export default function Card({ member, children, ...style }: Props) {
  const memberName = parseMember(member);
  const backgroundColor = memberColor(memberName);

  return (
    <div
      style={{
        "background-color": backgroundColor,
        "border-radius": "10rem",
        display: "flex",
        "flex-direction": "column",
        gap: "15rem",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function parseMember(
  weverseMemberId: WeverseMemberId | undefined,
): Member | undefined {
  switch (weverseMemberId) {
    case WEVERSE_MEMBER_ID.나나:
      return "나나";

    case WEVERSE_MEMBER_ID.우연:
      return "우연";

    case WEVERSE_MEMBER_ID.소라:
      return "소라";

    case WEVERSE_MEMBER_ID.루시:
      return "루시";

    case WEVERSE_MEMBER_ID.민서:
      return "민서";

    default:
      return weverseMemberId;
  }
}
