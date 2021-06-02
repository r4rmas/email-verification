export default function get(url, token) {
  return fetch(url, {
    method: "GET",
    mode: "cors",
    headers: {
      "Auth-Token": token,
    },
  });
}
