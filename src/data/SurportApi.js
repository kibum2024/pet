const BASE_URL = "http://localhost:8080/api";

export async function getFAQ() {
  const response = await fetch(`${BASE_URL}/surport`);

  if (!response.ok) {
    throw new Error("목록 불러오기 실패");
  }

  const body = await response.json();
  return body;
}
