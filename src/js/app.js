import jets from "jets"

const search = new jets({
  searchTag: '#jetsSearch',
  contentTag: '#jetsContent'
});

const searchBox = document.getElementById('jetsSearch');
const searchList = document.getElementById('jetsContent');

searchBox.addEventListener('input', () => {
  searchBox.style.marginBottom =(searchBox.value == "") ? '5rem' : '0';
  searchList.style.display = (searchBox.value == "") ? 'none' : 'block';
});
