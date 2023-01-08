type Props = {
  text: string;
};

export default function TextContent({ text }: Props) {
  return (
    <div
      data-component={"TextContent"}
      style={{
        "white-space": "pre-line",
        "word-break": "break-all",
        "font-size": "16rem",
        "font-weight": 700,
      }}
      innerHTML={text}
    />
  );
}
