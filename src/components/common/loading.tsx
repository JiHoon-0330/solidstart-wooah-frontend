import Card from "~/components/common/Card";

type Props = {
  loadMore: () => void;
};

export default function Loading({ loadMore }: Props) {
  function observer(el: HTMLDivElement) {
    new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadMore();
        }
      });
    }, {}).observe(el);
  }

  return (
    <div ref={observer}>
      <Card height={"200rem"} padding="7rem">
        <Card background-color={"#e5e7eb"} height="100%" />
      </Card>
    </div>
  );
}
