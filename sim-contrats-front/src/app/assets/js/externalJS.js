function getHeader() {
    $.ajax({ url: 'https://www.peugeot.com.tr/index.c1_header.html', success: function (data) { console.log('Header'); console.log(data); } });
}
function getFooter() {
    $.ajax({ url: 'https://www.peugeot.com.tr/index.c1_footer.html', success: function (data) { console.log('Footer'); console.log(data); } });
}
$(document).on('ready', function () {
    getHeader();
    getFooter();
});