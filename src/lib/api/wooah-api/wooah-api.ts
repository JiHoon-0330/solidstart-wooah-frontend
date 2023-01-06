import { APiResponse, wooahApiInstance } from "~/lib/api";
import { WeverseMemberId } from "~/lib/constant";

export type Author =
  | {
      memberId: WeverseMemberId;
      profileName: string;
      profileType: "ARTIST";
    }
  | {
      memberId: string;
      profileName: string;
      profileType: "FAN";
    };

export type WeverseComment = {
  commentId: string;
  postId?: string;
  body: string;
  createdAt: string | number;
  author: Author;
  translated?: string | null;
};

export type WeverseData = {
  postId: string;
  body: string;
  createdAt: string | number;
  author: Author;
  locked: boolean;
  photo?: { width: number; height: number; url: string }[];
  video?: string | null;
  translated?: string | null;
  comments: [WeverseComment, WeverseComment[]][];
};

export type GetWeverse = {
  data: WeverseData[];
  lastId: string | null;
  hasMore: boolean;
};

export type WooahApi = {
  getWeverse(from?: string): APiResponse<GetWeverse>;
};

export const wooahApi: WooahApi = {
  getWeverse(from) {
    return wooahApiInstance({
      method: "GET",
      url: "/weverse",
      params: {
        from,
      },
    });
  },
};
