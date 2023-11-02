// JavaScript Document
var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};
function hashInput(input) {
    return hex_md5(hex_md5(input) + hex_md5(input));
}
window.mobileCheck = function () {
    var check = false;
    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}
$(document).on('ready', function () {
    $('.document').on('change', function (event) {
        const reader = new FileReader();
        reader.readAsText(event.target.files[0]);
        var fd = new FormData();
        fd.append('file', event.target.files[0]);
        $.ajax({
            url: '/Services/Ajax.aspx',
            data: fd,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function (data) {
                $('.filename').val(data);
            }
        });
    });
    $('.ddlModels').on('change', function () {
        $('#since-year-div select').val("").change();
        $('.ddlMonths').val("").change();
        $('.ddlKm').val("").change();
    });

    $('.sinceYear').on('change', function () {
        $('.ddlMonths').val("").change();
        $('.ddlKm').val("").change();
    });


    $('.service-price-form select').not('.ddlKm').on('change', function () {
        var artiSelectedModel = $('.ddlModels').children('option:selected').val();
        var artiSelectedMonth = $('.ddlMonths').children('option:selected').val();
        var artiSelectedYear = $('.sinceYear').children('option:selected').val();
        if (artiSelectedModel != "" && artiSelectedMonth != "" && artiSelectedYear != "") {
            var serviceType = "";
            if ($('.servicetype').val() == "0") {
                if ($('.sinceYear option:selected').val() == "2021")
                    serviceType = "1";
                else
                    serviceType = "2";
            } else if ($('.servicetype').val() == "1") {
                if ($('.sinceYear option:selected').val() == "2021")
                    serviceType = "3";
                else
                    serviceType = "4";
            }
            $.ajax({
                url: '/Services/Ajax.aspx',
                type: 'post',
                dataType: 'JSON',
                data: { op: 'GetServiceKm', model: artiSelectedModel, month: artiSelectedMonth, serviceType: serviceType },
                success: function (result) {
                    if (result !== '') {
                        $('select.ddlKm').find('option').remove();
                        $('select.ddlKm').append('<option value="">' + 'Km' + '</option>');
                        $.each(result.data, function (index, value) {
                            $('select.ddlKm').append('<option value="' + value.km + '">' + [value.km.slice(0, value.km.length - 3), '.', value.km.slice(value.km.length - 3)].join('') + '</option>');
                        });
                    } else {
                    }
                }
            });
        }
    });

    $('.satissonrasi .btn_call').on('click', function () {
        $('.satissonrasi form').slideToggle();
    });
    $('.satis_close').on('click', function () {
        $('.satissonrasi form').slideToggle();
    });

    $('.aspNetHidden').remove();

    //IHM POP-UP
    const storageType = localStorage;
    const isSetIhm = 'isSetIhm';

    const shouldShowPopup = () => !storageType.getItem(isSetIhm);
    const saveToStorage = (key, value) => storageType.setItem(key, value);

    $('.ihm-set-pref-btn').on('click', function () {
        $('.ihm-text-div').hide();
        $('.ihm-set-pref').show();
        var cookie_one = storageType.getItem('ihm-cookie-one') == "false" ? false : true;
        var cookie_two = storageType.getItem('ihm-cookie-two') == "false" ? false : true;
        var cookie_three = storageType.getItem('ihm-cookie-three') == "false" ? false : true;
        $('#ihm-first-checkbox').prop('checked', cookie_one);
        $('#ihm-second-checkbox').prop('checked', cookie_two);
        $('#ihm-third-checkbox').prop('checked', cookie_three);
    });

    $('#ihm-back-btn').on('click', function () {
        $('.ihm-set-pref').hide();
        $('.ihm-text-div').show();
    });

    $('#ihm-info-cookie-one').on('click', function () {
        $('.ihm-info-one').show();
        $('.ihm-pref-bg').show();
    });

    $('#ihm-info-cookie-two').on('click', function () {
        $('.ihm-info-two').show();
        $('.ihm-pref-bg').show();
    });

    $('#ihm-info-cookie-three').on('click', function () {
        $('.ihm-info-three').show();
        $('.ihm-pref-bg').show();
    });

    $('#ihm-info-close-first').on('click', function () {
        $('.ihm-info-one').hide();
        $('.ihm-pref-bg').hide();
    });

    $('#ihm-info-close-second').on('click', function () {
        $('.ihm-info-two').hide();
        $('.ihm-pref-bg').hide();
    });

    $('#ihm-info-close-third').on('click', function () {
        $('.ihm-info-three').hide();
        $('.ihm-pref-bg').hide();
    });



    if (shouldShowPopup()) {
        $('.ihm-popup-overlay').show();
        $('.ihm-popup').show();
    }

    $('#ihm-accept-all-btn').on('click', function () {
        saveToStorage('ihm-cookie-one', true);
        saveToStorage('ihm-cookie-two', true);
        saveToStorage('ihm-cookie-three', true);
        saveToStorage(isSetIhm, true);
        $('.ihm-popup-overlay').hide();
        $('.ihm-popup').hide();
    });

    $('#ihm-accept-pref-btn').on('click', function () {
        saveToStorage('ihm-cookie-one', $('#ihm-first-checkbox').is(':checked'));
        saveToStorage('ihm-cookie-two', $('#ihm-second-checkbox').is(':checked'));
        saveToStorage('ihm-cookie-three', $('#ihm-third-checkbox').is(':checked'));
        saveToStorage(isSetIhm, true);
        $('.ihm-popup-overlay').hide();
        $('.ihm-popup').hide();
    });

    $('#cookie-btn').on('click', function () {
        var cookie_one = storageType.getItem('ihm-cookie-one') == "false" ? false : true;
        var cookie_two = storageType.getItem('ihm-cookie-two') == "false" ? false : true;
        var cookie_three = storageType.getItem('ihm-cookie-three') == "false" ? false : true;
        $('input[id="ihm-first-checkbox"]').prop('checked', cookie_one);
        $('input[id="ihm-second-checkbox"]').prop('checked', cookie_two);
        $('input[id="ihm-third-checkbox"]').prop('checked', cookie_three);
        $('.ihm-popup-overlay').show();
        $('.ihm-popup').show();
        $('.ihm-text-div').hide();
        $('.ihm-set-pref').show();
    });

    $('#ihm-info-cookie-one').on('click', function () {
        $('.ihm-set-pref').css('overflow', 'hidden');
    });

    $('#ihm-info-cookie-two').on('click', function () {
        $('.ihm-set-pref').css('overflow', 'hidden');
    });

    $('#ihm-info-cookie-three').on('click', function () {
        $('.ihm-set-pref').css('overflow', 'hidden');
    });

    $('.ihm-info-arrow').on('click', function () {
        $('.ihm-set-pref').css('overflow', 'visible');
    });

    $('#ihm-accept-reject-opposition-btn').on('click', function () {
        $('#ihm-accept-reject-opposition-btn').hide();
        $('#ihm-opposition-back-btn').hide();
        $('.ihm-load-cont').hide();
        $('.ihm-load-wrap').show();
        $('.ihm-load-circle').css('animation', 'border .4s ease 1 forwards');
        $('.ihm-load-circle').css('cursor', 'none');
        saveToStorage("opposition", false);
        $('input[id="ihm-first-checkbox"]').prop('checked', false);
        $('input[id="ihm-second-checkbox"]').prop('checked', false);
        $('input[id="ihm-third-checkbox"]').prop('checked', false);
        saveToStorage('ihm-cookie-one', $('#ihm-first-checkbox').is(':checked'));
        saveToStorage('ihm-cookie-two', $('#ihm-second-checkbox').is(':checked'));
        saveToStorage('ihm-cookie-three', $('#ihm-third-checkbox').is(':checked'));
        setTimeout(function () {
            $('.ihm-opposition').hide();
            $('#ihm-accept-accept-opposition-btn').show();
            $('#ihm-opposition-back-btn').show();
            $('.ihm-load-wrap').hide();
            $('.ihm-load-cont').show();
            $('.ihm-pref-bg').hide();
            $('.ihm-popup').css('overflow', 'auto');
            $('.ihm-set-pref').css('overflow', 'visible');
        }, 800)
    });

    $('#ihm-accept-accept-opposition-btn').on('click', function () {
        $('#ihm-accept-accept-opposition-btn').hide();
        $('#ihm-opposition-back-btn').hide();
        $('.ihm-load-cont').hide();
        $('.ihm-load-wrap').show();
        $('.ihm-load-circle').css('animation', 'border .4s ease 1 forwards');
        $('.ihm-load-circle').css('cursor', 'none');
        saveToStorage("opposition", true);
        $('input[id="ihm-first-checkbox"]').prop('checked', true);
        $('input[id="ihm-second-checkbox"]').prop('checked', false);
        $('input[id="ihm-third-checkbox"]').prop('checked', false);
        saveToStorage('ihm-cookie-one', $('#ihm-first-checkbox').is(':checked'));
        saveToStorage('ihm-cookie-two', $('#ihm-second-checkbox').is(':checked'));
        saveToStorage('ihm-cookie-three', $('#ihm-third-checkbox').is(':checked'));
        setTimeout(function () {
            $('.ihm-opposition').hide();
            $('#ihm-accept-reject-opposition-btn').show();
            $('#ihm-opposition-back-btn').show();
            $('.ihm-load-wrap').hide();
            $('.ihm-load-cont').show();
            $('.ihm-pref-bg').hide();
            $('.ihm-popup').css('overflow', 'auto');
            $('.ihm-set-pref').css('overflow', 'visible');
        }, 800)
    });

    $('.ihm-pref-objection').on('click', function () {
        var opposition = storageType.getItem("opposition") == "false" ? false : true;
        if (opposition) {
            $('#ihm-accept-reject-opposition-btn').css('display', 'block');
            $('#ihm-accept-accept-opposition-btn').css('display', 'none');
        }
        else {
            $('#ihm-accept-accept-opposition-btn').css('display', 'block');
            $('#ihm-accept-reject-opposition-btn').css('display', 'none');
        }
        $('.ihm-opposition').show();
        $('.ihm-pref-bg').show();
        $('.ihm-set-pref').css('overflow', 'hidden');
        $('.ihm-popup').css('overflow', 'hidden');
    });

    $('#ihm-opposition-back-btn').on('click', function () {
        $('.ihm-opposition').hide();
        $('.ihm-pref-bg').hide();
        $('.ihm-popup').css('overflow', 'auto');
        $('.ihm-set-pref').css('overflow', 'visible');
    });

    $('#ihm-close-opposition').on('click', function () {
        $('.ihm-opposition').hide();
        $('.ihm-pref-bg').hide();
        $('.ihm-set-pref').css('overflow', 'visible');
    });


    //IHM POP-UP

    if (window.mobileCheck() == true) {
        //$('.satissonrasi .btn_call').after($('.satissonrasi form'));
        $('.satissonrasi .btn_mobil').on('click', function () {
            $('.select_bayi').slideToggle();
            $('.select_bayi .box-input .satissehir').after($('.satissonrasi .ddlCities'));
            $('.select_bayi .box-input .satisbayi').after($('.satissonrasi .brand-select'));
        });

    }



    //if (window.mobileCheck() == true) {
    //    $('.main-form .bottom .left p').on('click', function () {
    //        $(this).children('span').addClass('showspan');
    //    })
    //    $('.main-form .bottom .left p').mouseout(function () {
    //        $('.main-form .bottom .left p span').removeClass('showspan');
    //    })
    //}

})

