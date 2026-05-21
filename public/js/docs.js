import { copyToClipboard } from "/src/utils/copyToClipboard.js";

const $$resultBtns = document.querySelectorAll(".resultBtn");
const $$clipboardBtns = document.querySelectorAll("#copy-btn");

$$clipboardBtns.forEach(($btn) => {
  $btn.addEventListener("click", () => {
    const $codeElement = $btn.parentElement.querySelector("code");
    const $btnText = $btn.parentElement.querySelector("#btn-text");

    copyToClipboard($codeElement.textContent)
      .then(() => {
        $btnText.textContent = "Copied!";
        $btnText.style.color = "#15803d";

        setTimeout(() => {
          $btnText.textContent = "Copy";
          $btnText.style.color = "inherit";
        }, 3000);
      })
      .catch(() => {
        console.error("Failed to copy text");
      });
  });
});

$$resultBtns.forEach(($btn) => {
  $btn.addEventListener("click", (e) => {
    const jsonResult = e.target.parentElement.querySelector(".result");
    jsonResult.classList.toggle("hidden");
  });
});
