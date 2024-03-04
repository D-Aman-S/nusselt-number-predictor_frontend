let host = "http://localhost:3001";
export const predictData = async (payload: any) => {
  const options = {
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(payload),
  };
  const response = await fetch(host + "/api", options);
  const data = await response.json();
  console.log(data);
  return data;
};
