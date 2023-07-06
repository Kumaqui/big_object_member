var member_ac = localStorage.getItem("member_ac")
if (!member_ac) {
    window.location = "./login.html"
}
const reloadBtn = document.getElementById("payment");
const loader = document.getElementById("loader");
const loader_text = document.getElementById("loader_text");
const loader_bg = document.getElementById("bg_gray_loader");

// 顯示旋轉圖示
// 執行重新載入動作...
reloadBtn.addEventListener("click", function () {
    if ($('input[name="all"]').is(':checked')) {
        loader.style.visibility = "visible";
        loader_text.style.visibility = "visible";
        loader_bg.style.visibility = "visible";

        setTimeout(() => loader.style.visibility = "hidden", 1500)
        setTimeout(() => loader_text.style.visibility = "hidden", 1500)
        setTimeout(() => loader_bg.style.visibility = "hidden", 1500)
    }
});

//  餘額不足提示框
$("#close_not_money").on("click", function () {
    $(".n_m_hidden").css("visibility", "hidden")
})

// 全選框
$(document).ready(function () {
    $('#payment_all').change(function () {
        // console.log("123")
        if ($('#payment_all').is(':checked')) {
            // console.log("456")
            $('input[name="all"]').prop('checked', $(this).prop('checked'));
            $('.nook').removeClass("nook_hidden")
            $('.hover_pyment').addClass("box")
            var total = 0;
            $('input[name="all"]:checked').each(function () {
                total += parseInt($(this).val());
            })
            // console.log(total)
            $('#total').text(`${total}`).css("font-weight", "bold")
            var count = $('input[name="all"]:checked').length
            // console.log(count)
            $('#sum').text(`${count}`).css("font-weight", "bold")
            $('#payment').removeClass('btn_white');
            $('#payment').addClass('btn_yellow');
        } else {
            // console.log("2143")
            $('.nook').addClass("nook_hidden")
            $('.hover_pyment').removeClass("box")
            $('input[name="all"]').prop('checked', false);
            var total = 0;
            // console.log(total)
            $('#total').text(`${total}`).css("font-weight", "bold")
            var count = $('input[name="all"]:checked').length
            // console.log(count)
            $('#sum').text(`${count}`).css("font-weight", "bold");
            $('#payment').removeClass('btn_yellow');
            $('#payment').addClass('btn_white');
        }
    });
})

// 當勾選框有勾選時 繳費按鈕套用css
function paymnet_checked() {
    $('input[name="all"]').on("change", function () {
        if ($('input[name="all"]').is(':checked')) {
            $('#payment').removeClass('btn_white');
            $('#payment').addClass('btn_yellow');
            // console.log(this)
        } else {
            $('#payment').removeClass('btn_yellow');
            $('#payment').addClass('btn_white');

        }
    })
}



// 將選到的繳費金額相加
function payment_total_add_up() {
    $('input[name="all"]').change(function () {
        var total = 0;
        $('input[name="all"]:checked').each(function () {
            total += parseInt($(this).val());
        })
        // console.log(total)
        $('#total').text(`${total}`).css("font-weight", "bold")

    })
}
// 將選到的繳費筆數相加
function payment_sum_add_up() {
    $('input[name="all"]').change(function () {
        var count = $('input[name="all"]:checked').length
        // console.log(count)
        $('#sum').text(`${count}`).css("font-weight", "bold")

    })
}





// 繳費
// 點擊繳費跳出繳費框
document.getElementById('payment').onclick = function () {
    if ($('input[name="all"]').is(':checked')) {
        // console.log("14")
        var x = document.getElementById('hidden');
        setTimeout(() => {
            x.style.visibility = "visible";
        }, 1800);
    }

}
// 點擊繳費框外的區域收起繳費框
$(document).bind('click', function (e) {
    if ($(e.target).closest("#myclose").length == 0) {
        document.getElementById('hidden').style.visibility = "hidden";
    }
    if ($(e.target).closest("#notmoney").length == 0) {
        // console.log("124")
        $(".n_m_hidden").css("visibility", "hidden")
    }
})
// 點擊繳費框取消按鈕收起繳費框
document.getElementById('cancel').onclick = function () {
    document.getElementById('hidden').style.visibility = "hidden"
}

// 停止label觸發兩次的問題
function stopClick(event) {
    event.stopPropagation();
}


