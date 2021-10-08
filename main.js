let api = "e870696ef3ff444a98ce6a7e0e7b7d6d";
let clicked = true;
let visible = false;
let city = localStorage.getItem("city");
let div = localStorage.getItem("div");

ajax(city);
$("#weather-city").val(city);

$("#weather-city").on("change", function() {
    localStorage.setItem("city", $("#weather-city").val());
    localStorage.setItem("div", $('#weather-city'));
    ajax($("#weather-city").val());
});

$(".list").on("click",".task", function() {
    if(clicked) {
        $(this).css("font-style", "italic");
        $(this).css("text-decoration", "line-through");
        clicked = false;
    } else {
        $(this).css({'font-style' : '', 'text-decoration' : ''});
        clicked = true;
    }
});

$("#task-input").on("keydown", function(event){
    let x = "<li class='element'><input class='check' type='checkbox'><span class='task'>" + $("#task-input").val() + "</span></li>";
    if(event.code == 'Enter') {
        event.preventDefault();
        $(".list").append(x);
    }
});

$(".list").on("click",".check", function(){
    $(this).closest("li").slideToggle(1000, function(){
        $(this).closest("li").remove();
    });
});

$(".fas").on("click", function(){
    if(visible) {
        $("#textInput").fadeOut(500);
        $("#textInput").css("visibility", "hidden");
        visible = false;
    } else {
        $("#textInput").fadeIn(500);
        $("#textInput").css("visibility", "visible");
        visible = true;
    }
});

function ajax(cityName) {
    $.ajax({
        method: "GET",
        url: "https://api.weatherbit.io/v2.0/current?",
        data: {
            units: "I",
            key: api,
            city: "&city=" + cityName
        }
    })
    
    .done(function(results){
        JSON.stringify(results);
        let data = results.data[0];
        $("#metrics").text(data.temp + "F ; Feels like " + data.app_temp + "F; " + data.weather.description);
    })
    
    .fail(function() {
        console.log("Error!");
    });
}