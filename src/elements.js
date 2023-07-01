function htmlProfilePicture(data){
  // console.log(data.src, data.alt)
  return `<div class="centerContainer"><img src="${data.src}" alt="${data.alt}" class="profile-picture"></div>`
}
function htmlButton(data){
  // console.log(data.alt)
  let target = "_blank"
  let rel = `rel="noopener nofollow"`
  let disable = ""
  let href = "#"
  let icon = ""
  if (data.target !== "" && data.target !== undefined) target = data.target
  if (data.rel !== "" && data.rel !== undefined) rel = `rel="${data.rel}"`
  if (data.href === "" || data.href === undefined) disable = "disabled"
  if (data.href !== "" && data.href !== undefined) href = data.href
  if (data.icon !== "" && data.icon !== undefined) icon = `<i class="${data.icon}"></i>`
  return `<div class="my-links"><a href="${href}" target="${target}" ${rel} class="${disable}">${icon} ${data.text}</a></div>`
}
function htmlText(data){
  let color = "var(--text1)"
  if (data.color !== "" && data.color !== undefined) color = data.color
  if (data.align === "center"){
    return `<div class="centerContainer"><span style="color: ${color};">${data.text}<span></div>`
  }
  return `<span style="color: ${color};">${data.text}<span>`
}