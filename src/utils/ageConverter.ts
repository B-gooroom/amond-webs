export function getAgeGroup(age: number): string {
  if (age >= 10 && age < 20) {
    return "10대";
  } else if (age >= 20 && age < 30) {
    return "20대";
  } else if (age >= 30 && age < 40) {
    return "30대";
  } else if (age >= 40 && age < 50) {
    return "40대";
  } else if (age >= 50 && age < 60) {
    return "50대";
  } else if (age >= 60 && age < 70) {
    return "60대";
  } else if (age >= 70 && age < 80) {
    return "70대";
  } else if (age >= 80) {
    return "80대";
  } else {
    return "알 수 없음"; // 나이가 범위에 맞지 않는 경우 처리
  }
}