$(function () {

    //$('select').selectBoxIt({ });
    $('input,textarea,select').placeholder();
    if ($('html').hasClass('no-csstransforms3d')) {
        $(".txtPhone").mask("09999999999");
    } else {
        $('.txtPhone').inputmask("09999999999");
    }

    $('form#kivaWebToSupport_webform_form input[name="mobile"]').mask("09999999999");
    $('form#filotalepform input[name="mobile"]').mask("09999999999");

    $('.txtFullName').on("cut copy paste", function (e) {
        e.preventDefault();
    });

    $('select.ddlModels').not('.suv-test-surusu').on('change', function () {
        var modelCode = $(this).children('option:selected').val();
        var isHopi = $(this).hasClass('hopi');
        var general = $(this).hasClass('general');
        var ticari = $(this).hasClass('ticari');
        if (modelCode == "") {
            $('.preview').show();
            $('.right .detail').html('');
            if (!general && !ticari) {
                $('.imgModel').attr('src', '../assets/img/bilgi_talebi_cover-v2.jpg');
            }
            else if (!general && ticari) {
                $('.imgModel').attr('src', '../assets/img/new-form/direksiyon-ticari-2.jpg');
            }
            else {
                $('.imgModel').hide();
                $('#ifrmameDefault').show();
            }
            $('.right .buttons').hide();
            //$('.pre-order-body .ddlCities').empty();
        } else {
            $('.form-left').show();
            $('.right .buttons').show();
            $.ajax({
                url: '/Services/Ajax.aspx',
                type: 'POST',
                cache: false,
                dataType: 'JSON',
                data: { op: 'ModelCode', modelCode: modelCode },
                success: function (returnData) {
                    //Baslangic Fiyatinin oldugu kisim
                    $('#divDetail').empty();
                    $('#divDetail').html(returnData.data[0].modelStartInformation);

                    //Arac gorseli default olarak basiliyor
                    $('.imgModel').show();
                    if (!isHopi) {
                        console.log(modelCode)
                        $('.imgModel').attr('src', '/assets/uploads/modelimg/' + modelCode + '.jpg');
                        $("meta[property='og\\:image']").attr("content", 'http://talep.peugeot.com.tr/assets/uploads/modelimg/' + modelCode + '.jpg');
                    } else {
                        $('.imgModel').attr('src', '/assets/uploads/modelimg/' + modelCode + '_hopi.jpg');
                    }
                    $('#ifrmameDefault').hide();
                    // Arac h1 baslik
                    $('.car-title').html(returnData.data[0].modelHeader)
                    // Kampanya kismi mavi alan resmin altindaki
                    if (returnData.data[0].modelCampaign == "") {
                        $('.campaign-line').hide();
                    } else {
                        $('.campaign-line').show();
                        $('.campaign-line').html(returnData.data[0].modelCampaign);
                    }
                    //Detay kismi lacivert bgli alan sol taraftaki
                    if (returnData.data[0].modelDetailText == "") {
                        $('.description').hide();
                    } else {
                        $('.description').show();
                        $('.description').html(returnData.data[0].modelDetailText);
                    }
                    if (returnData.data.length > 0) {
                        $('.detail').show();
                        $('.buttons').show();
                        var campHhtml = returnData.data[0].modelCampaign;
                        campHhtml += returnData.data[0].modelHtml;
                        if (!isHopi) {
                            $('.detail').html(campHhtml);
                        } else {
                            $('.detail').html("<p>Peugeot SUV 2008’de <br>En Uzun Gecenin En İyi Teklifi <br><br>Hopililere Özel Fiyat <br>Peugeot SUV 2008 Allure 1.6 BlueHDi 100hp ETG6 Safety Pack<br>119.900 TL </p><ul><li>Baştan Çıkaran SUV Tasarımı</li><li>PEUGEOT i-Cockpit®</li><li>Apple CarPlay® ve MirrorLink®</li></ul><p style='color: #0866c2; padding-bottom:5px;'>Safety Paket:</p><ul><li>Aktif Şehiriçi Güvenlik Sistemi(FARC)</li><li>Park Assist(Otomatik Park Sistemi)</li><li>Navigasyon Sistemi </li></ul>");
                        }
                        $('.buttons .kesfet').hide();
                        if (returnData.data[0].modelButtonName != "") {
                            $('.buttons .kesfet').show();
                            $('.buttons .kesfet').text(returnData.data[0].modelButtonName);
                            $('.buttons .kesfet').attr('href', returnData.data[0].modelButtonLink)
                        }
                        $('.buttons .kampanya').attr('href', returnData.data[0].modelTerms);
                        $('.form-left .watch').attr('href', returnData.data[0].modelYoutube);
                    }
                    if (returnData.data[0].modelTerms == "") {
                        $('.buttons .kampanya').hide();
                    } else {
                        $('.buttons .kampanya').show();
                    }
                    if (returnData.data[0].modelDisclaimerBottom == "") {
                        $('.disc.bottom-text').hide();
                    } else {
                        $('.disc.bottom-text').html(returnData.data[0].modelDisclaimerBottom);
                        $('.disc.bottom-text').show();
                    }
                    if (returnData.data[0].modelDisclaimerTop == "") {
                        $('.disc.top-text').hide();
                    } else {
                        $('.disc.top-text').html(returnData.data[0].modelDisclaimerTop);
                        $('.disc.top-text').show();
                    }
                    if (returnData.data[0].modelDisclaimerButton == "") {
                        $('.disc-button.buttonBottom-text').hide();
                    } else {
                        $('.disc-button.buttonBottom-text').html(returnData.data[0].modelDisclaimerButton);
                        $('.disc-button.buttonBottom-text').show();
                    }
                    if (returnData.data[0].modelYoutube == "") {
                        $('.form-left .watch').hide();
                    } else {
                        $('.form-left .watch').show();
                    }

                    if ($('.pre-order-body').length > 0) {
                        parseCity($('.ddlModels').val());

                    }
                }
            });
        }

    });

    //$(".btn-sorgu").click(function () {
    //    if ($('#chassis').val() != "") {

    //        $('.sasi-sorgu table').show();
    //        $('.sasi-sorgu table tr td').remove();
    //        $('.sorgu-form .error').text("");

    //        $.ajax({
    //            url: '/Services/Ajax.aspx',
    //            type: 'POST',
    //            cache: false,
    //            dataType: 'JSON',
    //            data: { op: 'CheckChassis', vin: $('#chassis').val() },
    //            success: function (result) {
    //                if (result.length > 0) {
    //                    console.log(result);
    //                    for (var i = 0; i < result.length; i++) {
    //                        var appendHTML = "";

    //                        appendHTML += '<tr>';
    //                        appendHTML += '<td>' + result[i].vin + '</td>';
    //                        appendHTML += '<td>' + result[i].campaignCode + '</td>';
    //                        appendHTML += '<td>' + result[i].campaignDescription + '</td>';
    //                        appendHTML += '<td>' + result[i].additionalDescription + '</td>';
    //                        appendHTML += '</tr>';

    //                        $('.sasi-sorgu table').append(appendHTML);
    //                        $('.btn-find').show();
    //                    }

    //                } else {
    //                    if (result.error !== undefined) {
    //                        $('.sorgu-form .error').text(result.error);
    //                        $('.sasi-sorgu table').hide();
    //                        $('.btn-find').hide();
    //                    } else {
    //                        alert('Aracınız için tanımlı bir kampanya bulunmamaktadır veya şasi numaranız tanımsızdır.');
    //                        $('.sasi-sorgu table').hide();
    //                        $('.btn-find').hide();
    //                    }
    //                }
    //            }
    //        });


    //    }
    //});

    $('.inset .ddlCities').not('.satis-sonrasi').on('change', function () {
        var value = $(this).children('option:selected').val();
        if ($(this).hasClass('model')) {
            parseBrandsModel(value, $('.ddlModels').val());

        } else {
            parseBrands(value);

        }
    });



    $('.label_radio').on("click", function () {
        $('.label_radio').removeClass('required');
        setupLabel();
    });
    $('.label_check').on("click", function () {
        $('.label_check').removeClass('required');
        setupLabel();
    });
    /*
    $('.button').not('.after-sell').click(function () {
        if (checkInfoForm(false)) {
            validateForm(false);
        }
    });
    */
    $('.button.after-sell').click(function () {
        if (checkInfoForm(false, true)) {
            validateForm(true);
        }
    });

    $('.btnrifter').click(function () {
        if (checkInfoForm(false)) {
            YeniRifterOnTalepValidate();
        }
    });


    $('.buttonHopi').click(function () {
        if (checkInfoForm(true)) {
            SendHopiData();
        }
    });

    $('.terms').fancybox({
        afterLoad: function () {
            setTimeout(function () {
                $('#scrollbar2, #scrollbar3 ').jScrollPane({ autoReinitialise: true });
            }, 200)
        }
    });


    $('.optionalContainer a').click(function () {
        $(this).addClass('selected').siblings().removeClass('selected');
    });

    //$('select').trigger('chosen:updated');
	/*$('.input-search-dealer').focusout(function(){
		$('.input-search-dealer').animate({ width:0},500,function(){
			$('.search-dealer').fadeOut(500,function(){
				
			});	
		});	
	});*/
    //setupLabel();

    //#region kurfirsati

    $('select.drpModel').change(function () {
        var model = $(this).children('option:selected').val();
        var modelText = $(this).children('option:selected').text();
        if (model != "0") {

            window.location.href = "/kur-firsati/" + model;

        } else if (model == "0" && modelText == 'Tümünü Seçiniz') {
            window.location.href = "https://talep.peugeot.com.tr/kur-firsati";
        }

    });

    $('select.drpVersion').change(function () {
        var model = $('select.drpModel').children('option:selected').val();
        var version = $(this).children('option:selected').val();
        if (model != "0" && version != "0") {
            $('select.drpCity').find('option').remove().end().append('<option value="0">İl</option>').val('0')
            $.ajax({
                url: '/Services/Ajax.aspx',
                type: 'POST',
                cache: false,
                dataType: 'JSON',
                data: { op: 'ExchangeCityGetList', model: model, version: version },
                success: function (returnData) {
                    if (returnData != null && returnData.data.length > 0) {
                        $.each(returnData.data, function (index, value) {
                            $('select.drpCity').append('<option value="' + value.city + '">' + value.city + '</option>');
                        });
                        $('select.drpCity').append('<option value="-1">Tümünü Sec</option>');
                    }

                }
            });
        } else {
            $('select.drpCity').find('option').remove().end().append('<option value="0">İl</option>').val('0')
        }

    });

    $('a.showexop').on('click', function () {
        var model = $('select.drpModel').children('option:selected').val();
        var version = $('select.drpVersion').children('option:selected').val();
        var city = $('select.drpCity').children('option:selected').val();

        $('#tblData').find("tr:gt(0)").remove();

        $.ajax({
            url: '/Services/Ajax.aspx',
            type: 'POST',
            cache: false,
            dataType: 'JSON',
            data: { op: 'ExchangeCityGetResult', model: model, version: version, city: city },
            success: function (returnData) {
                if (returnData != null && returnData.data.length > 0) {
                    $.each(returnData.data, function (index, value) {
                        var row = "<tr><td><a href='/kur-firsati-teklif-al/" + value.id + "'>" + value.version + "</a></td ><td><a href='/kur-firsati-teklif-al/" + value.id + "'>" + value.option + "</a></td><td><a href='/kur-firsati-teklif-al/" + value.id + "'>" + value.color + "</a></td><td><a href='/kur-firsati-teklif-al/" + value.id + "'>" + value.fuel + "</a></td><td><a href='/kur-firsati-teklif-al/" + value.id + "'>" + value.gear + "</a></td><td><a href='/kur-firsati-teklif-al/" + value.id + "'>" + value.recommendedPrice.replace(',', '.') + "</a></td><td><a href='/kur-firsati-teklif-al/" + value.id + "'>" + value.modelYear + "</a></td><td><a href='/kur-firsati-teklif-al/" + value.id + "'>" + value.chassis + "</a></td><td><a href='/kur-firsati-teklif-al/" + value.id + "'>" + value.authorizedDealer + "</a></td><td><a href='/kur-firsati-teklif-al/" + value.id + "'>" + value.city + "</a></td><td><a href='/kur-firsati-teklif-al/" + value.id + "' class='btn-teklif'>Teklif Al</a></td></tr>";
                        $('#tblData').append(row);
                    });
                }

            }
        });
    });

    $('.buttonExchange').on('click', function () {

        var fullName = $('.txtFullName').val();
        var phone = $('.txtPhone').val();
        var email = $('.txtEmail').val();
        var checkVal = $('#checkbox-01').val();

        var model = $('.hdnModel').val();
        var version = $('.hdnVersion').val();
        var option = $('.hdnOption').val();
        var color = $('.hdnColor').val();
        var fuel = $('.hdnFuel').val();
        var gear = $('.hdnGear').val();
        var recommendedPrice = $('.hdnRecommendedPrice').val();
        var modelYear = $('.hdnModelYear').val();
        var chassis = $('.hdnChassis').val();
        var authorizedDealer = $('.hdnAuthorizedDealer').val();
        var city = $('.hdnCity').val();
        if (fullName !== '' && phone !== '' && email !== '' && checkVal != "0") {
            $.ajax({
                url: '/Services/Ajax.aspx',
                type: 'post',
                data: { op: 'SaveExchangeForm', fullName: fullName, phone: phone, email: email, model: model, version: version, option: option, color: color, fuel: fuel, gear: gear, recommendedPrice: recommendedPrice, modelYear: modelYear, chassis: chassis, authorizedDealer: authorizedDealer, city: city }
            }).done(function (result) {
                if (result !== '') {
                    window.location.href = window.location.origin + "/" + result;
                } else {
                    alert('Mail gönderiminde Hata oluştu. Lütfen daha sonra tekrar deneyinz.');
                }
                return false;
            });
        } else {
            alert('Lütfen tüm alanları doldurunuz')
        }
    });

    //#endregion

    //#region hopi bilgi talebi

    function SendHopiData() {
        var _fullName = $('.txtFullName').val();
        var _phone = $('.txtPhone').val();
        var _email = $('.txtEmail').val();
        var _authorizedDealer = $('select.ddlBrands option:selected').text();
        var _city = $('select.ddlCities option:selected').text();
        var _type = $('.optionalContainer input:checked').val() == '2' ? "Bilgi Almak İstiyorum" : ($('.optionalContainer input:checked').val() == '3' ? "Yeni Araç Almak İstiyorum" : '');
        var _model = $('select.ddlModels option:selected').val();
        var _modelName = $('select.ddlModels option:selected').text();

        $.ajax({
            url: '/Services/Ajax.aspx',
            type: 'post',
            data: { op: 'SendMailHopiForm', fullName: _fullName, phone: _phone, email: _email, model: _model, modelName: _modelName, authorizedDealer: _authorizedDealer, city: _city, type: _type }
        }).done(function (result) {
            if (result !== '') {
                window.location.href = window.location.origin + "/" + result;
            } else {
                alert('Mail gönderiminde Hata oluştu. Lütfen daha sonra tekrar deneyinz.');
            }
            return false;
        });
    }

    //#endregion

});


