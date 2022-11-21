const target = '권병석'

$(document).ready(function () {
    show_comment();
});

function show_comment() {
    $.ajax({
        type: "GET",
        url: `/members/${target}/comments`,
        data: {},
        success: function (response) {
            let rows = response['data']
            $('#comment-list').empty();
            for (let i = 0; i < rows.length; i++) {
                let name = rows[i]['author']
                let comment = rows[i]['contents']
                let num = rows[i]['num']
                let temp_html = `<div class="card" style="#f5f5f5; border: solid #f5f5f5;
border-width: 1px 0;
box-shadow: inset 0 0.5em 1.5em #f5f5f5, inset 0 0.125em 0.5em rgba(33, 37, 41, 1);">
                                <div class="card-body">
                                    <blockquote class="blockquote mb-0">
                                        <p>${comment}</p>
                                        <footer class="blockquote-footer">${name}</footer>
                                        <button onclick="delete_comment(${num})" type="button" class="btn btn-outline-danger btn-sm" style="float: right">삭제</button>
                                    </blockquote>
                                </div>
                            </div>`
                $('#comment-list').append(temp_html)
            }
        }
    });
}

function save_comment() {
    let author = $('#name').val()
    let contents = $('#comment').val()

    $.ajax({
        type: "POST",
        url: `/members/${target}/comments`,
        data: {author, contents},
        success: function (response) {
            $('#name').val('');
            $('#comment').val('');
            alert(response["msg"])
            show_comment();
        }
    });
}

function delete_comment(num) {
    $.ajax({
        type: "PUT",
        url: `/members/${target}/comments`,
        data: {num: num},
        success: function (response) {
            alert(response["msg"])
            show_comment();
        }
    });
}