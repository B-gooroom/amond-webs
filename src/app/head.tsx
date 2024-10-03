export default function Head() {
  const title = "카페의 모든 것 | 아몬드";
  const description = "카페의 모든 것을 한눈에 볼 수 있는 곳, 아몬드입니다.";
  const imageUrl =
    "https://xtlpqspaohusobjcvsas.supabase.co/storage/v1/object/sign/amond-img/amond-meta.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhbW9uZC1pbWcvYW1vbmQtbWV0YS5qcGciLCJpYXQiOjE3Mjc5NTM2NDEsImV4cCI6MTc3OTc5MzY0MX0.hJ2M_6y66WoTt8A-ci-H5rdTfbgTXkYc2KHm5wdF_nM&t=2024-10-03T11%3A07%3A21.929Z";
  const siteUrl = "https://amond.kr";

  return (
    <>
      <title>{title}</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:type" content="website good" />
      <meta property="og:site_name" content={title} />
      <meta property="og:locale" content="ko_KR" />
      <meta
        name="keywords"
        content="카페 커뮤니티, 베이커리 커뮤니티, 커피 커뮤니티, 디저트 커뮤니티"
      />
    </>
  );
}