function number(evt) {
    var kod = (evt.which) ? evt.which : event.keyCode
    if (kod > 32 && kod < 65)
        return false;
    else if (kod > 90 && kod < 97)
        return false;
    else
        true;
}
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log('desteklenmiyor');
    }

    $('.main-form .right .box-input .inset').after($('#ContentPlaceHolder1_div1'));
    // $('.multiple-cities').after($('.optionalContainer'));

}

function showPosition(position) {
    $.getJSON("/Services/Ajax.aspx?op=ClosedDealers&Lat=" + position.coords.latitude + "&Long=" + position.coords.longitude, function (data) {
        //console.log(data);
        console.log(data.data[0].City);


        $('.ddlCities option[value=' + data.data[0].CityId + ']').attr('selected', 'selected');
        parseBrands(data.data[0].CityId);

        setTimeout(function () {
            $('.ddlBrands option[value=' + data.data[0].Id + ']').attr('selected', 'selected');
            console.log("asd");
        }, 1000);

    }).fail(function () { console.log("kayıt bulunamadı"); });
}

$('.yetkili').on('click', function () {
    navigator.geolocation.getCurrentPosition(showPosition);
})



function parseBrands(city) {
    $.ajax({
        url: '/Services/Ajax.aspx',
        type: 'POST',
        cache: false,
        dataType: 'JSON',
        data: { op: 'GetDealers', cityId: city },
        success: function (returnData) {
            if (returnData.data.length > 0) {
                $('select.ddlBrands').not('.professional').empty();
                //if (city == "6444") {
                for (var i = returnData.data.length - 1; i > 0; i--) {
                    var j = Math.floor(Math.random() * (i + 1));
                    var temp = returnData.data[i];
                    returnData.data[i] = returnData.data[j];
                    returnData.data[j] = temp;
                }
                //}
                /* new */
                for (var i = 0; i < returnData.data.length; i++) {
                    var curr = returnData.data[i];
                    if (curr.rrid == '900245F') {
                        var option = $('<option>', { value: curr.Id, 'data-phone': curr.phone, 'data-rrid': curr.rrid, text: curr.dealer + ' (' + curr.town + '/Ayazağa)' });
                        $('select.ddlBrands').not('.professional').append(option);
                    } else if (curr.rrid == '900221N') {
                        var option = $('<option>', { value: curr.Id, 'data-phone': curr.phone, 'data-rrid': curr.rrid, text: curr.dealer + ' (' + curr.town + '/Tarabya)' });
                        $('select.ddlBrands').not('.professional').append(option);
                    } else {
                        var option = $('<option>', { value: curr.Id, 'data-phone': curr.phone, 'data-rrid': curr.rrid, text: curr.dealer + ' (' + curr.town + ')' });
                        $('select.ddlBrands').not('.professional').append(option);
                    }
                }
                //$('select.ddlBrands')[0].sumo.reload();
                /* #new */
                /*
                var selectTemp = '<select id="ddlBrands" class="ddlBrands">';
                selectTemp += '<option value="0">Bayi Seçiniz</option>';
                for (var i = 0; i < returnData.data.length; i++) {
                    var curr = returnData.data[i];
                    console.log(curr)
                    var temp = '<option value="' + curr.Id + '" data-phone="'+ curr.phone +'">' + curr.dealer + ' (' + curr.town + ')</option>';
                    selectTemp += temp;
                }
                selectTemp += '</select><div class="validate-box">*Bayi seçiniz.</div>';
                $('#brand-select').append(selectTemp);*/
                //$('#brand-select select').selectBoxIt({ });
            } else {
                setTimeout(function () {
                    $('select.ddlBrands').not('.professional').empty();
                    var option = $('<option>', { value: 'Önce şehir seçiniz', text: 'Önce şehir seçiniz' });
                    $('select.ddlBrands').not('.professional').append(option);
                }, 500);
            }
        }
    });

}


function parseBrandsModel(city, model) {
    $.ajax({
        url: '/Services/Ajax.aspx',
        type: 'POST',
        cache: false,
        dataType: 'JSON',
        data: { op: 'GetDealersByModel', cityId: city, model: model },
        success: function (returnData) {
            if (returnData.data.length > 0) {
                $('select.ddlBrands').empty();
                //if (city == 34 || city == 35) {
                for (var i = returnData.data.length - 1; i > 0; i--) {
                    var j = Math.floor(Math.random() * (i + 1));
                    var temp = returnData.data[i];
                    returnData.data[i] = returnData.data[j];
                    returnData.data[j] = temp;
                }
                //}
                /* new */
                for (var i = 0; i < returnData.data.length; i++) {
                    var curr = returnData.data[i];
                    var option = $('<option>', { value: curr.Id, text: curr.dealer + ' (' + curr.town + ')' });
                    //var temp = '<option value="' + curr.Id + '" data-phone="'+ curr.phone +'">' + curr.dealer + ' (' + curr.town + ')</option>';
                    $('select.ddlBrands').append(option);
                }
                //$('select.ddlBrands')[0].sumo.reload();

                /*
                var selectTemp = '<select id="ddlBrands" class="ddlBrands">';
                selectTemp += '<option value="0">Bayi Seçiniz</option>';
                for (var i = 0; i < returnData.data.length; i++) {
                    var curr = returnData.data[i];
                    console.log(curr)
                    var temp = '<option value="' + curr.Id + '">' + curr.dealer + ' (' + curr.town + ')</option>';
                    selectTemp += temp;
                }
                selectTemp += '</select><div class="validate-box">*Bayi seçiniz.</div>';
                $('#brand-select').append(selectTemp);
                //$('#brand-select select').selectBoxIt({ }); */
            } else {
                setTimeout(function () {
                    $('select.ddlBrands').empty();
                    var option = $('<option>', { value: 'Önce şehir seçiniz', text: 'Önce şehir seçiniz' });
                    $('select.ddlBrands').append(option);
                }, 500);
            }
        }
    });
}


function parseCity(model) {
    $('#citySelect').empty();
    $.ajax({
        url: '/Services/Ajax.aspx',
        type: 'POST',
        cache: false,
        dataType: 'JSON',
        data: { op: 'GetCitiesByModel', model: model },
        success: function (returnData) {


            if (returnData.data.length > 0) {
                var selectTemp = '<select class="ddlCities model">';
                selectTemp += '<option value="0">Şehir</option>';
                for (var i = 0; i < returnData.data.length; i++) {
                    var curr = returnData.data[i];
                    var temp = '<option value="' + curr.Id + '">' + curr.Name + '</option>';
                    selectTemp += temp;
                }
                selectTemp += '</select><div class="validate-box">*Şehir seçiniz.</div>';
                $('#citySelect').append(selectTemp);
                //$('#citySelect select').selectBoxIt({ });
                $('.inset select.ddlCities').change(function () {
                    var value = $(this).children('option:selected').val();
                    var side = $(this).children('option:selected').data('sideid');
                    parseBrands(value, $('.chooseModel select option:selected').val());
                });
            } else {
                setTimeout(function () {
                    $('#citySelect').append($('<span />').attr('class', 'message').text('Şehir Bulunamadı'));
                }, 500);
            }
        }
    });
}
var retval = true;
var isBilgiTalebi = $('form[action*="bilgi-talebi"]').length > 0;
function checkInfoForm(isHopi, isAfterSellForm) {
    retval = true;
    var fullname = $('.txtFullName').val();
    var email = $('.txtEmail').val();
    var phone = $('.txtPhone').val();
    var city = $('select.ddlCities').val();
    var brand = $('select.ddlBrands').val();
    var models = $('select.ddlModels').val();
    var surveyAnswer = $('.optionalContainer input:checked').val();
    var checkbox = $('#checkbox-01').is(':checked');
    var checkbox2 = $('#checkbox-02').is(':checked');
    var formtype = $('.formtype').val();
    var leadid = $('.leadid').val();
    var gclientid = $('.gclientid').val();
    var modelName = $('.chooseModel select option:selected').text();
    if (isAfterSellForm) {
        surname = $('.txtFullName').val();
        surveyAnswer = -1
    } else {
        surname = '';
    }

    console.log(surveyAnswer);

    if (fullname != "") {
        $('.txtFullName').parent().parent().removeClass('required');
        $('.txtFullName').next('.validate-box').fadeOut(500);
        if (($.trim(fullname)).indexOf(' ') == -1 && !isAfterSellForm) {
            $('.txtFullName').parent().parent().addClass('required');
            $('.txtFullName').next('.validate-box').fadeIn(500);
            retval = false;
        } else {
            $('.txtFullName').parent().parent().removeClass('required');
            $('.txtFullName').next('.validate-box').fadeOut(500);
            retval = true;
        }
    } else {
        $('.txtFullName').parent().parent().addClass('required');
        $('.txtFullName').next('.validate-box').fadeIn(500);
        retval = false;
    }
    if (surname == "" && isAfterSellForm) {
        $('.validate-box.name').fadeIn(500);
        $('.txtSurname').parent().parent().addClass('required');
        retval = false;
    } else {
        $('.txtSurname').parent().parent().removeClass('required');
        $('.validate-box.name').fadeOut(500);
        retval = true;
    }
    if (validatePhone(phone)) {
        $('.txtPhone').parent().parent().removeClass('required');
        $('.txtPhone').next('.validate-box').fadeOut(500);
        retval = true;
    } else {
        $('.txtPhone').parent().parent().addClass('required');
        $('.txtPhone').next('.validate-box').fadeIn(500);
        retval = false;
    }
    if (validateEmail(email)) {
        $('.txtEmail').parent().parent().removeClass('required');
        $('.txtEmail').next('.validate-box').fadeOut(500);
        retval = true;
    } else {
        $('.txtEmail').parent().parent().addClass('required');
        $('.txtEmail').next('.validate-box').fadeIn(500);
        retval = false;
    }

    // ÖN TALEP FORMU İÇİN BREAKE POINT
    if (formtype == "on-bilgi-talebi" && retval == true) {
        return true
    }

    if (brand != "" && brand != "Bayi Seçiniz" && brand != 0) {
        $('.ddlBrands').parent().parent().removeClass('required');
        $('.ddlBrands').next().next('.validate-box').fadeOut(500);
        retval = true;
    } else {
        $('.ddlBrands').parent().parent().addClass('required');
        $('.ddlBrands').next().next('.validate-box').fadeIn(500);
        retval = false;
    }
    if (city != "" && city != "Seçiniz" && city != 0) {
        $('.ddlCities').parent().parent().removeClass('required');
        $('.ddlCities').next().next('.validate-box').fadeOut(500);
        retval = true;
    } else {
        $('.ddlCities').parent().parent().addClass('required');
        $('.ddlCities').next().next('.validate-box').fadeIn(500);
        retval = false;
    }
    if (!isAfterSellForm) {
        if (models != "" && models != "models" && models != 0) {
            $('.ddlModels').parent().parent().removeClass('required');
            $('.ddlModels').next().next('.validate-box').fadeOut(500);
            retval = true;
        } else {
            $('.ddlModels').parent().parent().addClass('required');
            $('.ddlModels').next().next('.validate-box').fadeIn(500);
            retval = false;
        }
        if (surveyAnswer) {
            $('.optionalContainer').removeClass('required');
            retval = true;
        } else {
            $('.optionalContainer').addClass('required');
            retval = false;
        }
    }
    if (checkbox) {
        $('#checkbox-01').parent().removeClass('required');
        $('.checkboxes').children('.validate-box').fadeOut(500);
        retval = true;
    } else {
        $('#checkbox-01').parent().addClass('required');
        $('.checkboxes').children('.validate-box').fadeIn(500);
        retval = false;
    }

    if (isHopi) {
        if (checkbox2) {
            $('#checkbox-02').parent().removeClass('required');
            $('.checkboxes').children('.validate-box2').fadeOut(500);
            retval = true;
        } else {
            $('#checkbox-02').parent().addClass('required');
            $('.checkboxes').children('.validate-box2').fadeIn(500);
            retval = false;
        }
    }
    if (isBilgiTalebi) {
        if ($('.ddlModels').val() == '') {
            retval = false;
            alert('Lütfen bir araç modeli seçiniz');
        } else {
            retval = true;
        }
    }
    setTimeout(function () {
        $('.validate-box').fadeOut(500);
    }, 10000)
    console.log('retval', retval);
    return retval;
}

