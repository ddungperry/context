const textInput = document.getElementById("text-input");
const charCountSpan = document.getElementById("char-count");

textInput.addEventListener("keydown", function(e) {
  if (e.key === "Tab") {
    const start = this.selectionStart;
    const end = this.selectionEnd;
    this.value = this.value.substring(0, start) + "\t" + this.value.substring(end);
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

  let compressed = LZString.compressToBase64(text);
  compressed = encodeURIComponent(compressed);
  output.innerText = `${window.location.origin}${window.location.pathname}?c=${compressed}`;
});

const urlParams = new URLSearchParams(window.location.search);
let compressed = urlParams.get("c");
if (compressed) {
  compressed = decodeURIComponent(compressed);
  const text = LZString.decompressFromBase64(compressed);
  textInput.value = text;
  charCountSpan.innerText = text.length;
}
