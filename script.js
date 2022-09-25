const modal = document.querySelector('#modal')
const modalShow = document.querySelector('#show-modal')
const modalClose = document.querySelector('#close-modal')
const bookmarkForm = document.querySelector('#bookmark-form')
const websiteNameEl = document.querySelector('#website-name')
const websiteURLEl = document.querySelector('#website-url')
const bookmarksContainer = document.querySelector('#bookmarks-container')

let bookmarks = {}

// Show modal, focus on input
function showModal () {
   modal.classList.add('show-modal')
   websiteNameEl.focus()
}

// Modal event listener
modalShow.addEventListener('click', showModal)
modalClose.addEventListener('click', () => modal.classList.remove('show-modal'))
window.addEventListener('click', e => e.target === modal ? modal.classList.remove('show-modal') : false)

// Validate Form
function validate(nameValue, urlValue) {
   const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
   const regex = new RegExp(expression)

   if (!nameValue || !urlValue) {
      alert('Please fill all the fields')
      return false
   }

   if (urlValue.match(regex)) {
      // alert('Saved succesfully')
   } else {
      alert('Please enter valid address')
      return false
   }

   // Valid
   return true
}

// build bookmarks DOM
function buildBookmarks() {
   bookmarksContainer.textContent = ''

   // Create items
   Object.keys(bookmarks).forEach(id => {
      const {name, url} = bookmarks[id]

      const item = document.createElement('div')
      item.classList.add('item')

      const closeIcon = document.createElement('i')
      closeIcon.classList.add('fas', 'fa-times')
      closeIcon.setAttribute('title', 'Delete bookmark')
      closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`)

      const linkInfo = document.createElement('div')
      linkInfo.classList.add('name')

      const favicon = document.createElement('img')
      favicon.setAttribute('src', `https://www.google.com/s2/u/0/favicons?domain=${url}`)
      favicon.setAttribute('alt', 'favicon')

      const link = document.createElement('a')
      link.setAttribute('target', '_blank')
      link.setAttribute('href', `${url}`)
      link.textContent = name;

      // Append to container
      linkInfo.append(favicon, link)
      item.append(closeIcon, linkInfo)
      bookmarksContainer.appendChild(item)
   })
}

// Retrieve from localStorage
function retrieveBookmarksFromLocalStorage() {
   if (localStorage.getItem('bookmarks')) {
      bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
   }
   buildBookmarks()
}


// Delete bookmark
function deleteBookmark(id) {
   if (bookmarks[id]) {
      delete bookmarks[id]
   }

   // Update bookmarks array in LS and repopulate DOM
   localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
   retrieveBookmarksFromLocalStorage()
}

// Handle data from form
function storeBookmark(e) {
   e.preventDefault()
   const nameValue = websiteNameEl.value
   let urlValue = websiteURLEl.value

   if(!validate(nameValue, urlValue)) {
      return false
   }
   const bookmark = {
      name: nameValue,
      url: urlValue
   }
   bookmarks[urlValue] = bookmark
   localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
   bookmarkForm.reset()
   websiteNameEl.focus()
   console.log(bookmarks);
   buildBookmarks()
}

// Event listener
bookmarkForm.addEventListener('submit', storeBookmark)

// On Load get bookmarks from localStorage
retrieveBookmarksFromLocalStorage()
 










