export type BoardComment = {
  board_id: number;
  content: string;
  comment_id: number;
  user_id: string;
  parent_comment_id: number;
  created_at: Date;
  updated_at: Date;
  is_deleted: false;
};

export type BoardView = {
  board_id: number;
  view_count: number;
};

export type BoardImage = {
  image_id: string;
  board_id: number;
  image_url: string;
  created_at: Date;
  is_deleted: boolean;
};

export type BoardLike = {
  like_id: number;
  board_id: number;
  user_id: string;
  created_at: Date;
};

export type Board = {
  board_id: number;
  title: string;
  content: string;
  category_id: number;
  user_id: string;
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean;
  is_popular: boolean;
  boardCategory: Category[];
  boardComment: BoardComment[];
  boardView: BoardView[];
  boardImage: BoardImage[];
  boardLike: BoardLike[];
  boardUser: User[];
};
