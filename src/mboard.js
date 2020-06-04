//import React from 'react';


export function newGame(obj) {

  console.log("newGame");
  console.log(obj.state);
  fetch('http://localhost/api/games', {
    method: "post",
    body: JSON.stringify(obj.state)
  })
  .then((response) => {
    if(response.ok) return response.text();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  })

} // newGame
