var dropzone = document.getElementById('dropzone')
var uploadBtn = document.getElementById('upload-btn')
var uploadForm = document.getElementById('upload-form')
var uploadSubmit = document.getElementById('upload-submit')
var progressBar = document.querySelector('.progress-bar')

dropzone.addEventListener('dragover', function (e) {
  e.preventDefault()
  e.stopPropagation()

  dropzone.classList.add('border-primary')
})

dropzone.addEventListener('dragleave', function (e) {
  e.preventDefault()
  e.stopPropagation()

  dropzone.classList.remove('border-primary')
})

dropzone.addEventListener('drop', function (e) {
  e.preventDefault()
  e.stopPropagation()

  dropzone.classList.remove('border-primary')

  var files = e.dataTransfer.files

  // Update file input and submit button
  updateInput(files)
})

uploadBtn.addEventListener('change', function () {
  var files = uploadBtn.files

  // Update file input and submit button
  updateInput(files)
})

uploadForm.addEventListener('submit', function (e) {
  e.preventDefault()

  // Reset progress bar
  progressBar.style.width = '0%'

  // Get form data
  var formData = new FormData(uploadForm)

  // Send form data via AJAX
  var xhr = new XMLHttpRequest()

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        alert('Upload successful!')
        progressBar.style.width = '100%'
        uploadSubmit.disabled = true
      } else {
        alert('Upload failed.')
      }
    }
  }

  xhr.upload.addEventListener('progress', function (e) {
    if (e.lengthComputable) {
      var percentComplete = (e.loaded / e.total) * 100
      progressBar.style.width = percentComplete + '%'
    }
  })

  xhr.open('POST', 'upload.php')
  xhr.send(formData)
})

function updateInput(files) {
  if (files.length > 0) {
    var fileNames = []

    for (var i = 0; i < files.length; i++) {
      fileNames.push(files[i].name)
    }

    dropzone.innerHTML = fileNames.join(', ')
    uploadSubmit.disabled = false
  } else {
    dropzone.innerHTML =
      '<i class="fas fa-cloud-upload-alt"></i><div class="text-muted">Drag and drop files here or click to select files</div>'
    uploadSubmit.disabled = true
  }
}
