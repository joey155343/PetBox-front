
window.onload = (event) => {
    let githubURL = new URL(window.location.href);
    let params = githubURL.searchParams;
    // console.log(githubURL.searchParams.toString());
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
                // console.log(data);
                // $("#storelist_card").empty();
                let cards_html = '';
                if (data.length != 0) {

                    $.each(data, function (index, item) {
                        let src = 'https://via.placeholder.com/268x150';
                        if (item.store_image1 != null) {
                            let bytes = new Uint8Array(item.store_image1.length);
                            for (let i = 0; i < bytes.length; i++) {
                                bytes[i] = item.store_image1[i];
                            }
                            let blob = new Blob([bytes], { type: 'image/png' });
                            src = URL.createObjectURL(blob);
                        }
                        cards_html += `
                          <div class="col-12 col-sm-6 col-md-3 d-flex justify-content-center cardview">
                          <div class="card" style="width: 18rem;" onclick="pageMiddle(this)" name="${item.store_id}">
                            <img src="${src}" class="card-img-top" alt="..."></img>
                                  <div class="card-body">
                                      <h5 class="card-title">${item.store_name}</h5>
                                      <p class="card-text">${item.store_introduction}</p>
                                      <div class="d-flex justify-content-end"> 
                                          <a href="#" class="btn btn-primary" onclick="pageBooking(this)" name="${item.store_id}">預約</a>
                                      </div>
                                  </div>
                              </div>
                          </div>`;
                    });
                }
                $("#storelist_card").prepend(cards_html);
                // 連動介紹頁籤 - 第一筆
                reMiddlePage(data[0].store_id);
            }
        });
    }
};
// 卡片->介紹頁籤
function pageMiddle(e) {
    $("#pills-profile-tab").tab('show');
    let id = $(e).attr("name");
    reMiddlePage(id);
}
// 預約按鈕->預約頁籤
function pageBooking(e) {
    $("#pills-contact-tab").tab('show');
    event.stopPropagation();
    // 連動介紹頁籤
    let id = $(e).attr("name");
    reMiddlePage(id);
}
// 介紹頁籤
function reMiddlePage(store_id) {
    console.log(store_id);
    // location.reload()
    $.ajax({
        url: "http://localhost:8081/TDA101G2/Store_frontController",
        type: "GET",                  // GET | POST | PUT | DELETE | PATCH
        data: {
            "action": "getStoreVO",
            "storeId": store_id
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
            if (data.length != 0) {
                $("#showStore_introduction").text(data.store_introduction);
                let imgArray = [data.store_image1, data.store_image2, data.store_image3]
                for (i = 0; i < 3; i++) {
                    let src = 'https://via.placeholder.com/1200x800';
                    if (imgArray[i] != null) {
                        let bytes = new Uint8Array(imgArray[i].length);
                        for (let x = 0; x < bytes.length; x++) {
                            bytes[x] = imgArray[i][x];
                        }
                        let blob = new Blob([bytes], { type: 'image/png' });
                        src = URL.createObjectURL(blob);
                        $("#showStore_image" + (i + 1)).attr("src", src);
                    }
                };
            }
        }
    });
}