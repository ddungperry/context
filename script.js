const textInput = document.getElementById("text-input");
const charCountSpan = document.getElementById("char-count");

textInput.addEventListener("keydown", function(e) {
  if (e.key === "Tab") {
    this.value += "\t";
    e.preventDefault();
  }
});
textInput.addEventListener("input", function(e) {
  e.preventDefault();
  charCountSpan.innerText = this.value.length;
});


const generateButton = document.getElementById("generate-button");
const output = document.getElementById("generated-link");

generateButton.addEventListener("click", function() {
  const text = textInput.value;
  if (text.length === 0) {
    return;
  }

  const compressed = LZString.compressToBase64(text);
  output.innerText = window.location.href + "/" + compressed;
});