console.log("message from js scripts file");

let input = document.getElementById("userInput");

console.log(input);

let getButton = document.querySelector("button");
getButton.addEventListener("click", (event) => {
  event.preventDefault();
  console.log(input.value);
  var contentPara = document.querySelector(".responseHolder");
  let competeUrl = "http://localhost:3001/weather" + "?search=" + input.value;
  fetch(competeUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.Error) {
        // as data will be {Error: 'pls input some city name in the text field and try again'}
        contentPara.innerHTML = data.Error;
      } else {
        console.log("data from the localhost server", data);
        // add this response from localhost to the browser
        contentPara.innerHTML =
          "Current Temperature is : " + data.temperature + " deg centigrade";
      }
    })
    .catch((error) => {
      // this will fire only on network failure
      console.log("catched error at server localhost req", error);
      contentPara.innerHTML = error;
    });
});

// we should take the user input from textbox and send to our sever at localhost
