const dropzone = document.getElementById('dropzone')
const uploadBtn = document.getElementById('upload-btn')
const uploadForm = document.getElementById('upload-form')
const uploadSubmit = document.getElementById('upload-submit')
const progressBar = document.querySelector('.progress-bar')

function handleDragOver(e) {
  e.preventDefault()
  e.stopPropagation()
  dropzone.classList.add('border-primary')
}

function handleDragLeave(e) {
  e.preventDefault()
  e.stopPropagation()
  dropzone.classList.remove('border-primary')
}

function handleDrop(e) {
  e.preventDefault()
  e.stopPropagation()
  dropzone.classList.remove('border-primary')

  const files = e.dataTransfer.files

  // Check if the file is an image
  var isImage = /^image\//.test(files[0].type)

  if (!isImage) {
    alert('Please upload only image files.')
    return
  }

  // Get form data
  const formData = new FormData()
  formData.append('file', files[0])

  // Send form data via AJAX
  const xhr = new XMLHttpRequest()
  xhr.upload.addEventListener('progress', function (e) {
    if (e.lengthComputable) {
      const percentComplete = (e.loaded / e.total) * 100

      progressBar.style.width = percentComplete.toFixed(0) + '%'
      progressBar.innerHTML = percentComplete.toFixed(0) + '%'
    }
  })

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        progressBar.style.width = '100%'
        uploadSubmit.disabled = true
      } else {
        alert('Upload failed.')
      }
    }
  }

  xhr.open('POST', uploadForm.action, true)
  xhr.send(formData)

  // Update file input and submit button
  updateInput(files)
}

function handleInputChange() {
  const files = uploadBtn.files
  updateInput(files)
}

function handleFormSubmit(e) {
  e.preventDefault()

  // Reset progress bar
  progressBar.style.width = '0%'

  // Get form data
  const formData = new FormData()
  formData.append('file', uploadBtn.files[0])

  // Send form data via AJAX
  const xhr = new XMLHttpRequest()

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        progressBar.style.width = '100%'
        uploadSubmit.disabled = true
      } else {
        alert('Upload failed.')
      }
    }
  }

  xhr.upload.addEventListener('progress', function (e) {
    if (e.lengthComputable) {
      const percentComplete = (e.loaded / e.total) * 100
      progressBar.style.width = percentComplete.toFixed(0) + '%'
      progressBar.innerHTML = percentComplete.toFixed(0) + '%'
    }
  })

  xhr.open('POST', uploadForm.action, true)
  xhr.send(formData)
}

function updateInput(files) {
  if (files.length > 0) {
    const fileNames = []
    for (let i = 0; i < files.length; i++) {
      fileNames.push(files[i].name)
    }
    dropzone.style.color = 'red'
    dropzone.style.fontWeight = 'bold'
    dropzone.innerHTML = fileNames.join(', ')
    uploadSubmit.disabled = false
  } else {
    dropzone.innerHTML =
      '<i class="fas fa-cloud-upload-alt"></i><div class="text-muted">Drag and drop files here or click to select files</div>'
    uploadSubmit.disabled = true
  }
}

// Add event listeners
dropzone.addEventListener('dragover', handleDragOver)
dropzone.addEventListener('dragleave', handleDragLeave)
dropzone.addEventListener('drop', handleDrop)

uploadBtn.addEventListener('change', handleInputChange)

uploadForm.addEventListener('submit', handleFormSubmit)
