export type Note = {
  id: number;
  title: string;
  comments?: number;
  views?: number;
};

export type Category = {
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

export type QnAImage = {
  image_id: string;
  qna_id: number;
  image_url: string;
  created_at: Date;
  is_deleted: boolean;
};

export type QnALike = {
  like_id: number;
  qna_id: number;
  user_id: string;
  created_at: Date;
};

export type QnABookmark = {
  bookmark_id: number;
  qna_id: number;
  user_id: string;
  created_at: Date;
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
  qnaCategory: Category[];
  qnaComment: QnAComment[];
  qnaView: QnAView[];
  qnaImage: QnAImage[];
  qnaUser: User[];
  qnaLike: QnALike[];
  qnaBookmark: QnABookmark[];
};

export type QnAPopular = {
  qna_id: number;
  title: string;
  content: string;
  category_id: number;
  user_id: string;
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean;
  is_popular: boolean;
  qnaComment: QnAComment[];
  qnaView: QnAView[];
};

export type QnAChildComment = {
  comment_id: number;
  content: string;
  created_at: Date;
  is_deleted: boolean;
  parent_comment_id: string;
  qnaCommentData: QnAComment[];
  qnaUser: User[];
  qna_id: number;
  updated_at: Date;
  user_id: string;
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
