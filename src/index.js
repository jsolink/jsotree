let errorText = "Error"

document.addEventListener("DOMContentLoaded",handleJson)
function handleJson(){
  // let requestFile = "index.json"
  let requestFile = "export.json"
  fetch(requestFile).then((res) => {
    return res.json()
  }).then((res) => {
    // console.log(res)
    let html = ""
    let items = document.getElementById("items")
    res.items.forEach(element => {
      switch (element.type) {
        case "profilePicture":
          if (element.src !== "" && element.src !== undefined){
            html += htmlProfilePicture(element)
          }
          break;
        case "button":
          html += htmlButton(element)
          break;
        case "text":
          if (element.text !== "" && element.text !== undefined){
            html += htmlText(element)
          }
          break;
        
        case "lightbox":
          if (element.src !== "" && element.src !== undefined){
            html += htmlLightbox(element)
          }
          break;
      
        default:
          if (element.html !== "" && element.html !== undefined){
            html += element.html
          }
          break;
      }
    })
    if (res.toast !== undefined && res.toast.message !== "") {
      let customButtons = []
      let closeText = "Close"
      if (res.toast.action.close !== "" && res.toast.action.close !== undefined){
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
    refreshFsLightbox();
  }).catch((e) => {
    console.error(e)
    items.innerHTML += `<h1>${errorText}</h1>`
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