function responseType(model, email, phone, cityName, dealerName, plate, FormName, eventAction, firmName) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'gaevent',
        'eventCategory': 'Lead', //
        'eventAction': eventAction, // click
        'eventLabel': FormName,// eg: Yetkili Servis Randev
        'eventNonInteraction': true,
        'model': model,
        'email': email, // will be sent with hash
        'tel': phone, // will be sent with hash
        'şehir': cityName,
        'bayi': dealerName,
        'araç plakası': plate,
        'firma': firmName
    });
}

function validateForm(isAfterSellForm) {
    var name = $('.txtFullName').val();
    var surname = $('.txtSurname').val();
    var email = $('.txtEmail').val();
    var phone = $('.txtPhone').val();
    var city = $('select.ddlCities option:selected').text();
    var brand = $('select.ddlBrands').val();
    var models = $('select.ddlModels').val();
    var kModel = $('.ddlModels').find('option:selected').data('kiva-id');
    var kCity = $('.ddlCities').find('option:selected').val();
    var surveyAnswer = $('.optionalContainer input:checked').val();
    var lRequest = $('.optionalContainer input:checked').data('kiva-id');
    var checkbox = $('#checkbox-01').is(':checked');
    var checkbox2 = $('#checkbox-02').is(':checked');
    var dealerRRID = $('.ddlBrands').find('option:selected').data('rrid');
    var formtype = $('.formtype').val();
    var leadid = $('.leadid').val();
    var gclientid = $('.gclientid').val();
    var gclid = $('.gclid').val();
    var fbclid = $('.fbclid').val();
    var plate = $('.txtPlaka').val();
    var ishopi = $('.ishopi').val();
    var valet_request = $('#vale').is(':checked');

    var txtNote = $('#txtNote').val();

    var location = $('.location').val();
    var utmSource = $('.utmsource').val();
    var utmCampaign = $('.utmcampaign').val();
    var utmContent = $('.utmcontent').val();
    var utmMedium = $('.utmmedium').val();
    var fullUrl = $('.url').val();
    var queryString = $('.querystring').val();
    var fullUrl = $('.url').val();
    var idpdv = $('.idpdv').val();

    if (!isAfterSellForm) {
        surname = ' ';
    }

    if (isAfterSellForm && retval) {
        $('.button.after-sell').attr("disabled", "disabled");
        $('.button.after-sell span').html("BEKLEYİNİZ");
        $.ajax({
            url: '/Services/Ajax.aspx',
            type: 'post',
            data: { op: 'SaveSatisSonrasiForm', location: location, utmSource: utmSource, utmCampaign: utmCampaign, utmContent: utmContent, utmMedium: utmMedium, idpdv: idpdv, fullUrl: fullUrl, name: name, surname: surname, plate: plate, txtNote: txtNote, email: email, model: models, kModel: kModel, kCity: kCity, phone: phone, city: city, dealerRRID: dealerRRID, dealer: brand, mediaagreed: $('#checkbox-01').val(), etk: $('#checkbox-01-etk').val(), formtype: formtype, leadid: leadid, surveyAnswer: surveyAnswer, gclientid: gclientid, gclientid: gclientid, gclid: gclid, fbclid: fbclid, ishopi: ishopi, valet_request: valet_request },
            success: function (res) {
                console.log('Başarılı: Satış Sonrası Destek', res);
                responseType($('.ddlModels').find('option:selected').text(), hashInput($('.txtEmail').val()), hashInput($('.txtPhone').val()), $('.ddlCities').find('option:selected').text(), $('.ddlBrands').find('option:selected').text(), $('.txtPlaka').val(), "Satış Sonrası Form", "Success", '');
                $('.satis-sonrasi-cover').slideUp(150, function () {
                    $('.form-sent-final').slideDown(150);
                });
                //window.location.href = window.location.origin + "/" + res;
            },
            error: function (res) {
                responseType($('.ddlModels').find('option:selected').text(), hashInput($('.txtEmail').val()), hashInput($('.txtPhone').val()), $('.ddlCities').find('option:selected').text(), $('.ddlBrands').find('option:selected').text(), $('.txtPlaka').val(), "Satış Sonrası Form", "Fail", '');
                console.log('Hata var: Satış Sonrası Destek', res);
                return false;
            }
        }).done(function (result) {
            //window.location.href = window.location.origin + "/" + result;
            //console.log('SaveSatisSonrasiForm tamamlandı');
            //return false;
        });
        //pageTracker._trackEvent('Form', 'Form Kayıt');
        return true;
    }

    if (isBilgiTalebi && retval) {
        $('.button.after-sell').attr("disabled", "disabled");
        $('.button.after-sell span').html("BEKLEYİNİZ");
        $.ajax({
            url: '/Services/Ajax.aspx',
            type: 'post',
            data: { op: 'SaveBilgiTalebi', location: location, utmSource: utmSource, utmCampaign: utmCampaign, utmContent: utmContent, utmMedium: utmMedium, fullUrl: fullUrl, idpdv: idpdv, name: name, surname: surname, txtNote: txtNote, email: email, lRequest: lRequest, model: models, kModel: kModel, kCity: kCity, phone: phone, city: city, dealerRRID: dealerRRID, dealer: brand, mediaagreed: $('#checkbox-01').val(), etk: $('#checkbox-01-etk').val(), formtype: formtype, leadid: leadid, surveyAnswer: surveyAnswer, gclientid: gclientid, gclid: gclid, fbclid: fbclid, ishopi: ishopi, queryString: queryString },
            success: function (res) {
                responseType($('.ddlModels').find('option:selected').text(), hashInput($('.txtEmail').val()), hashInput($('.txtPhone').val()), $('.ddlCities').find('option:selected').text(), $('.ddlBrands').find('option:selected').text(), $('.txtPlaka').val(), "Bilgi Talebi Form", "Success", '');
                console.log('Başarılı: Bilgi Talebi', res);
                //window.location.href = window.location.origin + "/" + res;
                $('.bilgi-talebi-cover').slideUp(150, function () {
                    $('.form-sent-final').slideDown(150);
                });
            },
            error: function (res) {
                responseType($('.ddlModels').find('option:selected').text(), hashInput($('.txtEmail').val()), hashInput($('.txtPhone').val()), $('.ddlCities').find('option:selected').text(), $('.ddlBrands').find('option:selected').text(), $('.txtPlaka').val(), "Bilgi Talebi Form", "Fail", '');
                console.log('Hata var: Bilgi Talebi', res);
                return false;
            }
        }).done(function (result) {
            //window.location.href = window.location.origin + "/" + result;
            //console.log('SaveSatisSonrasiForm tamamlandı');
            //return false;
        });
        //pageTracker._trackEvent('Form', 'Form Kayıt');
        return true;
    }
    // form submit
    if (validatePhone(phone) && validateEmail(email) && fullname != "" && surname != "" && city != "" && city != 0 && city != "Seçiniz" && brand != "" && brand != 0 && brand != "Bayi Seçiniz" && models != "" && models != 0 && models != "Seçiniz" && $('input[name=sample-checkbox-01]').is(':checked') && checkbox) {
        $('input, .chosen-container, select').parent().parent().removeClass('required');

        if ($('form').hasClass('pre-order')) {
            $('.button').attr("disabled", "disabled");
            $('.button span').html("BEKLEYİNİZ");
            $.ajax({
                url: '/Services/Ajax.aspx',
                type: 'post',
                data: { op: 'SaveForm2', location: location, utmSource: utmSource, utmCampaign: utmCampaign, utmContent: utmContent, name: name, surname: surname, kModel: kModel, kCity: kCity, fullname: fullname, txtNote: txtNote, email: email, model: models, phone: phone, city: city, dealerRRID: dealerRRID, dealer: brand, mediaagreed: $('#checkbox-01').val(), etk: $('#checkbox-01-etk').val(),formtype: formtype, leadid: leadid, surveyAnswer: surveyAnswer, gclientid: gclientid, gclid: gclid, fbclid: fbclid, ishopi: ishopi }
            }).done(function (result) {
                window.location.href = window.location.origin + "/" + result;
                return false;
            });
            //pageTracker._trackEvent('Form', 'Form Kayıt');
            return true;
        }
        else {
            if ($('#hdnBilgiTalebi').val() == "1") {
                if (surveyAnswer) {
                    $('.button').attr("disabled", "disabled");
                    $('.button span').html("BEKLEYİNİZ");
                    $.ajax({
                        url: '/Services/Ajax.aspx',
                        type: 'post',
                        data: { op: 'SaveForm2', location: location, utmSource: utmSource, utmCampaign: utmCampaign, utmContent: utmContent, name: name, surname: surname, kModel: kModel, kCity: kCity, fullname: fullname, txtNote: txtNote, email: email, model: models, phone: phone, city: city, dealerRRID: dealerRRID, dealer: brand, mediaagreed: $('#checkbox-01').val(), etk: $('#checkbox-01-etk').val(),formtype: formtype, leadid: leadid, surveyAnswer: surveyAnswer, gclientid: gclientid, gclid: gclid, fbclid: fbclid, ishopi: ishopi }
                    }).done(function (result) {
                        //pageTracker._trackEvent('Form', modelName+' Form Success');
                        window.location.href = result;
                    });
                    //pageTracker._trackEvent('Form', 'Form Kayıt');
                    return true;
                }
                else {
                    if (surveyAnswer) {
                        $('.optionalContainer').removeClass('required');
                    } else {
                        $('.optionalContainer').addClass('required');
                    }
                }
            }
            else if ($('.route').val() == "3") {
                if (surveyAnswer) {
                    $('.button').attr("disabled", "disabled");
                    $('.button span').html("BEKLEYİNİZ");
                    $.ajax({
                        url: '/Services/Ajax.aspx',
                        type: 'post',
                        data: { op: 'SaveLCVRoadShowForm', fullname: fullname, txtNote: txtNote, email: email, model: models, phone: phone, city: city, dealer: brand, mediaagreed: $('#checkbox-01').val(), etk: $('#checkbox-01-etk').val(),formtype: formtype, leadid: leadid, surveyAnswer: surveyAnswer, gclientid: gclientid, ishopi: ishopi }
                    }).done(function (result) {
                        //pageTracker._trackEvent('Form', modelName+' Form Success');
                        window.location.href = result;
                    });
                    //pageTracker._trackEvent('Form', 'Form Kayıt');
                    return true;
                }
                else {
                    if (surveyAnswer) {
                        $('.optionalContainer').removeClass('required');
                    } else {
                        $('.optionalContainer').addClass('required');
                    }
                }
            }
            else {
                $('.button').attr("disabled", "disabled");
                $('.button span').html("BEKLEYİNİZ");
                $.ajax({
                    url: '/Services/Ajax.aspx',
                    type: 'post',
                    data: { op: 'SaveForm2', location: location, utmSource: utmSource, utmCampaign: utmCampaign, utmContent: utmContent, name: name, surname: surname, kModel: kModel, kCity: kCity, fullname: fullname, txtNote: txtNote, email: email, model: models, phone: phone, city: city, dealerRRID: dealerRRID, dealer: brand, mediaagreed: $('#checkbox-01').val(), etk: $('#checkbox-01-etk').val(),formtype: formtype, leadid: leadid, surveyAnswer: surveyAnswer, gclientid: gclientid, ishopi: ishopi }
                }).done(function (result) {
                    //pageTracker._trackEvent('Form', modelName+' Form Success');
                    console.log(result);
                    result = result.split('error, ');
                    if (result.length > 1) {
                        alert(result[1]);
                    }
                    else {
                        window.location.href = result;
                    }

                });
                //pageTracker._trackEvent('Form', 'Form Kayıt');
                return true;
            }
        }

    }
}

