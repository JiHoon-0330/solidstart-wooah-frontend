import { Member } from "~/lib/constant";

export function memberColor(member: Member | undefined) {
  switch (member) {
    case "나나":
      return "#dbeafe";

    case "우연":
      return "#ede9fe";

    case "소라":
      return "#fee2e2";

    case "루시":
      return "#fce7f3";

    case "민서":
      return "#d1fae5";

    case undefined:
      return "#f3f4f6";

    default:
      return "#e5e7eb";
  }
}
