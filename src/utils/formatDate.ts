export const formatDate = (timestamp: Date): string => {
  const date = new Date(timestamp);

  // getFullYear(), getMonth(), getDate()를 사용하여 'YYYY-MM-DD' 형식으로 반환
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
