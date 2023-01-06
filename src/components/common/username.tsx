type Props = {
  username: string;
};

export default function Username({ username }: Props) {
  return (
    <div
      style={{
        "font-size": "16rem",
        "font-weight": 700,
      }}
    >
      {username}
    </div>
  );
}
