// 麵包屑
$("ul.dropdown-menu li").on("click", function () {
    let i = $(this).attr("data-store");
    let text = $("a.dropdown-toggle")
    switch (i) {
        case '餐廳':
            text.text("寵物餐廳");
            break;
        case '旅館':
            text.text("寵物旅館");
            break;
        case '美容':
            text.text("寵物美容");
            break;
        case '學校':
            text.text("寵物學校");
            break;
        case '醫院':
            text.text("寵物醫院");
            break;
    }
});

window.onload = (event) => {
    let githubURL = new URL(window.location.href);
    let params = githubURL.searchParams;
    console.log(githubURL.searchParams.toString());
    for (let pair of params.entries()) {
        console.log(`key: ${pair[0]}, value: ${pair[1]}`)

        $.ajax({
            url: "http://localhost:8081/TDA101G2/Store_frontController",
            type: "GET",                  // GET | POST | PUT | DELETE | PATCH
            data: {
                "action": "store_type",
                "type": `${pair[1]}`
            },                  // 傳送資料到指定的 url
            dataType: "json",             // 預期會接收到回傳資料的格式： json | xml | html
            beforeSend: function () {       // 在 request 發送之前執行
            },
            statusCode: {                 // 狀態碼
                200: function (res) {
                    console.log("200")
                },
                404: function (res) {
                    console.log("400")
                },
                500: function (res) {
                    console.log("500")
                }
            },
            error: function (xhr) {         // request 發生錯誤的話執行
                console.log(xhr.responseText);
            },

            success: function (data) {
                console.log(data);

                $("#storelist_card").empty();
                let cards_html = '';
                if (data.length != 0) {
                    $.each(data, function (index, item) {
                        console.log(item.store_name);
                        cards_html += `
                            <div class="col-12 col-sm-6 col-md-3 d-flex justify-content-center cardview">
                                <div class="card" style="width: 18rem;">
                                    <img src="./images/卡片圖.jpg" class="card-img-top" alt="...">
                                    <div class="card-body">
                                        <h5 class="card-title">` + item.store_name + `</h5>
                                        <p class="card-text">` + item.store_introduction + `</p>
                                        <div class="d-flex justify-content-end"> 
                                            <a href="#" class="btn btn-primary">預約</a>
                                        </div>
                                    </div>
                                </div>
                            </div>`
                    });
                }
                $("#storelist_card").append(cards_html);
            }
        });
    }
};


