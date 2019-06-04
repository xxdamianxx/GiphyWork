var topics = ["John Wick", "Climate Control", "Slavery", "Game of Thrones"];
const API_KEY = "0J1P9B7ZX42CZt3DsBTU1qHlcYBFWx4j";

$(document).ready(function(){ 
    loadPage();
    $('#submit').click(function () {
        topics.push($('#topic_value').val());
        loadPage();    
    });    
});

function loadPage(){
    $('#buttons').empty();
    $('#giphys').empty();
    for(let i = 0; i < topics.length; i++){
        $('#buttons').append('<button class="button" id=' + i + '>' + topics[i] + '</button>');
        $( "#"+ i).click(function() {
            loadGiphys(topics[i]);
          });
    }
}

function loadGiphys(topic){
    $('#giphys').empty();
    var xhr = $.get("https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=" + API_KEY + "&limit=10");
    xhr.done(function(data) {
        let results = data["data"];
        console.log(JSON.stringify(results, null, 4));
        for(let j = 0; j < results.length; j++){
            $('#giphys').append("<div class=img_" + j + "><img src='" + results[j]["images"]["original_still"]["url"] + "' class='" + j + "'alt='' data-state='static' src_static=' " + results[j]["images"]["original_still"]["url"] + "' src_non_static='" + results[j]["images"]["downsized"]["url"] + "'></div>");
            $(".img_"+j).append("<p>Rated: "+ results[j]["rating"] + "<span>. This data is provided by the GIPHY API</span>");

            $("."+j).click(function () {
                if ($(this).attr("data-state") == "static") {
                    $(this).attr("data-state", "non-static");
                    $(this).attr("src", $(this).attr("src_non_static"));
                } else {
                    $(this).attr("data-state", "static");
                    $(this).attr("src", $(this).attr("src_static"));
                }
              });
        }
        
    }); 
}