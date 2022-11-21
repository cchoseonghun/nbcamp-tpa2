const target = '이효원'

$(document).ready(function () {
    set_temp()
    show_comment()
});

function set_temp() {
    $.ajax({
        type: "GET",
        url: "http://spartacodingclub.shop/sparta_api/weather/seoul",
        data: {},
        success: function (response) {
            $('#temp').text(response['temp'])
        }
    })
}

function save_comment() {
    let author = $('#name').val()
    let contents = $('#comment').val()
    console.log(author, contents);
    $.ajax({
        type: "POST",
        url: `/members/${target}/comments`,
        data: {author, contents},
        success: function (response) {
            $('#name').val('');
            $('#comment').val('');
            alert(response["msg"]);
            show_comment();
        }
    });
}

function show_comment() {
    $('#comment-list').empty()
    $.ajax({
        type: "GET",
        url: `/members/${target}/comments`,
        data: {},
        success: function (response) {
            const comments = response["data"];
            $('#comment-list').empty();
            comments.forEach((comment) => {
            let temp = `<div class="card">
                            <div class="card-body">
                                <blockquote class="blockquote mb-0">
                                    <p>${comment.author}</p>
                                    <footer class="blockquote-footer">${comment.contents}</footer>
                                </blockquote>
                            </div>
                        </div>`;
            $('#comment-list').append(temp);
        })
        }
    });
}