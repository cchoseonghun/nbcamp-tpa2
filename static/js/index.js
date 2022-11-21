const target = "TEAM";

// const clicks = document.querySelectorAll(".click");
// const sections = document.querySelectorAll("section");
// const firstTop = sections[0].offsetTop;
// const secondTop = sections[1].offsetTop;
// const thirdTop = sections[2].offsetTop;
//
// clicks[0].onclick = function () {
//   window.scroll({ top: firstTop, behavior: "smooth" });
// };
// clicks[1].onclick = function () {
//   window.scroll({ top: secondTop, behavior: "smooth" });
// };
// clicks[2].onclick = function () {
//   window.scroll({ top: thirdTop, behavior: "smooth" });
// };

// db
$(document).ready(function () {
  showComment();
});

function showComment() {
    $.ajax({
        type: "GET",
        url: `/members/${target}/comments`,
        data: {},
        success: function (response) {
            const comments = response["data"];
            $('#contents_list').empty();

            if (comments.length > 0) {
                comments.forEach((comment) => {
                    let temp = `<tr>
                                    <th scope="row">${comment.author}</th>
                                    <td>${comment.contents}<button onclick="deleteComment(${comment.num})" type="button" class="btn btn-outline-danger btn-sm" style="float: right">삭제</button></td>
                                </tr>`;
                    $('#contents_list').append(temp);
                })
            } else {
                let temp = `<tr>
                                <th scope="row" colspan="2">데이터가 없습니다.</th>
                            </tr>`;
                $('#contents_list').append(temp);
            }

        }
    });
}

function saveComment() {
    const author = document.querySelector('#author').value
    const contents = document.querySelector('#contents').value
    $.ajax({
        type: "POST",
        url: `/members/${target}/comments`,
        data: {author, contents},
        success: function (response) {
            document.querySelector('#author').value = '';
            document.querySelector('#contents').value = '';
            alert(response["msg"])
            showComment();
        }
    });
}

function deleteComment(num) {
    $.ajax({
        type: "PUT",
        url: `/members/${target}/comments`,
        data: { num },
        success: function (response) {
            alert(response["msg"])
            showComment();
        }
    });
}