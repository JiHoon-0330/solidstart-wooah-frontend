import { A } from "solid-start";

type Props = {
  src: string;
  origin: string;
  width?: number;
  height?: number;
};

export default function Image({ src, origin, width, height }: Props) {
  return (
    <A href={origin} target="_black">
      <img
        style={{
          width: "100%",
          "border-radius": "10rem",
        }}
        src={src}
        alt=""
      />
    </A>
  );
}