function YeniRifterOnTalepValidate() {
    var fullname = $('.txtFullName').val();
    var email = $('.txtEmail').val();
    var phone = $('.txtPhone').val();

    var city = $('select.ddlCities').val();
    var dealer = $('select.ddlBrands').val();
    var models = $('select.ddlModels').val();
    var surveyAnswer = $('#hiddenInput').val();
    var checkbox = $('#checkbox-01').is(':checked');

    var formtype = $('.formtype').val();
    var leadid = $('.leadid').val();
    var gclientid = $('.gclientid').val();


    if (validatePhone(phone) && validateEmail(email) && fullname != "" && (($.trim(fullname)).indexOf(' ') != -1) && city != "" && city != 0 && city != "Seçiniz" && dealer != "" && dealer != 0 && dealer != "Bayi Seçiniz" && $('input[name=sample-checkbox-01]').is(':checked') && checkbox) {

        $('input, .chosen-container, select').parent().parent().removeClass('required');
        $('.button').attr("disabled", "disabled");
        $('.button span').html("BEKLEYİNİZ");
        $.ajax({
            url: '/Services/Ajax.aspx',
            type: 'post',
            data: { op: 'SaveYeniRifterForm', fullname: fullname, email: email, model: models, dealer: dealer, city: city, phone: phone, mediaagreed: $('#checkbox-01').val(), etk: $('#checkbox-01-etk').val(),formtype: formtype, leadid: leadid, surveyAnswer: surveyAnswer, gclientid: gclientid }
        }).done(function (result) {
            //pageTracker._trackEvent('Form', modelName+' Form Success');
            window.location.href = result;
        });
        //pageTracker._trackEvent('Form', 'Form Kayıt');
        return true;

    }

}

function validateEmail(email) {
    var emailReg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    var valid = emailReg.test(email);

    if (!valid) {
        return false;
    } else {
        return true;
    }
}

function validatePhone(phone) {
    var phoneReg = /\(?([1-9]{1}[0-9]{2})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
    var valid = phoneReg.test(phone);

    if (!valid) {
        return false;
    } else {
        return true;
    }
}

function setupLabel() {
    if ($('.label_check input').length) {
        $('.label_check').each(function () {
            $(this).removeClass('c_on');
            $(this).children('input').val('0');
        });
        $('.label_check input:checked').each(function () {
            $(this).parent('label').addClass('c_on');
            $(this).val('1');
        });
    };
    if ($('.label_radio input').length) {
        $('.label_radio').each(function () {
            $(this).removeClass('r_on');
        });
        $('.label_radio input:checked').each(function () {
            $(this).parent('label').addClass('r_on');
        });
    };
};

function charFilter(e) {
    var kod = (e.which) ? e.which : e.keyCode;
    if ((kod >= 97 && kod <= 122) || (kod >= 65 && kod <= 90)) { //Harfler
        return true;
    } else if (kod == 231 || kod == 305 || kod == 287 || kod == 246 || kod == 351 || kod == 252 || kod == 199 || kod == 304 || kod == 286 || kod == 214 || kod == 350 || kod == 220) { //Turkce harfler
        return true;
    } else if (kod == 8 || kod == 32 || kod == 13) { //Ozel Tuslar
        return true;
    }
    return false;

}
$('.txtFullName').keypress(function (e) {
    return charFilter(e);
})

var valeCheckbox = $('input[name="vale"]'), valeErrorBox = $('.vale-error-box');

valeErrorBox.on('click', function () {
    $(this).removeClass('active');
});

//valeCheckbox.on('change', function () {
//    if ($('.ddlCities.satis-sonrasi option:selected').val() !== 0) {
//        $('.ddlCities.satis-sonrasi').trigger('change');
//    }
//});

$('.ddlCities.satis-sonrasi').on('change', function (ev) {
    var ths = $(this), city = ths.find('option:selected').val(), ddlBrands = $('select.ddlBrands'), valeStatus = valeCheckbox.is(':checked') ? 1 : 0;
    if (city != 0 || city != "0" || city > 0) {
        $.ajax({
            url: '/Services/Ajax.aspx',
            type: 'POST',
            cache: false,
            dataType: 'JSON',
            data: { op: 'GetDealers', cityId: city, vale: valeStatus },
            success: function (returnData) {
                //console.log('returnData.data.length : ',returnData.data.length);
                if ((returnData.data.length <= 0 || returnData == 'no-data') && valeStatus == 1) {
                    valeErrorBox.addClass('active').find('#valeCity').text(ths.find('option:selected').text());
                    //alert('Seçtiğiniz şehir için vale hizmeti veren bir bayi bulunmamaktadır.\nLütfen başka bir şehir seçiniz.');
                    ddlBrands.empty().html('<option value="0">Lütfen bayi seçiniz</option>');
                    return false;
                }
                ddlBrands.empty().html('<option value="0">Lütfen bayi seçiniz</option>');
                if (city == 34 || city == 35) {
                    for (var i = returnData.data.length - 1; i > 0; i--) {
                        var j = Math.floor(Math.random() * (i + 1));
                        var temp = returnData.data[i];
                        returnData.data[i] = returnData.data[j];
                        returnData.data[j] = temp;
                    }
                }
                for (var i = 0; i < returnData.data.length; i++) {
                    var curr = returnData.data[i];
                    var option = $('<option>', { value: curr.Id, 'data-rrid': curr.rrid, text: curr.dealer + ' (' + curr.town + ')' });
                    ddlBrands.append(option);
                }
                if (returnData.data.length == 1) {
                    ddlBrands.find('option').eq(1).prop('selected', true);
                    ddlBrands.trigger('change');
                }
            }
        });
    } else {
        ddlBrands.empty().html('<option value="0">Lütfen önce sehir seçiniz</option>');
    }
});

$('.ddlCities.professional').on('change', function (ev) {
    var ths = $(this), city = ths.find('option:selected').val(), ddlBrands = $('select.ddlBrands');
    if (city != 0 || city != "0" || city > 0) {
        $.ajax({
            url: '/Services/Ajax.aspx',
            type: 'POST',
            cache: false,
            dataType: 'JSON',
            data: { op: 'GetDealersForProfessional', cityId: city },
            success: function (returnData) {
                //console.log('returnData.data.length : ',returnData.data.length);
                if ((returnData.data.length <= 0 || returnData == 'no-data')) {
                    //alert('Seçtiğiniz şehir için vale hizmeti veren bir bayi bulunmamaktadır.\nLütfen başka bir şehir seçiniz.');
                    ddlBrands.empty().html('<option value="0">Lütfen bayi seçiniz</option>');
                    return false;
                }
                ddlBrands.empty().html('<option value="0">Lütfen bayi seçiniz</option>');
                //if (city == 34 || city == 35) {
                for (var i = returnData.data.length - 1; i > 0; i--) {
                    var j = Math.floor(Math.random() * (i + 1));
                    var temp = returnData.data[i];
                    returnData.data[i] = returnData.data[j];
                    returnData.data[j] = temp;
                }
                //}
                for (var i = 0; i < returnData.data.length; i++) {
                    var curr = returnData.data[i];
                    var option = $('<option>', { value: curr.Id, 'data-rrid': curr.rrid, text: curr.dealer + ' (' + curr.town + ')' });
                    ddlBrands.append(option);
                }
                if (returnData.data.length == 1) {
                    ddlBrands.find('option').eq(1).prop('selected', true);
                    ddlBrands.trigger('change');
                }
            }
        });
    } else {
        ddlBrands.empty().html('<option value="0">Lütfen önce sehir seçiniz</option>');
    }
});

var servicePriceForm = $('form.service-price-form');

servicePriceForm.validate({
    rules: {
        ddlModels: {
            required: true,
            min: 1
        },
        ddlMonths: {
            required: true,
            min: 1
        },
        ddlKm: {
            required: true,
            min: 1
        }
    },
    messages: {
        ddlModels: {
            required: 'Lütfen bir model seçiniz',
            min: 'Lütfen bir model seçiniz'
        },
        ddlMonths: {
            required: 'Lütfen bir ay seçiniz',
            min: 'Lütfen bir ay seçiniz'
        },
        ddlKm: {
            required: 'Lütfen bir kilometre seçiniz',
            min: 'Lütfen bir kilometre seçiniz'
        }
    },
    submitHandler: function (form, ev) {
        var modeltext = $('.ddlModels option:selected').text();
        var model = $('.ddlModels').val();
        var month = $('.ddlMonths').val();
        var km = $('.ddlKm').val();
        var serviceType = "";
        if ($('.servicetype').val() == "0") {
            if ($('.sinceYear option:selected').val() == "2021")
                serviceType = "1";
            else
                serviceType = "2"
        } if ($('.servicetype').val() == "1") {
            if ($('.sinceYear option:selected').val() == "2021")
                serviceType = "3";
            else
                serviceType = "4"
        }
        if (model !== '' && month !== '' && km !== '' && serviceType !== '') {
            $.ajax({
                url: '/Services/Ajax.aspx',
                type: 'post',
                dataType: 'JSON',
                data: { op: 'GetServicePrices', model: model, month: month, km: km, serviceType: serviceType },
                success: function (result) {
                    if (result !== '') {
                        var resultKm = result.data[0].km;
                        var resultTl = result.data[0].price;
                        var resultTlWithKdv = result.data[0].priceWithKdv;
                        $('#pure-price').text(resultTl + ' TL');
                        $('#price-with-kdv').text(resultTlWithKdv + ' TL');
                        if (resultTl.length > 3)
                            $('#pure-price').text([resultTl.slice(0, resultTl.length - 3), '.', resultTl.slice(resultTl.length - 3), ' TL'].join(''));
                        if (resultTlWithKdv.length > 3)
                            $('#price-with-kdv').text([resultTlWithKdv.slice(0, resultTlWithKdv.length - 3), '.', resultTlWithKdv.slice(resultTlWithKdv.length - 3), ' TL'].join(''));
                        $('#price-model').text('PEUGEOT ' + modeltext.toUpperCase());
                        $('#price-month').text(result.data[0].month + ' Ay');
                        $('#price-km').text([resultKm.slice(0, resultKm.length - 3), '.', resultKm.slice(resultKm.length - 3), ' Km'].join(''));
                        $('.services-info').show();
                        var calculationInfo = 'Model: PEUGEOT ' + modeltext.toUpperCase() + "- Ay: " + result.data[0].month + ' Ay' + '- KM: ' + [resultKm.slice(0, resultKm.length - 3), '.', resultKm.slice(resultKm.length - 3), ' Km'].join('') + '- Fiyat: ' + $('#pure-price').text() + '- Kdvli Fiyat: ' + $('#price-with-kdv').text() + '-Form-Type: ' + (serviceType == '0' ? 'Arti-Garanti' : 'Full-Servis');
                        $('.txtNote').val(calculationInfo);
                    } else {
                    }
                }
            });
        } else {
        }
    }
});
var artiGrantiSatisSonrasi = $('form.arti-garanti-satis-sonrasi');

artiGrantiSatisSonrasi.validate({
    rules: {
        txtFullName: {
            regexname: true
        },
        txtSurname: {
            regexlastname: true
        },
        txtPlaka: {
            regexplate: true
        },
        ctl00$ContentPlaceHolder1$ddlCities: {
            required: true,
            min: 1
        },
        ddlNewBrands: {
            required: true,
            min: 1
        }
    },
    messages: {
        ctl00$ContentPlaceHolder1$ddlCities: {
            required: 'Lütfen bir şehir seçiniz',
            min: 'Lütfen bir şehir seçiniz'
        },
        ddlNewBrands: {
            required: 'Lütfen bir bayi seçiniz',
            min: 'Lütfen bir bayi seçiniz'
        }
    },
    errorPlacement: function (error, element) {
        if (element.attr("name") == "sample-checkbox-01") {
            error.appendTo("#legal-div");
        } else {
            error.insertAfter(element);
        }
    },
    submitHandler: function (form, ev) {
        var cForm = $(form);
        ev.preventDefault();
        cForm.addClass('process');
        //form verileri
        var fullname = $('.txtFullName').val(),
            surname = $('.txtSurname').val(),
            txtNote = $('.txtNote').val(),
            email = $('.txtEmail').val(),
            plate = $('.txtPlaka').val(),
            models = $('.ddlModels').find('option:selected').val(),
            phone = $('.txtPhone').val(),
            city = $('.ddlCities').find('option:selected').text(),
            kCity = $('.ddlCities').find('option:selected').val(),
            brand = $('.ddlBrands').find('option:selected').val(),
            formtype = $('.formtype').val(),
            leadid = $('.leadid').val(),
            dealerRRID = $('.ddlBrands').find('option:selected').data('rrid'),
            surveyAnswer = $('[name="surveyAnswer"]:checked').val(),
            surveyAnswer = $('.surveyAnswer:checked').val(),
            gclientid = $('.gclientid').val(),
            gclid = $('.gclid').val(),
            fbclid = $('.fbclid').val(),
            ishopi = $('.ishopi').val(),
            location = $('.location').val(),
            utmSource = $('.utmsource').val(),
            utmCampaign = $('.utmcampaign').val(),
            utmContent = $('.utmcontent').val(),
            utmMedium = $('.utmmedium').val(),
            valet_request = $('#vale').is(':checked'),
            fullUrl = $('.url').val(),
            idpdv = $('.idpdv').val();
        $.ajax({
            url: '/Services/Ajax.aspx',
            type: 'post',
            data: { op: 'SaveSatisSonrasiForm', location: location, utmSource: utmSource, utmCampaign: utmCampaign, utmContent: utmContent, utmMedium: utmMedium, idpdv: idpdv, fullUrl: fullUrl, fullname: fullname, surname: surname, txtNote: txtNote, plate: plate, email: email, model: models, phone: phone, kCity: kCity, city: city, dealerRRID: dealerRRID, dealer: brand, mediaagreed: $('#checkbox-01').val(), etk: $('#checkbox-01-etk').val(),formtype: formtype, leadid: leadid, surveyAnswer: surveyAnswer, gclientid: gclientid, gclid: gclid, fbclid: fbclid, ishopi: ishopi, valet_request: valet_request },
            /*data: cForm.serialize(),*/
            success: function (res) {
                console.log(res);
                var allUrl = $('.url').val();
                responseType('', hashInput($('.txtEmail').val()), hashInput($('.txtPhone').val()), $('.ddlCities').find('option:selected').text(), $('.ddlBrands').find('option:selected').text(), $('.txtPlaka').val(), (allUrl.indexOf('arti-garanti') != -1 ? 'Satış Sonrası - Artı Garanti Form' : 'Satış Sonrası - Full Servis Form'), "Success", '');
                $('.satis-sonrasi-cover').slideUp(150, function () {
                    $('.form-sent-final').slideDown(150);
                });
                cForm.removeClass('process');
            },
            error: function (res) {
                var allUrl = $('.url').val();
                responseType('', hashInput($('.txtEmail').val()), hashInput($('.txtPhone').val()), $('.ddlCities').find('option:selected').text(), $('.ddlBrands').find('option:selected').text(), $('.txtPlaka').val(), (allUrl.indexOf('arti-garanti') != -1 ? 'Satış Sonrası - Artı Garanti Form' : 'Satış Sonrası - Full Servis Form'), "Fail", '');
                cForm.removeClass('process');
                alert('Bir sorunla karşılaşıldı. Lütfen tekrar deneyiniz...');
            }
        })
    }
});
/* satış sonrası form validate */

var satisSonrasiForm = $('form.satis-sonrasi-form');
satisSonrasiForm.validate({
    rules: {
        txtFullName: {
            regexname: true
        },
        txtSurname: {
            regexlastname: true
        },
        txtPlaka: {
            regexplate: true
        },
        ctl00$ContentPlaceHolder1$ddlCities: {
            required: true,
            min: 1
        },
        ddlNewBrands: {
            required: true,
            min: 1
        }
    },
    messages: {
        ctl00$ContentPlaceHolder1$ddlCities: {
            required: 'Lütfen bir şehir seçiniz',
            min: 'Lütfen bir şehir seçiniz'
        },
        ddlNewBrands: {
            required: 'Lütfen bir bayi seçiniz',
            min: 'Lütfen bir bayi seçiniz'
        }
    },
    submitHandler: function (form, ev) {
        var cForm = $(form);
        ev.preventDefault();
        cForm.addClass('process');
        //form verileri
        var fullname = $('.txtFullName').val(),
            surname = $('.txtSurname').val(),
            txtNote = $('.txtNote').val(),
            email = $('.txtEmail').val(),
            plate = $('.txtPlaka').val(),
            models = $('.ddlModels').find('option:selected').val(),
            phone = $('.txtPhone').val(),
            city = $('.ddlCities').find('option:selected').text(),
            kCity = $('.ddlCities').find('option:selected').val(),
            brand = $('.ddlBrands').find('option:selected').val(),
            formtype = $('.formtype').val(),
            leadid = $('.leadid').val(),
            dealerRRID = $('.ddlBrands').find('option:selected').data('rrid'),
            surveyAnswer = $('[name="surveyAnswer"]:checked').val(),
            surveyAnswer = $('.surveyAnswer:checked').val(),
            gclientid = $('.gclientid').val(),
            gclid = $('.gclid').val(),
            fbclid = $('.fbclid').val(),
            ishopi = $('.ishopi').val(),
            location = $('.location').val(),
            utmSource = $('.utmsource').val(),
            utmCampaign = $('.utmcampaign').val(),
            utmContent = $('.utmcontent').val(),
            utmMedium = $('.utmmedium').val(),
            valet_request = $('#vale').is(':checked'),
            fullUrl = $('.url').val(),
            idpdv = $('.idpdv').val();
        $.ajax({
            url: '/Services/Ajax.aspx',
            type: 'post',
            data: { op: 'SaveSatisSonrasiForm', location: location, utmSource: utmSource, utmCampaign: utmCampaign, utmContent: utmContent, utmMedium: utmMedium, idpdv: idpdv, fullUrl: fullUrl, fullname: fullname, surname: surname, txtNote: txtNote, plate: plate, email: email, model: models, phone: phone, kCity: kCity, city: city, dealerRRID: dealerRRID, dealer: brand, mediaagreed: $('#checkbox-01').val(), etk: $('#checkbox-01-etk').val(),formtype: formtype, leadid: leadid, surveyAnswer: surveyAnswer, gclientid: gclientid, gclid: gclid, fbclid: fbclid, ishopi: ishopi, valet_request: valet_request },
            /*data: cForm.serialize(),*/
            success: function (res) {
                console.log(res);
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    'event': 'gaevent',
                    'eventCategory': 'Lead', //
                    'eventAction': "Success", // click
                    'eventLabel': "Satış Sonrası Form",//
                    'eventNonInteraction': true,
                    'model': '',
                    'email': hashInput($('.txtEmail').val()),
                    'tel': hashInput($('.txtPhone').val()),
                    'şehir': $('.ddlCities').find('option:selected').text(),
                    'bayi': $('.ddlBrands').find('option:selected').text(),
                    'araç plakası': $('.txtPlaka').val(),
                    'firma': ''
                });
                $('.satis-sonrasi-cover').slideUp(150, function () {
                    $('.form-sent-final').slideDown(150);
                });
                cForm.removeClass('process');
            },
            error: function (res) {
                cForm.removeClass('process');
                alert('Bir sorunla karşılaşıldı. Lütfen tekrar deneyiniz...');
            }
        })
    }
});

