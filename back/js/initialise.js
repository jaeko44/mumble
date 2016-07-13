
function setLoading(state) {
    var $loadScreen = $("#loading");
    if (state)
    {
        $loadScreen.show();
    } else
        $loadScreen.hide();
}

function loadPage($url, $data) {
    setLoading(true);
    $.get($url, $data, function (data) {
        setLoading(false);
        $("#content").html(data);
    }, "html");
}
function loadData($url, $data) {
    setLoading(true);
    $.get($url, $data, function (data) {
        setLoading(false);
        return data;
    }, "json");
}
loadPage("front/partial/chat.php", {});