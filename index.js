function doSearch() {
  document.getElementById("searchResults").innerHTML="";
  document.getElementById("error").innerHTML="";
  const searchFor = document.getElementById("searchFor").value;
  const urlStr = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&limit=12&search=" + searchFor;
  $.ajax({
    dataType: "jsonp",
    url: urlStr,
    type: "POST",
    success: function (results) {
      if (results[1][0]) {
        for (i=0;i<results[1].length;i++) {
          const resultBox = document.createElement("div");
          const title = document.createElement("h4");
          const article = document.createElement("p");
          const link = document.createElement("a");
          title.innerHTML = results[1][i];
          article.innerHTML = results[2][i];
          link.innerHTML = "Read full article";
          link.setAttribute("href", results[3][i]);
          link.setAttribute("target", "_blank")
          resultBox.setAttribute("class", "result")
          resultBox.appendChild(title)
          resultBox.appendChild(article)
          resultBox.appendChild(link)
          document.getElementById("searchResults").appendChild(resultBox)

        } // end of for loop
      }
      else {
      document.getElementById("error").innerHTML = "Sorry, no results to display."
      }
    }
  });
}


$(document).ready(function(){
  $("#search").click(function(){
   doSearch();
  });
  $("#searchFor").on("keydown", function (key) {
    if (key.keyCode === 13) {
        doSearch();
    }
  });

});
