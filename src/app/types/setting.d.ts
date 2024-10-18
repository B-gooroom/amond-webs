export type FAQ = {
  faq_id: number;
  question: string;
  answer: string;
  category: string;
  is_active: boolean;
};

export type AnnouncementData = {
  announcement_id: number;
  title: string;
  content: string;
  created_at: Date;
  is_active: boolean;
};
