import { For } from "solid-js";
import { MEMBERS } from "~/lib/constant";
import { memberColor } from "~/lib/style";

export default function Header() {
  return (
    <header
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
              "background-color": memberColor(member),
            }}
          >
            {member}
          </div>
        )}
      </For>
    </header>
  );
}
