"use strict";
const form = document.querySelector("#request-form");
const topic = document.querySelector("#topic");
const message = document.querySelector("#message");
const draft = document.querySelector("#draft");
const draftText = document.querySelector("#draft-text");
const feedback = document.querySelector("#draft-feedback");
const email = document.querySelector("#send-email");
const copy = document.querySelector("#copy-draft");
const instructions = "Скопируйте текст, вставьте его в чат и отправьте. Или отправьте подготовленное письмо.";

form.hidden = false;
message.addEventListener("input", () => message.setCustomValidity(""));
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = message.value.trim();
  if (!value) {
    message.setCustomValidity("Напишите сообщение.");
    message.reportValidity();
    return;
  }
  const text = ["Здравствуйте! Заявка с временной страницы UniProject.", topic.value && "Направление: " + topic.value, "", value].filter((line, index) => line || index === 2).join("\n");
  draftText.value = text;
  email.href = "mailto:doom10cfera@yandex.ru?subject=" + encodeURIComponent("Заявка в продюсерский центр UniProject") + "&body=" + encodeURIComponent(text);
  draft.hidden = false;
  feedback.textContent = instructions;
  draftText.focus();
});
copy.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(draftText.value);
    feedback.textContent = "Текст скопирован. Откройте Telegram и вставьте его в сообщение.";
  } catch {
    draftText.focus();
    draftText.select();
    feedback.textContent = "Текст выделен. Скопируйте его и вставьте в чат.";
  }
});
