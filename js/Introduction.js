// 麵包屑
// $("ul.dropdown-menu li").on("click", function () {
//     let i = $(this).attr("data-store");
//     let text = $("a.dropdown-toggle")
//     switch (i) {
//         case '餐廳':
//             text.text("寵物餐廳");
//             break;
//         case '旅館':
//             text.text("寵物旅館");
//             break;
//         case '美容':
//             text.text("寵物美容");
//             break;
//         case '學校':
//             text.text("寵物學校");
//             break;
//         case '醫院':
//             text.text("寵物醫院");
//             break;
//     }
// });

function blobToDataURL(blob, callback) {
    let a = new FileReader();
    a.onload = function (e) { callback(e.target.result); }
    a.readAsDataURL(blob);
}
function geturl(blob) {
    blobToDataURL(blob, function (dataURL) {
        // console.log(dataURL);
        return dataURL
    });
}

function typedArrayToURL(typedArray, mimeType) {
    console.log(URL.createObjectURL(new Blob([typedArray.buffer], { type: mimeType })))
    return URL.createObjectURL(new Blob([typedArray.buffer], { type: mimeType }))
}


var storeVOlist = '';

window.onload = (event) => {
    let githubURL = new URL(window.location.href);
    let params = githubURL.searchParams;
    console.log(githubURL.searchParams.toString());
    for (let pair of params.entries()) {
        console.log(`key: ${pair[0]}, value: ${pair[1]}`)

        let text = $("a.dropdown-toggle")
        switch (pair[1]) {
            case 'restaurant':
                text.text("寵物餐廳");
                break;
            case 'hostel':
                text.text("寵物旅館");
                break;
            case 'grooming':
                text.text("寵物美容");
                break;
            case 'school':
                text.text("寵物學校");
                break;
            case 'hospital':
                text.text("寵物醫院");
                break;
        }

        $.ajax({
            url: "http://localhost:8081/TDA101G2/Store_frontController",
            type: "GET",                  // GET | POST | PUT | DELETE | PATCH
            data: {
                "action": "store_type",
                "type": `${pair[1]}`
            },
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
                storeVOlist = data;
                // $("#storelist_card").empty();
                let cards_html = '';
                if (data.length != 0) {
                    $.each(data, function (index, item) {


                        var blob = new Blob([item.store_image1], { type: 'image/jpg' })

                        // ./images/卡片圖.jpg   ${objectURL}
                        cards_html += `
                            <div class="col-12 col-sm-6 col-md-3 d-flex justify-content-center cardview">
                                <div class="card" style="width: 18rem;">
                                    <img src="" class="card-img-top" alt="...">
                                    <div class="card-body">
                                        <h5 class="card-title">${item.store_name}</h5>
                                        <p class="card-text">` + item.store_introduction + `</p>
                                        <div class="d-flex justify-content-end"> 
                                            <a href="#" class="btn btn-primary">預約</a>
                                        </div>
                                    </div>
                                </div>
                            </div>`

                    });
                }
                $("#storelist_card").prepend(cards_html);
            }
        });
    }
};


function aaa() {
    console.log(storeVOlist[0])
}