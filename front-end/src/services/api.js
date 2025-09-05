const BASE_URL = "http://localhost:8080/api/v1/prescription";

export const fetchAllPrescriptions = async () => {
  const response = await fetch(`${BASE_URL}`);
  return await response.json();
};

export const fetchDayWiseCounts = async (start, end) => {
  const response = await fetch(
    `${BASE_URL}/daywise-report?start=${start}&end=${end}`
  );
  return await response.json();
};

