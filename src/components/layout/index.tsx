import { debounce } from "lodash";
import { createSignal, JSX, onCleanup, onMount } from "solid-js";
import Header from "~/components/layout/header";
import Nav from "~/components/layout/nav";

type Props = {
  children: JSX.Element;
};

export default function Layout(props: Props) {
  const [height, setHeight] = createSignal(0);

  onMount(() => {
    const callback = debounce(() => {
      setHeight(window.innerHeight);
    }, 100);

    callback();

    window.addEventListener("resize", callback);
    onCleanup(() => {
      window.removeEventListener("resize", callback);
    });
  });

  return (
    <main
      data-component={"Layout"}
      style={{
        width: "min(100vw, 600rem)",
        "min-height": `${height()}px`,
        margin: "0 auto",
        "background-color": "#ffffff",
        display: "flex",
        "flex-direction": "column",
      }}
    >
      <Header />
      <section
        style={{
          flex: 1,
          padding: "0 15rem",
          display: "flex",
          "flex-direction": "column",
          gap: "100rem",
        }}
      >
        {props.children}
      </section>
      <Nav />
    </main>
  );
}
