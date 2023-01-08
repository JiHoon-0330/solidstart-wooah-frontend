import { For } from "solid-js";
import { Member, MEMBERS } from "~/lib/constant";

export default function Header() {
  return (
    <header
      data-component={"Header"}
      style={{
        position: "sticky",
        top: "0",
        display: "flex",
        "font-size": "14rem",
        "font-weight": 500,
      }}
    >
      <For each={MEMBERS}>
        {(member) => (
          <div
            style={{
              flex: "1",
              "text-align": "center",
              padding: "2rem 0",
              "background-color": backgroundColor(member),
            }}
          >
            {member}
          </div>
        )}
      </For>
    </header>
  );
}

function backgroundColor(member: Member) {
  switch (member) {
    case "나나":
      return "#dbeafe";

    case "우연":
      return "#ede9fe";

    case "소라":
      return "#fee2e2";

    case "루시":
      return "#fce7f3";

    case "민서":
      return "#d1fae5";

    default:
      const check: never = member;
  }
}
