export type Member = typeof MEMBERS[number];
export const MEMBERS = ["나나", "우연", "소라", "루시", "민서"] as const;

export type WeverseMemberId =
  typeof WEVERSE_MEMBER_ID[keyof typeof WEVERSE_MEMBER_ID];
export const WEVERSE_MEMBER_ID = {
  나나: "287797a9070d1c7b9276b68aa2aae940",
  우연: "ce731ac8ed27380b2a1c134ab0f16928",
  소라: "1a0790fc97ab2226299e0be040d37131",
  루시: "406ce8cdf0321afb462da0f782e9c15e",
  민서: "578c28ecd0cd9a2d20c8c0badaa09e23",
} as const;

export const PAGES = [
  { link: "/", name: "위버스" },
  { link: "/twitter", name: "트위터" },
  { link: "/reels", name: "릴스" },
  { link: "/schedule", name: "일정" },
] as const;
