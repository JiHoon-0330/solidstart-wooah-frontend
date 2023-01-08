import { JSX } from "solid-js";

type Props = {
  children?: JSX.Element;
} & JSX.CSSProperties;

export default function Card({ children, ...style }: Props) {
  return (
    <div
      style={{
        "background-color": "#f3f4f6",
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
