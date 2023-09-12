const { async } = require("regenerator-runtime");

const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const deleteBtn = document.querySelectorAll(".deleteBtn");

const addComment = (text, id, commentArr) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.className = "video__comment";
  newComment.dataset.id = id;
  const span = document.createElement("span");
  span.innerText = text;
  const span2 = document.createElement("span");
  span2.innerText = "❌";
  newComment.appendChild(span);
  newComment.appendChild(span2);
  videoComments.prepend(newComment);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify({ text }), //looks like String
  });
  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId, userComments } = await response.json();
    addComment(text, newCommentId, userComments);
  }
};

const deleteComment = (event) => {
  const videoComments = document.querySelector(".video__comments ul");
  const commentList = event.target.parentNode;
  videoComments.removeChild(commentList);
};

const handleDelete = () => {
  const videoComment = document.querySelector(".video__comment");
  const commentId = videoComment.dataset.id;
  const videoId = videoContainer.dataset.id;
  const response = fetch(`/api/comments/${commentId}/delete`, {
    method: "DELETE",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify({ videoId }),
  });
  if (response.status === 201) {
    deleteComment(event);
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}

for (let i = 0; i < deleteBtn.length; i++) {
  deleteBtn[i].addEventListener("click", handleDelete);
}
