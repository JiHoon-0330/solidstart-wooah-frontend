import { For } from "solid-js";
import { A } from "solid-start";
import { PAGES } from "~/lib/constant";

export default function Nav() {
  return (
    <nav
      style={{
        position: "sticky",
        bottom: "0",
        display: "flex",
        "background-color": "#ffffff",
        gap: "1rem",
        "font-size": "14rem",
        "font-weight": 500,
      }}
    >
      <For each={PAGES}>
        {({ link, name }) => {
          return (
            <A
              href={link}
              style={{
                cursor: "pointer",
                flex: "1",
                "text-align": "center",
                padding: "4rem 0",
                "background-color": "#d1d5db",
              }}
            >
              {name}
            </A>
          );
        }}
      </For>
    </nav>
  );
}
