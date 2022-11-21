const target = "김승일";

const clicks = document.querySelectorAll(".click");
const sections = document.querySelectorAll("section");
const firstTop = sections[0].offsetTop;
const secondTop = sections[1].offsetTop;
const thirdTop = sections[2].offsetTop;

clicks[0].onclick = function () {
  window.scroll({ top: firstTop, behavior: "smooth" });
};
clicks[1].onclick = function () {
  window.scroll({ top: secondTop, behavior: "smooth" });
};
clicks[2].onclick = function () {
  window.scroll({ top: thirdTop, behavior: "smooth" });
};

// db
$(document).ready(function () {
  show_comment();
});

function show_comment() {
  $.ajax({
    type: "GET",
    url: `/members/${target}/comments`,
    data: {},
    success: function (response) {
      const comments = response["data"];
      $("#comment-list").empty();
      comments.forEach((comment) => {
        let temp_html = `
                         <div class="card">
                                            <div class="card-body">
                                                <blockquote class="blockquote mb-0">
                                                    <p>${comment.contents}</p>
                                                    <footer class="blockquote-footer">${comment.author}</footer>
                                                    <button onclick="delete_comment(${comment.num})" type="button" class="btn btn-dark">삭제</button>
                                                </blockquote>
                                            </div>
                                        </div>
                        `;
        $("#comment-list").append(temp_html);
      });
    },
  });
}

function save_comment() {
  const author = document.querySelector("#author").value;
  const contents = document.querySelector("#contents").value;

  $.ajax({
    type: "POST",
    url: `/members/${target}/comments`,
    data: { author, contents },
    success: function (response) {
      document.querySelector("#author").value = '';
      document.querySelector("#contents").value = '';
      alert(response["msg"]);
      show_comment();
    },
  });
}
function delete_comment(num) {
  $.ajax({
    type: "PUT",
    url: `/members/${target}/comments`,
    data: { num },
    success: function (response) {
      alert(response["msg"]);
      show_comment();
    },
  });
}
