import { JSX } from "solid-js";

type Props = {
  children?: JSX.Element;
  style?: JSX.CSSProperties;
};

export default function Card({ children, style }: Props) {
  return (
    <>
      <div
        data-component={"Card"}
        style={{
          "border-radius": "10rem",
          "background-color": "#f3f4f6",
          display: "flex",
          "flex-direction": "column",
          gap: "15rem",
          ...removeNull(style),
        }}
      >
        {children}
      </div>
    </>
  );
}

function removeNull(obj?: Object) {
  if (!(typeof obj === "object" && obj instanceof Object)) return {};

  return Object.entries(obj).reduce((result, [key, value]) => {
    if (value == null) return result;

    result[key] = value;
    return result;
  }, {} as Record<string, any>);
}
