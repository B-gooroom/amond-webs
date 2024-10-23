export const HIDE_TABBAR_ROUTES = [
  "/auth/signup", // 회원가입
  "/auth/signin", // 로그인
  "/post", // 게시글 작성
  "/notification", // 알림
  "/profile/edit", // 프로필 수정
  "/setting", // 설정
  "/setting/verified", // 사업자 인증
  "/info", // 정보 페이지
  "/qna/list", // Q&A 리스트
  "/login", // 로그인
  "/setting/account", // 설정 - 계정
  "/setting/password", // 설정 - 비밀번호 변경
  "/setting/remove", // 설정 - 비밀번호 변경
  "/setting/report", // 설정 - 차단/신고
  "/setting/announcement", // 설정 - 공지사항
  "/setting/customer-service", // 설정 - 고객센터
  "/setting/favorite", // 설정 - 좋아요
  "/setting/bookmark", // 설정 - 북마크
  "/setting/notification", // 설정 - 알림 설정
  "/setting/terms-of-service", // 설정 - 서비스 이용약관
  "/setting/privacy-policy", // 설정 - 개인정보 처리방침
  "/report", // 신고하기
];

// 정규식 패턴을 사용한 경로
export const HIDE_TABBAR_REGEX = [
  /^\/qna\/\d+$/, // Q&A 개별 페이지
  /^\/board\/\d+$/, // 게시판 개별 페이지
  /^\/setting\/announcement\/\d+$/, // 게시판 개별 페이지
];
