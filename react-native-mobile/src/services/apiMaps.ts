const ACCESS_TOKEN_MAP_BOX =
"acess_token=pk.eyJ1IjoibWVsb25pc2siLCJhIjoiY2wwbW16ejdyMDE4NjNibzcxamUwNTl6MSJ9.poG72h6iwA02xYDV5upuGQ";

export const fetchLocalMapBox = (local: string) =>
fetch(
  `https://api.mapbox.com/geocoding/v5/mapbox.places/${local}.json?${ACCESS_TOKEN_MAP_BOX}`
).then(response => response.json()).then(data => data);

export const fetchUserGithub = (login: string) =>
fetch(`https://api.github.com/users/${login}`).then(response => response.json()).then(data => data);