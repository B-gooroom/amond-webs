export type FAQ = {
  faq_id: number;
  question: string;
  answer: string;
  category: string;
  is_active: boolean;
};

export type AnnouncementList = {
  announcement_id: number;
  title: string;
  created_at: Date;
};

export type AnnouncementDetail = {
  announcement_id: number;
  title: string;
  content: string;
  created_at: Date;
  is_active: boolean;
};
