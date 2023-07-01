document.addEventListener("DOMContentLoaded",handleJson)
function handleJson(){
  let requestFile = "index.json"
  fetch(requestFile).then((res) => {
    return res.json()
  }).then((res) => {
    // console.log(res)
    let html = ""
    let items = document.getElementById("items")
    res.items.forEach(element => {
      switch (element.type) {
        case "profilePicture":
          if (element.src !== ""){
            html += htmlProfilePicture(element)
          }
          break;
        case "button":
          if (element.text !== ""){
            html += htmlButton(element)
          }
          break;
        case "text":
          if (element.text !== ""){
            html += htmlText(element)
          }
          break;
      
        default:
          if (element.html !== ""){
            html += element.html
          }
          break;
      }
    })
    if (res.toast !== undefined) {
      let customButtons = []
      let closeText = "Close"
      if (res.toast.action.close !== "" || res.toast.action.close !== undefined){
        closeText = res.toast.action.close
      }
      if (res.toast.action !== undefined) {
        customButtons = [
          {
            text: res.toast.action.text,
            onClick: function() {
              window.open(res.toast.action.href);
            }
          }
        ]
      }
      new Toast({
        message: res.toast.message,
        type: 'default',
        customButtons
      })
      setTimeout(() => {
        document.querySelector(".toastjs-btn--close").innerText = closeText
      }, 1000);
    }
    // console.log(html)
    items.innerHTML += html
  }).catch((e) => {
    console.error(e)
    items.innerHTML += "<h1>Error</h1>"
  })
  revealPage()
}

function revealPage(){
  var myhtml_container = document.querySelector(".container")
  var myhtml_cover = document.querySelector(".page-cover")
  setTimeout(() => {
    myhtml_cover.classList.toggle('visuallyhidden')
  },600)
  setTimeout(() => {
    // myhtml_container.classList.toggle('hidden')
    myhtml_cover.classList.toggle("hidden")
  }, 800);
  setTimeout(() => {
    myhtml_container.classList.toggle("visuallyhidden")
  }, 900);
}