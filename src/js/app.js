import Jets from 'jets'

const search = new Jets({
  searchTag: '#jetsSearch',
  contentTag: '#jetsContent',
  columns: [0]
})

const searchBox = document.getElementById('jetsSearch')
const searchList = document.getElementById('jetsContent')
const button = document.querySelector('.btn-expand')
let expanded = false

searchBox.addEventListener('input', () => {
  if (expanded) hideList()
  searchList.style.display = (searchBox.value == '') ? 'none' : 'table-row-group'
  document.querySelector('.categories').style.display = (searchBox.value == '') ? 'block' : 'none'
  button.disabled = searchBox.value != ''
})

button.addEventListener('click', showList)
function showList () {
  expanded = true
  button.textContent = 'Alle ausblenden'
  searchList.style.display = 'table-row-group'
  button.removeEventListener('click', showList)
  button.addEventListener('click', hideList)
}

function hideList () {
  expanded = false
  button.textContent = 'Alle anzeigen'
  searchList.style.display = 'none'
  button.removeEventListener('click', hideList)
  button.addEventListener('click', showList)
}
