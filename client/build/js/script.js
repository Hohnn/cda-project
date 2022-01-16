// classList - shows/gets all classes
// contains - checks classList for specific class
// add - add class
// remove - remove class
// toggle - toggles class

const navToggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".links");

navToggle.addEventListener("click", function () {
  // console.log(links.classList);
  // console.log(links.classList.contains("random"));
  // console.log(links.classList.contains("links"));
  // if (links.classList.contains("show-links")) {
  //   links.classList.remove("show-links");
  // } else {
  //   links.classList.add("show-links");
  // }
  links.classList.toggle("show-links");
});

// Fonction img preview

const articleInput = document.getElementById('articleImage');
const imgPreview  = document.getElementById('imgPreview');

articleInput.addEventListener('change', function(e) {
    const reader = new FileReader();
    reader.readAsDataURL(this.files[0]);
    reader.onload = function(e) {
        imgPreview.setAttribute('style', 'display: block');
        imgPreview.setAttribute('src', e.target.result);
    };
});