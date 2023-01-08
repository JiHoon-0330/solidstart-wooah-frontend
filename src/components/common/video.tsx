type Props = {
  src: string;
  poster: string;
  width?: number;
  height?: number;
};

export default function Video({ src, poster, width, height }: Props) {
  return (
    <div
      data-component={"Video"}
      style={{
        width: "100%",
        "aspect-ratio": `auto ${width} / ${height}`,
      }}
    >
      <video
        style={{
          width: "100%",
          height: "100%",
        }}
        src={src}
        poster={poster}
        controls
      />
    </div>
  );
}
