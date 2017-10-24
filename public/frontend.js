$(function(){

// POST request

$('.submit').click(function(){
  console.log( $('.printIdea').val() )// get the value of DIV tag, printIdea
  var text = $('.printIdea').val() // make the text into a variable to better work with

  if(text){
    //if there is text, append the new data to the json file
    $.post('http://localhost:3000', {"postedText":text})
    .done(function(data){
      console.log(data);
      // $('.enterText').html("thank u come again"); // change the textarea
      // $('.printIdea').html("thanks")
      // "window.location.reload()"
    })

  }

  else{
    // if its empty - don't send it
    console.error('no text')
  }

})
// end of POST request


// GET request
  $('.fetch').click(function(e){
  // console.log("clicked fetch")
  // javascript can handle multiple request simultaneously
  //using jQuery to make a Get Request
    $.get("http://localhost:3000/fetch")
    .done(function(data){ // once the request is complete, run the following code

    console.log(data) // print to console

    $('.fetchedData').html(data) // prints it to the DIV tag, "fetchedData"
    $('.enterText').html(data) // prints it to the text area?
    // $('.enterText').typeIt({
    //   strings: 'This is a simple string.',
    //  speed: 50,
    // })



    })
  })
})