// 車牌改變時，顯示該車牌的繳費明細
$("select[name='license']").on("change", function () {
    $('#payment_all').prop('checked', false);
    var data_license = $("select[name='license'] option:selected").val();
    // console.log(data_license)
    cat(data_license);

})


// append繳費明細資料
function cat(a) {
    $(".data_py").empty();
    $('#total').empty();
    $('#sum').empty();
    // console.log(a)
    $.ajax({
        type: "GET",
        url: `http://localhost:3000/select/payment/${a}`,
    }).done(function (e) {
        // console.log(e)
        var dataServer = JSON.parse(e)
        // console.log(dataServer[0])

        for (var i = 0; i < dataServer.length; i++) {
            // console.log(dataServer[i].py_id)
            $(".data_py").append(`
            <div tabindex="0" class="container hover_pyment bg_white border_top_gray border_bottom_gray"
>
            <div class="nook nook_hidden">
            <h4><b>已選</b></h4>
             </div>
        <div class="row" style="margin-top:-15px">
            <div class="col-1 dis_flex_center">
                <input data-delete-id="${dataServer[i].py_id}" name="all" style="height: 20px; width: 20px;" type="checkbox" id="payment_${dataServer[i].py_id}" value=${dataServer[i].py_amount}>
            </div>
            <div class="col-11 payment_value">
                <label for="payment_${dataServer[i].py_id}" onclick="stopClick(event)">
                    <div class="row container">
                        <div class="col-12">    
                            <h3><b> 停車繳費</b></h3>
                        </div>
                        <div class="col-12 border_bottom_gray border_top_gray">
                            <div class="row ">
                                <div class="col-8 ">
                                    <div class="row ">
                                        <div class="col-12 pt-4">
                                            <div class="row">
                                                <div class="col-4">
    
                                                    <div class="row ms-2">
                                                        <div class="col-12 dis_flex_center date123">
                                                            <h5 class="date1">${dataServer[i].py_ps_d}</h5>
                                                        </div>
                                                        <div class="col-12 dis_flex_center">
                                                            <h5 class="time1">${dataServer[i].py_ps_t
                }</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-4 dis_flex_center">
                                                    <i class="fa fa-arrow-circle-right"
                                                        style="font-size: 14px; color: #0069B4;"></i>
    
                                                </div>
                                                <div class="col-4">
                                                    <div class="row me-2">
                                                        <div class="col-12 dis_flex_center">
                                                            <h5 class="date2">${dataServer[i].py_pe_d
                }</h5>
                                                        </div>
                                                        <div class="col-12 dis_flex_center">
                                                            <h5 class="time2">${dataServer[i].py_pe_t}</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12 " style="display: flex; align-items:center;">
                                            <h5 class="mt-3 parking">
                                                ${dataServer[i].py_location}
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4 ">
                                    <div class="row  pt-4">
                                        <div class="col-12">
                                            <h4>
                                                <b>應繳金額</b>
                                            </h4>
                                        </div>
                                        <div class="col-12 mt-2 dis_flex_center">
                                            <h2 class="test">
                                            ${dataServer[i].py_amount}
                                            </h2>
                                            <h3 class="mt-1">元</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="row mt-3">
                             <div class="col-3">
                                    <h4><b>車牌:</b></h4>
                                </div>
                                <div class="col-9">
                                    <h4 class="license">${dataServer[i].license}</h4>
                                </div>
                            </div>
    
                        </div>
                    </div>
                </label>
            </div>
        </div>
    </div>
    
           `)

        }
        payment_total_add_up()
        payment_sum_add_up()
        paymnet_checked()

        // 添加css單擊 box
        $(".hover_pyment").click(function () {
            // payment_check_box()
            if ($(this).find($('input[name="all"]')).is(':checked')) {
                $(this).find('.nook').removeClass("nook_hidden")
                $(this).addClass("box")
                // var x = $(this).attr('id')
                // console.log(x)
            } else {
                $(this).find('.nook').addClass("nook_hidden")
                $(this).removeClass("box")
            }
        })
    })
}
// 得到車牌資料
var id = localStorage.getItem("memberID")
console.log(id)
var url = `http://localhost:3000/select/license/${id}`;
$.get(url, function (license) {
    $.each(JSON.parse(license), function (index, value) {
        // console.log(value.license)
        // console.log(index)
        if (index == 0) {
            $("select[name='license']").append(`<option selected value=${value.license}>  ${value.license}  </option>`)
            // console.log(value.license)
            // console.log(index)
            // var license_payment = $("select[name='license'] option:selected").text();
            // 預設顯示 index == 0 的車牌的繳費明細
            cat(value.license)

        } else {
            $("select[name='license']").append(`<option value=${value.license}>  ${value.license}  </option>`)
            // console.log(value.license)
            // console.log(index)
            // cat(value.license)
        }
    })

})
// 得到錢包餘額資料
var id = localStorage.getItem("memberID")
console.log(id)