/* bilgi talebi form validate */

/* sasi sorgulama form validate */

var sasiForm = $('form.sasi-sorgulama-form');
sasiForm.validate({
    rules: {
        txtFullName: {
            regexname: true
        },
        txtSurname: {
            regexlastname: true
        },
        txtPlaka: {
            regexplate: true
        }
    },
    submitHandler: function (form, ev) {
        var cForm = $(form);
        ev.preventDefault();
        cForm.addClass('process');
        //form verileri
        var fullname = $('.txtFullName').val(),
            surname = $('.txtSurname').val(),
            email = $('.txtEmail').val(),
            plate = $('.txtPlaka').val(),
            phone = $('.txtPhone').val(),
            formtype = $('.formtype').val(),
            leadid = $('.leadid').val(),
            gclientid = $('.gclientid').val(),
            gclid = $('.gclid').val(),
            fbclid = $('.fbclid').val(),
            location = $('.location').val(),
            utmSource = $('.utmsource').val(),
            utmCampaign = $('.utmcampaign').val(),
            utmContent = $('.utmcontent').val();
        $.ajax({
            url: '/Services/Ajax.aspx',
            type: 'post',
            data: { op: 'SaveChassisForm', utmSource: utmSource, utmCampaign: utmCampaign, utmContent: utmContent, fullname: fullname, surname: surname, plate: plate, email: email, phone: phone, mediaagreed: $('#checkbox-01').val(), etk: $('#checkbox-01-etk').val(),formtype: formtype, leadid: leadid, gclientid: gclientid, gclid: gclid, fbclid: fbclid },
            /*data: cForm.serialize(),*/
            success: function (res) {
                console.log(res);
                responseType('', hashInput($('.txtEmail').val()), hashInput($('.txtPhone').val()), '', '', $('.txtPlaka').val(), "Teknik Kampanya Sorgulama Form", "Success", '');
                //$('.satis-sonrasi-cover').slideUp(150, function () {
                //    $('.form-sent-final').slideDown(150);
                //});
                //cForm.removeClass('process');
                window.location.href = window.location.origin + "/" + res;
            },
            error: function (res) {
                responseType('', hashInput($('.txtEmail').val()), hashInput($('.txtPhone').val()), '', '', $('.txtPlaka').val(), "Teknik Kampanya Sorgulama Form", "Fail", '');
                cForm.removeClass('process');
                alert('Bir sorunla karşılaşıldı. Lütfen tekrar deneyiniz...');
            }
        })
    }
});

/* sasi sorgulama form validate */

/* basin  form validate */

var mediaRequest = $('form.media-request');
mediaRequest.validate({
    rules: {
        txtFullName: {
            regexname: true
        },
        txtSurname: {
            regexlastname: true
        }
    },
    submitHandler: function (form, ev) {
        var cForm = $(form);
        ev.preventDefault();
        cForm.addClass('process');
        //form verileri
        var firstname = $('.txtFullName').val(),
            lastname = $('.txtSurname').val(),
            email = $('.txtEmail').val(),
            platform = $('.txtPlatform').val(),
            phone = $('.txtPhone').val(),
            formtype = $('.formtype').val(),
            message = $('#message').val(),
            leadid = $('.leadid').val(),
            gclientid = $('.gclientid').val(),
            utmSource = $('.utmsource').val(),
            utmCampaign = $('.utmcampaign').val(),
            utmContent = $('.utmcontent').val();
        $.ajax({
            url: '/Services/Ajax.aspx',
            type: 'post',
            data: { op: 'SaveMediaRequest', utmSource: utmSource, utmCampaign: utmCampaign, utmContent: utmContent, firstname: firstname, lastname: lastname, message: message, platform: platform, email: email, phone: phone, mediaagreed: $('#checkbox-01').val(), etk: $('#checkbox-01-etk').val(),formtype: formtype, leadid: leadid, gclientid: gclientid },
            /*data: cForm.serialize(),*/
            success: function (res) {
                console.log(res);
                $('.satis-sonrasi-cover').slideUp(150, function () {
                    $('.form-sent-final').slideDown(150);
                });
                cForm.removeClass('process');
            },
            error: function (res) {
                cForm.removeClass('process');
                alert('Bir sorunla karşılaşıldı. Lütfen tekrar deneyiniz...');
            }
        })
    }
});

