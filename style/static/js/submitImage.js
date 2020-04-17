Webcam.attach("#webcam");
var selectedStyle = "";

function isCookiesEnabled() {
  return document.cookie && document.cookie !== "";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function b64toBlob(dataURI) {
  const byteString = atob(dataURI.split(",")[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  console.log(
    new Blob([ab], {
      type: "image/jpeg"
    })
  );
  return new Blob([ab], {
    type: "image/jpeg"
  });
}

async function upload(blob) {
  const serverUrl = "/";
  const formData = new FormData();
  formData.append("image", b64toBlob(blob), "image.png");
  formData.append("style", `${selectedStyle}`);
  console.log(getCookie("csrftoken"));

  const response = await fetch(serverUrl, {
    method: "POST",
    headers: {
      "X-CSRFToken": getCookie("csrftoken")
    },
    body: formData
  });

  const result = await response.json();
  photo = document.getElementById("photo");
  photo.setAttribute("src", result.image);

  document.getElementById("style-sample-div").style.display = "none";
  document.getElementById("loading-div").style.display = "none";
  document.getElementById("output-image-div").style.display = "block";
  selectedStyle = "";
}

function take_snapshot() {
  if (selectedStyle !== "") {
    Webcam.snap(function(data_uri) {
      document.getElementById("photo").setAttribute("src", data_uri);
      upload(data_uri);
    });
    document.getElementById("style-sample-div").style.display = "none";
    document.getElementById("loading-div").style.display = "block";
  } else {
    $.toast({
      text:
        "<span style='font-size: 15px;'>You need to select a style first!</span>",
      heading: "<span style='font-size: 20px;'>No Style Selected</span>",
      icon: "error",
      showHideTransition: "plain",
      allowToastClose: true,
      hideAfter: 2000,
      stack: 5,
      position: "top-right",
      textAlign: "left",
      loader: false
    });

    if (document.getElementById("style-sample-div").style.display === "none") {
      generateNewStyle();
    }
  }
}

function styleChanged(event) {
  document
    .getElementById("candy-sample-image")
    .setAttribute("class", "is-square hover-enable");
  document
    .getElementById("mosaic-sample-image")
    .setAttribute("class", "is-square hover-enable");
  document
    .getElementById("rain-princess-sample-image")
    .setAttribute("class", "is-square hover-enable");
  document
    .getElementById("udnie-sample-image")
    .setAttribute("class", "is-square hover-enable");

  event = event || window.event;
  let targetElement = event.target || event.srcElement || event;
  selectedStyle = targetElement.getAttribute("value");

  targetElement.setAttribute("class", "is-square selected");
}

function generateNewStyle() {
  document
    .getElementById("candy-sample-image")
    .setAttribute("class", "is-square hover-enable");
  document
    .getElementById("mosaic-sample-image")
    .setAttribute("class", "is-square hover-enable");
  document
    .getElementById("rain-princess-sample-image")
    .setAttribute("class", "is-square hover-enable");
  document
    .getElementById("udnie-sample-image")
    .setAttribute("class", "is-square hover-enable");

  document.getElementById("style-sample-div").style.display = "block";
  document.getElementById("output-image-div").style.display = "none";
}

function save(event) {
  let dataURL = document.getElementById("photo").src;
  console.log("URL", dataURL);
  console.log(event.target);
  event.target.href = dataURL;
  generateNewStyle();
}
