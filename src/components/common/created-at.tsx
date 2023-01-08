type Props = {
  createdAt: number | string;
};

export default function CreatedAt({ createdAt }: Props) {
  const date = new Date(createdAt);
  const yyyy = date.getFullYear();
  const mm = formatter(date.getMonth() + 1);
  const dd = formatter(date.getDate());
  const h = formatter(date.getHours());
  const m = formatter(date.getMinutes());

  return (
    <div
      data-component={"CreatedAt"}
      style={{
        "font-size": "14rem",
        "font-weight": 700,
      }}
    >
      {yyyy}.{mm}.{dd} {h}:{m}
    </div>
  );
}

function formatter(value: number): string {
  if (value < 10) return `0${value}`;

  return value.toString();
}