/* basin form validate */

$(function () {
    $('form.bilgi-talebi-form .ddlModels').on('change', function () {
        $('.form-sent-final').not('[style*="display:none"]').slideUp(150, function () {
            $('.bilgi-talebi-cover').slideDown(150);
        });
    });

    $('select.ddlBrands').on('change', function () {
        var selectedBrand = $(this).children("option:selected");
        var dealer = selectedBrand.val();
        $('#vale').attr("checked", false);
        if (selectedBrand.val() != '0') {
            var selectedBrandNumber = selectedBrand.data("phone");
            $('.btn_bayicall').show().attr("href", "tel:" + selectedBrandNumber + "");
            $.ajax({
                url: '/Services/Ajax.aspx',
                type: 'POST',
                cache: false,
                dataType: 'JSON',
                data: { op: 'GetDealersValetService', dealerId: dealer },
                success: function (returnData) {
                    if (returnData == "1") {
                        $('.vale-cbox').show();
                    }
                    else {
                        $('.vale-cbox').hide();
                    }
                }
            });
        } else {
            $('.btn_bayicall').hide();
        }
    });
    /* dosya sec */
    fileBrowseIconic(kivaWebToSupport_webform_form.find('input[type="file"]'));
    /* sumo select *//*
    $('select').not('.no').each(function (i, e) {
        var ths = $(e), placeholder = ths.data('custom'), issearch = ths.data('search'), issearchtxt = 'Type here';
        if (placeholder === undefined) { placeholder = 'Select' }
        if (issearch !== undefined) { issearchtxt = issearch; issearch = true; } else { issearch = false }
        //ths.SumoSelect({placeholder:placeholder,search:issearch,searchText:issearchtxt,noMatch : '"{0}" için kayıt bulunamadı',});
    });
    */
});

var bilgiTalebiForm = $('form.bilgi-talebi-form');
bilgiTalebiForm.validate({
    /*rules: {
        ctl00$ContentPlaceHolder1$ddlCities: {
          required:true,
          min: 1
        },
        ddlNewBrands: {
            required:true,
            min: 1
          }
      },
      messages: {
        ctl00$ContentPlaceHolder1$ddlCities: {
            required: 'Lütfen bir şehir seçiniz',
            min: 'Lütfen bir şehir seçiniz'
        },
        ddlNewBrands: {
            required: 'Lütfen bir bayi seçiniz',
            min: 'Lütfen bir bayi seçiniz'
        }
      },*/
    submitHandler: function (form, ev) {
        var cForm = $(form);
        ev.preventDefault();
        cForm.addClass('process');
        //form verileri
        var name = $('.txtFullName').val(),
            surname = $('.txtSurname').val(),
            txtNote = $('.txtNote').val(),
            email = $('.txtEmail').val(),
            models = $('.ddlModels').find('option:selected').val(),
            phone = $('.txtPhone').val(),
            city = $('.ddlCities').find('option:selected').text(),
            kCity = $('.ddlCities').find('option:selected').val(),
            dealer = $('.ddlBrands').find('option:selected').val(),
            dealerRRID = $('.ddlBrands').find('option:selected').data('rrid'),
            formtype = $('.formtype').val(),
            formtypeid = $('.formtypeid').val(),
            leadid = $('.leadid').val(),
            surveyAnswer = $('[name="surveyAnswer"]:checked').val(),
            surveyAnswer = $('.surveyAnswer:checked').val(),
            lRequest = $('[name="surveyAnswer"]:checked').data('kiva-id'),
            lRequest = $('.surveyAnswer:checked').data('kiva-id'),
            gclientid = $('.gclientid').val(),
            gclid = $('.gclid').val(),
            fbclid = $('.fbclid').val(),
            kModel = $('.ddlModels').find('option:selected').data('kiva-id'),
            ishopi = $('.ishopi').val(),
            location = $('.location').val(),
            utmSource = $('.utmsource').val(),
            utmCampaign = $('.utmcampaign').val(),
            utmContent = $('.utmcontent').val(),
            utmMedium = $('.utmmedium').val(),
            fullUrl = $('.url').val(),
            idpdv = $('.idpdv').val();
        $.ajax({
            url: '/Services/Ajax.aspx',
            type: 'post',
            data: { op: 'SaveBilgiTalebi', location: location, utmSource: utmSource, utmCampaign: utmCampaign, utmContent: utmContent, utmMedium: utmMedium, fullUrl: fullUrl, name: name, surname: surname, txtNote: txtNote, email: email, model: models, lRequest: lRequest, kModel: kModel, phone: phone, city: city, kCity: kCity, dealerRRID: dealerRRID, dealer: dealer, mediaagreed: $('#checkbox-01').val(), etk: $('#checkbox-01-etk').val(),formtype: formtype, formtypeid: formtypeid, leadid: leadid, surveyAnswer: surveyAnswer, gclientid: gclientid, gclid: gclid, fbclid: fbclid, ishopi: ishopi, idpdv: idpdv },
            /*data: cForm.serialize(),*/
            success: function (res) {
                //console.log(res);
                /*
                $('.bilgi-talebi-cover').slideUp(150,function(){
                    $('.form-sent-final').slideDown(150);
                });
                */
                cForm.removeClass('process');
                window.location.href = res;
            },
            error: function (res) {
                cForm.removeClass('process');
                alert('Bir sorunla karşılaşıldı. Lütfen tekrar deneyiniz...');
            }
        });
    }
});

/* ticari bilgi talebi valid */

var ticariBilgiTalebiForm = $('form.ticari-bilgi-talebi');

ticariBilgiTalebiForm.validate({
    rules: {
        txtFullName: {
            needspace: true
        }
    },
    submitHandler: function (form, ev) {
        var cForm = $(form);
        ev.preventDefault();
        cForm.addClass('process');
        var fullName = $('.txtFullName').val();
        //form verileri
        var name = fullName.split(' ').slice(0, -1).join(' '),
            surname = fullName.split(' ').slice(-1).join(' '),
            txtNote = null,
            email = $('.txtEmail').val(),
            models = $('.ddlModels').find('option:selected').val(),
            phone = $('.txtPhone').val(),
            city = $('.ddlCities').find('option:selected').text(),
            kCity = $('.ddlCities').find('option:selected').val(),
            dealer = $('.ddlBrands').find('option:selected').val(),
            dealerRRID = $('.ddlBrands').find('option:selected').data('rrid'),
            formtype = $('.formtype').val(),
            formtypeid = $('.formtypeid').val(),
            leadid = $('.leadid').val(),
            surveyAnswer = $('[name="radio"]:checked').val(),
            surveyAnswer = $('.radio:checked').val(),
            lRequest = $('[name="radio"]:checked').data('kiva-id'),
            lRequest = $('.radio:checked').data('kiva-id'),
            gclientid = $('.gclientid').val(),
            gclid = $('.gclid').val(),
            fbclid = $('.fbclid').val(),
            kModel = $('.ddlModels').find('option:selected').data('kiva-id'),
            ishopi = null,
            location = $('.location').val(),
            utmSource = $('.utmsource').val(),
            utmCampaign = $('.utmcampaign').val(),
            utmContent = $('.utmcontent').val(),
            utmMedium = $('.utmmedium').val(),
            fullUrl = $('.url').val(),
            idpdv = $('.idpdv').val();
        //form verileri
        $.ajax({
            url: '/Services/Ajax.aspx',
            type: 'post',
            data: { op: 'SaveProfessionalForm', location: location, utmSource: utmSource, utmCampaign: utmCampaign, utmContent: utmContent, utmMedium: utmMedium, fullUrl: fullUrl, idpdv: idpdv, name: name, surname: surname, txtNote: txtNote, email: email, model: models, lRequest: lRequest, kModel: kModel, phone: phone, city: city, kCity: kCity, dealerRRID: dealerRRID, dealer: dealer, mediaagreed: $('#checkbox-01').val(), etk: $('#checkbox-01-etk').val(), formtype: formtype, formtypeid: formtypeid, leadid: leadid, surveyAnswer: surveyAnswer, gclientid: gclientid, gclid: gclid, fbclid: fbclid, ishopi: ishopi },
            success: function (res) {
                cForm.removeClass('process');
                window.location.href = res;
            },
            error: function (res) {
                cForm.removeClass('process');
                alert('Bir sorunla karşılaşıldı. Lütfen tekrar deneyiniz...');
            }
        });
    }
});

var filoBilgiTalebiForm = $('form.filo-talep-form'),
    filoTalepFormCover = $('.filo-talep-form');



$(function () {
    /* add custom validation */
    $.validator.addMethod("regexname", function (value, element) {
        return /^[a-zA-Z\sŞşĞğÜüÖöÇçİı]*$/.test(value);
    }, 'Lütfen sadece harf ve boşluk kullanınız');
    $.validator.addMethod("regexlastname", function (value, element) {
        return /^[a-zA-ZŞşĞğÜüÖöÇçİı]*$/.test(value);
    }, 'Lütfen sadece harf kullanınız');

    filoBilgiTalebiForm.validate({
        rules: {
            firstname: {
                regexname: true
            },
            lastname: {
                regexlastname: true
            },
        },
        submitHandler: function (form, ev) {
            ev.preventDefault();
            filoTalepFormCover.addClass('process');
            //form verileri
            var name = $('#firstname').val(),
                surname = $('#lastname').val(),
                txtNote = $('#companyname').val(), //txtNote form id = 7 olan formlarda companyname olarak kullanılacak
                email = $('#email').val(),
                models = $('.ddlModels').find('option:selected').val(),
                phone = $('#mobile').val(),
                city = "",
                kCity = "0",
                dealer = "0",
                dealerRRID = "0",
                formtype = $('.formtype').val(),
                formtypeid = $('.formtypeid').val(),
                leadid = $('.leadid').val(),
                surveyAnswer = "0",
                surveyAnswer = "0",
                lRequest = "0",
                lRequest = "0",
                gclientid = $('.gclientid').val(),
                gclid = $('.gclid').val(),
                fbclid = $('.fbclid').val(),
                kModel = $('.ddlModels').find('option:selected').data('kiva-id'),
                ishopi = null,
                location = $('.location').val(),
                utmSource = $('.utmsource').val(),
                utmCampaign = $('.utmcampaign').val(),
                utmContent = $('.utmcontent').val(),
                utmMedium = $('.utmmedium').val(),
                mediaagreed = $('#mediaagreed').val(),
                etk= $('#checkbox-01-etk').val(),
                fullUrl = $('.url').val();
            //form verileri
            setTimeout(function () {
                $.ajax({
                    url: '/Services/Ajax.aspx',
                    type: 'post',
                    data: { op: 'SaveFiloTalebiForm', location: location, utmSource: utmSource, utmCampaign: utmCampaign, utmContent: utmContent, utmMedium: utmMedium, fullUrl: fullUrl, name: name, surname: surname, txtNote: txtNote, email: email, model: models, lRequest: lRequest, kModel: kModel, phone: phone, city: city, kCity: kCity, dealerRRID: dealerRRID, dealer: dealer, mediaagreed: mediaagreed, etk:etk, formtype: formtype, formtypeid: formtypeid, leadid: leadid, surveyAnswer: surveyAnswer, gclientid: gclientid, gclid: gclid, fbclid: fbclid, ishopi: ishopi },
                    success: function (res) {
                        responseType($('.ddlModels').find('option:selected').text(), hashInput($('#email').val()), hashInput($('#mobile').val()), '', '', '', "Filo Talep Form", "Success", '');
                        filoTalepFormCover.removeClass('process');
                        filoTalepFormCover.find('.kiva-first').slideUp(300);
                        filoTalepFormCover.find('.kiva-success').slideDown(300, function () {
                            sipa.go(filoTalepFormCover);
                        });
                        window.location.href = res;
                    },
                    error: function (res) {
                        responseType($('.ddlModels').find('option:selected').text(), hashInput($('#email').val()), hashInput($('#mobile').val()), '', '', '', "Filo Talep Form", "Fail", '');
                        filoTalepFormCover.removeClass('process');
                        alert('Bir sorunla karşılaşıldı. Lütfen tekrar deneyiniz...');
                    }
                });
            }, 3000);
        }
    });
});