$.ajax({
    url: `http://localhost:3000/select/member`,
    type: "post",
    data: { id }
}).done(function (wallet) {
    $.each(JSON.parse(wallet), function (index, value) {
        // console.log(value)
        $("#wallet").text(`${value.member_money}元`).css("font-weight", "bold")
        // `<option>${value} </option>`
    })
})
// 繳費框收起
window.addEventListener("scroll", function () {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        // $(".dis_wrap").removeClass("pt-2")
        $(".scroll").css("height", "11vh").css("transition-duration", "0.1s")
        $(".scroll_row").css("flexWrap", "nowrap").css("transition-duration", "0.1s")
        // $(".dis_flex_row_1").css("margin-bottom", "15px").css("transition-duration", "0.1s")
        $(".i_top").removeClass("i_hidden")
    } else {
        $(".dis_wrap").addClass("pt-2")
        $(".scroll").css("height", "16vh").css("transition-duration", "0.3s")
        $(".scroll_row").css("flexWrap", "wrap").css("transition-duration", "0.3s")
        // $(".dis_flex_row_1").css("margin-bottom", "0px").css("transition-duration", "0.3s")
        $(".i_top").addClass("i_hidden")
    }
});
//  按下確定後 將資料傳到交易紀錄並跳轉至繳費頁面
// console.log(parseInt($("#total")))
$("#payment_sure").on("click", function () {
    var y = $("#total")
    // console.log(y[0].innerText)
    $.ajax({
        url: `http://localhost:3000/select/member`,
        type: "post",
        data: { id }
    }).done(function (wallet) {
        $.each(JSON.parse(wallet), function (index, value) {
            var x = value.member_money
            var paymentcheckbox = document.getElementsByName('all');
            var test = $('.test')
            // console.log(test)
            var date1 = $('.date1')
            var date2 = $('.date2')
            var time1 = $('.time1')
            var time2 = $('.time2')
            var parking = $('.parking')

            if (x >= parseInt(y[0].innerText)) {
                for (i = 0; i < test.length; i++) {

                    if (paymentcheckbox[i].checked) {

                        var d = new Date()
                        $.ajax({
                            type: 'POST',
                            url: 'http://localhost:3000/insert/traderecord',
                            data: {
                                id: id,
                                amount: test[i].innerText,
                                date: `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`,
                                time: `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`,
                                location: parking[i].innerText,
                                counterparty: parking[i].innerText,
                                type: "2",
                                ps: `${date1[i].innerText} ${time1[i].innerText}`,
                                pe: `${date2[i].innerText} ${time2[i].innerText}`,
                            }
                        })
                    }
                }
                $('input[name="all"]:checked').each(function () {
                    var delete_id = $(this).data('delete-id');
                    // console.log(delete_id)
                    $.ajax({
                        type: "DELETE",
                        url: `http://localhost:3000/delete/payment/${delete_id}`,
                        contentType: "application/json",
                        success: function () {
                            console.log(delete_id)
                        }
                    })
                });
                window.location = "./Payment_success.html"

            } else {
                // 隱藏繳費框
                $("#hidden").css("visibility", "visible").css({
                    "visibility": "hidden",
                    "transition-duration": "0.5s"
                })
                //    顯示餘額不足提示
                $('.n_m_hidden').css("visibility", "hidden");

                setTimeout(function () {
                    $(".n_m_hidden").css({
                        "visibility": "visible"
                    });
                }, 1000);
            }
        })
    })

})

payment_sure.onclick = function () {
    var y = $("#total")
    // sessionStorage.setItem 儲存資料
    sessionStorage.setItem("payment", `${parseInt(y[0].innerText)}`)
}

$(".payment_page").on("click", function () {
    window.location = "./Gold_flow_home.html"
})



$(".stored").on("click", function () {
    var url = window.location.href;
    // console.log(url)
    if (url.indexOf("Payment") !== -1) {
        sessionStorage.setItem('returnUrl', './Payment.html');
    } else {
        sessionStorage.setItem("returnUrl", "./index.html");
    }
});

