$(document).ready(function() {
  console.log('JS connected');

 // ADD ITEMS TO MY LIST
 $('form').on('submit', function() {
   console.log('you are submitting');

   let item = $('form input');
   let todo = {item: item.val()};

   $.ajax({
     type: 'POST',
     url:  '/todo',
     data: todo,
     success: function(data) {
       // some code to do somthing with the response
       location.reload();
     }
   });
  });

 // DELETING ITEMS FROM LIST
  $('li').on('click', function() {
    // console.log('you have are inside click event');
    let item = $(this).attr('id');
    console.log(item);
    $.ajax({
      type: 'DELETE',
      url:  '/todo/' + item,
      success: function(data) {
        // some code to do somthing with the response
        location.reload();
      }
    });
  });

  $('#editItem').on('click', function() {
    // console.log('you have are inside click event');

    console.log('we are editing');
    // $.ajax({
    //   type: 'DELETE',
    //   url:  '/todo/' + item,
    //   success: function(data) {
    //     // some code to do somthing with the response
    //     location.reload();
    //   }
    // });
  });

});
