import { ApiResponse, wooahApiInstance } from "~/lib/api";
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

export type TwitterData = {
  sortIndex: string;
  isRt: boolean;
  name: string;
  screen_name: string;
  full_text: string;
  created_at: string;
  hashtags: string[];
  user_mentions: string[];
  urls: {
    display_url: string;
    expanded_url: string;
    url: string;
  }[];
  media: (
    | {
        type: "video";
        url: string;
        src: string;
        poster: string;
      }
    | {
        src: string;
        origin: string;
        width: number;
        height: number;
        type: "photo";
        url: string;
      }
  )[];
  meta: {
    card: string;
    site: string;
    src: string;
    origin: string;
    title: string;
    description: string;
  }[];
  quoted?: TwitterData;
};

export type GetTwitter = {
  data: TwitterData[];
  cursor: string;
};

export type ReelsData = {
  body: string;
  createdAt: number;
  poster: string;
  src: string;
};

export type GetReels = {
  data: ReelsData[];
  max_id: string;
  more_available: boolean;
};

export type WooahApi = {
  getWeverse(from?: string): ApiResponse<GetWeverse>;
  getTwitter(from?: string): ApiResponse<GetTwitter>;
  getReels(from?: string): ApiResponse<GetReels>;
};

export const wooahApi: WooahApi = {
  getWeverse(from?) {
    return wooahApiInstance({
      method: "GET",
      url: "/weverse",
      params: {
        from,
      },
    });
  },

  getTwitter(from?) {
    return wooahApiInstance({
      method: "GET",
      url: "/twitter",
      params: {
        from,
      },
    });
  },

  getReels(from?) {
    return wooahApiInstance({
      method: "GET",
      url: "/instagram/reels",
      params: {
        from,
      },
    });
  },
};
