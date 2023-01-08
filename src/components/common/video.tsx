type Props = {
  src: string;
  poster: string;
  width?: number;
  height?: number;
};

export default function Video({ src, poster, width, height }: Props) {
  return <video src={src} poster={poster} controls></video>;
}
