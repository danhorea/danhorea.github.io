//header css:
var cssLink = $("<link rel='stylesheet' type='text/css' href='html/header/header.css'>");
$("head").append(cssLink);
//Slideshow loader
$("#slider").load("html/slideShow/slideShow.html");
//header html
$("#top").load("html/header/header.html");
//precontent html
$("#precontent").load("html/precontent/precontent.html");
//login form loader
$("#loginForm").load("html/login/loginForm.html");

//content appending by scroll
var content1IsNotLoaded = true;
var content2IsNotLoaded = true;
var contactIsNotLoaded = true;
var footerIsNotLoaded = true;
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
            $("#content2").hide().load("html/content2/content2.html").fadeIn(2000);
            content2IsNotLoaded = false;
            //  console.log("Salut din PHP STORM");
        }
    }
    if($(document).height() > 2000){
        if(contactIsNotLoaded && ($(window).scrollTop() == $(document).height() - $(window).height())) {
            // ajax call get data from server and append to the div
            $("#contact").load("html/contact/contact.html");
            contactIsNotLoaded = false;
            //  console.log("Salut din PHP STORM");
        }
    }



    if($(document).height() > 2700){
        if(footerIsNotLoaded && ($(window).scrollTop() == $(document).height() - $(window).height())) {
            // ajax call get data from server and append to the div
            $("#footer").hide().load("html/footer/footer.html").fadeIn(1000);
            footerIsNotLoaded = false;
            //  console.log("Salut din PHP STORM");
        }
    }
});