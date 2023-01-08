import Card from "~/components/common/card";
import { css } from "~/lib/style";

type Props = {
  isRefetching: boolean;
  loadMore: () => void;
};

export default function Loading({ isRefetching, loadMore }: Props) {
  function observer(el: HTMLDivElement) {
    new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isRefetching) {
          loadMore();
        }
      });
    }, {}).observe(el);
  }

  return (
    <div data-component={"Loading"} ref={observer}>
      <Card
        style={{
          height: "200rem",
          padding: "7rem",
        }}
      >
        <Card
          style={{
            height: "100%",
            "background-color": css.color("--DEFAULT"),
          }}
        />
      </Card>
    </div>
  );
}
