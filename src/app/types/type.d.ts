export type Note = {
  id: number;
  title: string;
  comments?: number;
  views?: number;
};

export type QnACategory = {
  category_base: string;
  category_class: string;
  category_id: number;
  category_name: string;
};

export type QnAComment = {
  qna_id: number;
  content: string;
  comment_id: number;
  user_id: string;
  parent_comment_id: number;
  created_at: Date;
  updated_at: Date;
  is_deleted: false;
};

export type QnAView = {
  qna_id: number;
  view_count: number;
};

export type QnA = {
  qna_id: number;
  title: string;
  content: string;
  category_id: number;
  user_id: string;
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean;
  is_popular: boolean;
  qnaCategory: QnACategory[];
  qnaComment: QnAComment[];
  qnaView: QnAView[];
};

export type AuthByUser = {
  id: string;
  email: string;
  user_metadata: {
    full_name: string;
    avatar_url: string;
  };
};

export type User = {
  user_id: string;
  name: string;
  phonenum: string;
  nickname: string;
  email: string;
  password: string;
  profile_image: string;
  business_verified: boolean;
  following: number;
  follower: number;
  introduce: string;
  region: string;
  age: number;
  created_at: Date;
  updated_at: Date;
  auth_id: string;
  used: boolean;
};
