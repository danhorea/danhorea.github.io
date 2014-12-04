//header css:
var cssLink = $("<link rel='stylesheet' type='text/css' href='html/header/header.css'>");
$("head").append(cssLink);
//header html
$("#top").load("html/header/header.html");
//precontent html
$("#precontent").load("html/precontent/precontent.html");

//content appending by scroll
var content1IsNotLoaded = true;
var content2IsNotLoaded = true;
$(window).scroll(function() {

//	console.log(
	//		"window scroll: "+	$(window).scrollTop() + "\n" +
//			"document height: "+	$(document).height() + "\n" +
//			"window height: "+	$(window).height() + "\n"  +
	//		"content1 height: "+	$("#content").height() + "\n"
	//	);
	if(content1IsNotLoaded && ($(window).scrollTop() == $(document).height() - $(window).height()) ) {
           // ajax call get data from server and append to the div
    	$("#content").hide().load("html/content/content1.html").fadeIn(2000);
        content1IsNotLoaded = false;
    }
	
	if($(document).height() > 1200){
		if(content2IsNotLoaded && ($(window).scrollTop() == $(document).height() - $(window).height())) {
	           // ajax call get data from server and append to the div
	    	$("#content2").hide().load("html/content/content1.html").fadeIn(2000);
            content2IsNotLoaded = false;
          //  console.log("Salut din PHP STORM");
	    }
	}

});
