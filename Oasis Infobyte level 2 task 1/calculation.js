let input = document.getElementById("inputBox");
let buttons = document.querySelectorAll("button");

let btnArray = Array.from(buttons);

let result = "";

btnArray.map((btn) => {
  return btn.addEventListener("click", (event) => {
    switch (event.target.innerHTML) {
      case "=":
        result = eval(result);
        input.value = result;
        break;
      case "CLEAR":
        result = "";
        input.value = result;
        break;
      case "DEL":
        result = result.substring(0, result.length - 1);
        input.value = result;
        break;
      default:
        result += event.target.innerHTML;
        input.value = result;
        break;
    }
  });
});