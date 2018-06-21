//display upload image
function readURL(input) {
  if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
          $('#blah')
              .attr('src', e.target.result)
              .attr('style','display: block')

          $('#blockSelectImage')
              .attr('style','display: none')
      };

      reader.readAsDataURL(input.files[0]);
  }
}