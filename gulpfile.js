const { watch, parallel,  series, src, dest } = require('gulp')
const rename = require('gulp-rename')
const del = require('del')
const YAML = require('yaml')
const fs = require('fs')

const kraeuterDBpath = 'content/kraeuter/kraeuterDB.yml'

function copyContent() {
  del.sync(['site/content/*', '!site/content', '!site/content/kraeuter', '!site/content/admin'])
  return src('content/*')
    .pipe(dest('site/content'))
}

function copyPreisklassen() {
  return src('content/kraeuter/preisklassen.yml')
    .pipe(dest('site/data'))
}

function copyKraeuterIndex() {
  return src('content/kraeuter.md')
    .pipe(rename('_index.md'))
    .pipe(dest('site/content/kraeuter'))
}

function copyKraeuter() {
  del.sync(['site/content/kraeuter/*', '!site/content/kraeuter', '!site/content/_index.html', '!site/content/admin'])
  const kraeuter = YAML.parse(fs.readFileSync(kraeuterDBpath, 'utf-8')).kraeuter
  for (const kraut of kraeuter) {
    if (Object.hasOwnProperty.call(kraut, 'body')) {
      let content = '---\n'
      for (const key in kraut) {
        if (key !== 'body') content += `${key}: ${kraut[key]}\n`
      }
      content += `---\n${kraut.body}`
      fs.writeFileSync(`site/content/kraeuter/${
        kraut.name.toLowerCase()
        .replace(/ä/g, 'ae')
        .replace(/ö/g, 'oe')
        .replace(/ü/g, 'ue')
        .replace(/ß/g, 'ss')
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-')
      }.md`, content)
    }
  }
  return src(kraeuterDBpath)
    .pipe(dest('site/data'))
}

exports.watch = function() {
  watch('content/kraeuter/preisklassen.yml', copyPreisklassen)
  watch(kraeuterDBpath, copyKraeuter)
  watch('content/kraeuter.md', copyKraeuterIndex)
  watch(['content/*', '!content/kraeuter.md'], copyContent)
}

exports.build = parallel(copyContent, copyPreisklassen, copyKraeuter, copyKraeuterIndex)
