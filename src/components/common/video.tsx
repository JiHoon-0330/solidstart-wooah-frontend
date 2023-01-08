type Props = {
  src: string;
  poster: string;
  width?: number;
  height?: number;
};

export default function Video({ src, poster, width, height }: Props) {
  return (
    <video data-component={"Video"} src={src} poster={poster} controls></video>
  );
}
