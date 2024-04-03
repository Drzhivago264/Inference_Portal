function download(mimeType, filename) {
    var download_content = ""
    var a = document.createElement('a')
    var paragraph = document.getElementById('keyresponse');
    download_content = paragraph.value
    console.log(download_content)
    var blob = new Blob([download_content], { type: mimeType })
    var url = URL.createObjectURL(blob)
    a.setAttribute('href', url)
    a.setAttribute('download', filename)
    a.click()
  }