/* kivaWebToSupport_webform_form */

var kivaWebToSupport_webform_form = $('#kivaWebToSupport_webform_form'),
    kivaWebToSupportCover = $('#kivaWebToSupport_webform');

$(function () {
    /* add custom validation */
    $.validator.addMethod("regexname", function (value, element) {
        return /^[a-zA-Z\sŞşĞğÜüÖöÇçİı]*$/.test(value);
    }, 'Lütfen sadece harf ve boşluk kullanınız');
    $.validator.addMethod("needspace", function (value, element) {
        if (value.indexOf(' ') < 0) { return false; }
        return true;
    }, 'Lütfen ad ve soyad arasında boşluk kullanınız');
    $.validator.addMethod("regexlastname", function (value, element) {
        return /^[a-zA-ZŞşĞğÜüÖöÇçİı]*$/.test(value);
    }, 'Lütfen sadece harf kullanınız');
    $.validator.addMethod("regexplate", function (value, element) {
        if (value.length > 0) {
            return /^(0[1-9]|[1-7][0-9]|8[01])(([A-Za-z])(\d{4})|([A-Za-z]{2})(\d{3,4})|([A-Za-z]{3})(\d{2,3}))$/.test(value);
        }
        return true;
    }, 'Lütfen geçerli bir plaka giriniz');
    /* form submit */
    kivaWebToSupport_webform_form.validate({
        rules: {
            firstname: {
                regexname: true
            },
            lastname: {
                regexlastname: true
            },
            plate: {
                regexplate: true
            }
        },
        submitHandler: function (form, ev) {
            var cForm = $(form);
            kivaWebToSupportCover.addClass('process');
            setTimeout(function () {
                $.ajax({
                    url: '/Services/Ajax.aspx',
                    type: 'post',
                    data: cForm.serialize(),
                    success: function (res) {
                        var result = JSON.parse(res);
                        if (result.Code == 200) {
                            responseType('', hashInput($('#email').val()), hashInput($('#mobile').val()), '', '', $('#plate').val(), 'Geri Bildirim Form', "Success", '');
                            kivaWebToSupportCover.removeClass('process');
                            kivaWebToSupportCover.find('.kiva-first').slideUp(300);
                            kivaWebToSupportCover.find('.kiva-success').slideDown(300, function () {
                                sipa.go(kivaWebToSupportCover);
                            });
                        } else {
                            responseType('', hashInput($('#email').val()), hashInput($('#mobile').val()), '', '', $('#plate').val(), 'Geri Bildirim Form', "Success", '');
                            kivaWebToSupportCover.removeClass('process');
                            alert('Bir sorunla karşılaşıldı. Lütfen tekrar deneyiniz...');
                        }
                        console.log(res);
                    },
                    error: function (res) {
                        responseType('', hashInput($('#email').val()), hashInput($('#mobile').val()), '', '', $('#plate').val(), 'Geri Bildirim Form', "Success", '');
                        kivaWebToSupportCover.removeClass('process');
                        alert('Bir sorunla karşılaşıldı. Lütfen tekrar deneyiniz...');
                    }
                });
            }, 3000);
            console.log('kivaWebToSupport_webform_form is valid!');
        }
    });
});

/* contact form 14.01.2021 */

var sipa = {
    go: function (where, diff) {
        var addiff = 0;
        if (typeof diff !== 'undefined') { addiff = diff; }
        var fromTop = parseFloat(where.offset().top - addiff);
        if (fromTop < 0) { fromTop = 0; }
        $('html, body').stop().animate({ scrollTop: fromTop + 'px' }, 500);
    },
    chcknotexist: function (el) {
        return el == undefined || el === undefined;
    },
    chckexist: function (el) {
        return el != undefined || el !== undefined;
    },
    stickyInputLabel: function (item) {
        if (item == undefined || item === undefined || item == 'undefined') {
            console.log('Please, set placeholder item');
            return false;
        }
        item.each(function (i, e) {
            var ths = $(e),
                inputId = ths.attr("id"),
                tagText = ths.attr("placeholder"),
                label = $("<label>", { class: "tag-anime", text: "", for: inputId }),
                isDate = ths.attr('type') == 'date';
            if (tagText !== undefined || tagText.length > 0) {
                label.text(tagText);
                ths.before(label).parent().addClass("taged");
                if (isDate) label.addClass('stay');
                if (ths.val().length > 0) { //eger doluysa
                    label.addClass("focused");
                }
                ths.on("focus.tagy", function () {
                    label.addClass("focused");
                    if (!ths.hasClass("not-place")) {
                        ths.attr("placeholder", "");
                    } else {
                        ths.attr("autocomplete", "on");
                    }
                }).on("focusout.tagy", function () {
                    var inputLen = ths.val().length;
                    if (inputLen <= 0) {
                        label.removeClass("focused");
                    }
                    if (!ths.hasClass("not-place")) {
                        ths.attr("placeholder", tagText);
                    }
                });
            }
        });
    }
}

/* privacy script */

var privacyBox2021 = $('.privacy-box-2021'), privacyBox2021Close = $('a.privacy-box-2021-close');

$(function () {
    if ($(window).width() <= 1024) $('div.body').before(privacyBox2021);
    if ($.cookie('privacy-2021') != 1) {
        privacyBox2021.slideDown(300);
    }
    privacyBox2021Close.on('click', function () {
        privacyBox2021.slideUp(300);
        $.cookie('privacy-2021', '1', { expires: 365 });
    });
    /* stickylabel */
    kivaWebToSupport_webform_form.find('[placeholder]').each(function (i, e) {
        var ths = $(e);
        sipa.stickyInputLabel(ths);
    });
});

/* */

/* browse preview */
var fileInput = $('input[type="file"]');

function fileBrowseIconic(item) {
    "use strict";
    if (item == undefined || item === undefined || item == 'undefined') {
        item = fileInput;
    }
    item.each(function (i, e) {
        var bu = $(e), formu = bu.parents('form').first(),
            gorunenMetin = bu.data("text");
        if (gorunenMetin == undefined) {
            gorunenMetin = "Dosya Seç";
        }
        var isimler = [],
            boyutlar = [],
            simgemi = bu.data("icon") != undefined,
            ilgiliInputAlani = bu.prev(".ishave"),
            isimlistesi = $("<div>", { html: "", class: "selected-files dn" }),
            yeriniAlanButon = $("<input>", {
                type: "button",
                class: "input-file",
                value: gorunenMetin
            }),
            dosyaSecKaldir = $("<a>", {
                class: "file-remove",
                href: "javascript:;",
                html: "x"
            });
        if (bu.data("oldu") != "1") {
            bu.data("oldu", "1"); //ikinci kez gelmesin de mi
            bu.hide().before(isimlistesi);
            isimlistesi.append(dosyaSecKaldir);
            if (simgemi) {
                yeriniAlanButon = $("<a>", {
                    href: "javascript:;",
                    class: "buton fileinput-icon",
                    html: gorunenMetin
                });
                bu.wrap('<span class="files-browse"></span>').after(yeriniAlanButon);
                bu.parent().appendTo(ilgiliInputAlani);
            } else {
                bu.wrap('<div class="files-browse"></div>').after(yeriniAlanButon);
            }
            yeriniAlanButon.off("click.yerini").on("click.yerini", function () {
                bu.trigger("click");
            });
            bu.off("change.denis").on("change.denis", () => {
                (isimler = []), (boyutlar = []);
                isimlistesi.find("span").remove();
                for (var i = 0; i < $(this).get(0).files.length; ++i) {
                    isimler.push($(this).get(0).files[i].name);
                    boyutlar.push($(this).get(0).files[i].size);
                    var dosyaBoyut = (boyutlar[i] / 1000000).toFixed(2),
                        bilmsg = '';
                    if (dosyaBoyut <= 0.1) {
                        dosyaBoyut = "< 0.1";
                    }
                    if (dosyaBoyut > 25) {
                        alert('Dosya boyutu 25 MBı geçmemelidir.');
                    }
                    $("<span>", {
                        html: isimler[i] + ", (" + dosyaBoyut + " MB)",
                        class: "names"
                    }).prependTo(isimlistesi);
                    isimlistesi.slideDown(150, function () {
                        isimlistesi.css("display", "inline-block");
                    });
                }
                bu.parent().addClass("fill");
                if (bu.val() == "") {
                    isimlistesi.hide();
                    bu.parent().removeClass("fill");
                    bu.parent()
                        .siblings(".preview-img")
                        .attr("src", "");
                }
            });
            dosyaSecKaldir.off("click.yerini").on("click.yerini", function () {
                isimlistesi.slideUp(300, function () {
                    dosyaSecKaldir.siblings("span").remove();
                    bu.val("").trigger("change.denis");
                    yeriniAlanButon.text(gorunenMetin).val(gorunenMetin);
                    bu.parent()
                        .siblings(".preview-img")
                        .attr("src", "");
                });
            });
            bu.on("dragover", function () {
                yeriniAlanButon.text("Buraya bırakın...").val("Buraya bırakın...");
            }).on("dragleave", function () {
                yeriniAlanButon.text(gorunenMetin).val(gorunenMetin);
            });
            formu.on('reset', function () {
                bu.val('').trigger("change.denis");
            });
        } else {
            //	console.log('zaten yapıldı')
        }
    });
}

var inputImgPreview = fileInput.filter('[data-preview="true"]');
inputImgPreview.each(function (i, e) {
    var ths = $(e),
        previewImg = $("<img>", {
            src: "",
            class: "preview-img",
            id: "preview-img-" + i
        });
    ths.after(previewImg);
    ths.on("change.preview", function () {
        imgInputChange(ths, previewImg);
    });
});

function imgInputChange(input, image) {
    if (input[0].files && input[0].files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            image.show().attr("src", e.target.result);
        };
        reader.readAsDataURL(input[0].files[0]);
    } else {
        image.attr("src", "").hide();
    }
}
/* cookie */

/*!
 * jQuery Cookie Plugin v1.4.1 */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD (Register as an anonymous module)
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    var pluses = /\+/g;

    function encode(s) {
        return config.raw ? s : encodeURIComponent(s);
    }

    function decode(s) {
        return config.raw ? s : decodeURIComponent(s);
    }

    function stringifyCookieValue(value) {
        return encode(config.json ? JSON.stringify(value) : String(value));
    }

    function parseCookieValue(s) {
        if (s.indexOf('"') === 0) {
            // This is a quoted cookie as according to RFC2068, unescape...
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }

        try {
            // Replace server-side written pluses with spaces.
            // If we can't decode the cookie, ignore it, it's unusable.
            // If we can't parse the cookie, ignore it, it's unusable.
            s = decodeURIComponent(s.replace(pluses, ' '));
            return config.json ? JSON.parse(s) : s;
        } catch (e) { }
    }

    function read(s, converter) {
        var value = config.raw ? s : parseCookieValue(s);
        return $.isFunction(converter) ? converter(value) : value;
    }

    var config = $.cookie = function (key, value, options) {

        // Write

        if (arguments.length > 1 && !$.isFunction(value)) {
            options = $.extend({}, config.defaults, options);

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setMilliseconds(t.getMilliseconds() + days * 864e+5);
            }

            return (document.cookie = [
                encode(key), '=', stringifyCookieValue(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path ? '; path=' + options.path : '',
                options.domain ? '; domain=' + options.domain : '',
                options.secure ? '; secure' : ''
            ].join(''));
        }

        // Read

        var result = key ? undefined : {},
            // To prevent the for loop in the first place assign an empty array
            // in case there are no cookies at all. Also prevents odd result when
            // calling $.cookie().
            cookies = document.cookie ? document.cookie.split('; ') : [],
            i = 0,
            l = cookies.length;

        for (; i < l; i++) {
            var parts = cookies[i].split('='),
                name = decode(parts.shift()),
                cookie = parts.join('=');

            if (key === name) {
                // If second argument (value) is a function it's a converter...
                result = read(cookie, value);
                break;
            }

            // Prevent storing a cookie that we couldn't decode.
            if (!key && (cookie = read(cookie)) !== undefined) {
                result[name] = cookie;
            }
        }

        return result;
    };

    config.defaults = {};

    $.removeCookie = function (key, options) {
        // Must not alter options, thus extending a fresh object...
        $.cookie(key, '', $.extend({}, options, { expires: -1 }));
        return !$.cookie(key);
    };

}));