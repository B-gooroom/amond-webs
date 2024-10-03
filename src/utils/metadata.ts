export interface Metadata {
  title: string;
  description: string;
  keywords: string[];
  imageUrl: string;
  siteUrl: string;
}

export const metadata: Metadata = {
  title: "카페의 모든 것 | 아몬드",
  description: "카페의 모든 것을 한눈에 볼 수 있는 곳, 아몬드입니다.",
  keywords: [
    "카페 커뮤니티",
    "베이커리 커뮤니티",
    "커피 커뮤니티",
    "디저트 커뮤니티",
  ],
  imageUrl:
    "https://xtlpqspaohusobjcvsas.supabase.co/storage/v1/object/sign/amond-img/amond-meta.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhbW9uZC1pbWcvYW1vbmQtbWV0YS5qcGciLCJpYXQiOjE3Mjc5NTM2NDEsImV4cCI6MTc3OTc5MzY0MX0.hJ2M_6y66WoTt8A-ci-H5rdTfbgTXkYc2KHm5wdF_nM&t=2024-10-03T11%3A07%3A21.929Z",
  siteUrl: "https://amond.kr",
};
