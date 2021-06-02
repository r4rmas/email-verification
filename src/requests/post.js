export default function post(url, data, token = null) {
  return fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Auth-Token": token,
    },
    body: JSON.stringify(data),
  });
}
