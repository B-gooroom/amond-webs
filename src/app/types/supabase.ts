export type Note = {
  id: number;
  title: string;
  comments?: number;
  views?: number;
};

// types/supabase.ts
// export type Note = {
//   id: number;
//   title: string;
//   comments: number;
//   views: number;
//   description?: string;
//   imageUrl?: string;
// };

export type QnA = {
  id: number;
  title: string;
  content: string;
  category_id: number;
  user_id: string;
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean;
  is_popular: boolean;
};
