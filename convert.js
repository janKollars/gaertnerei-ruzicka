const YAML = require('yaml')
const fs = require('fs')

const db = YAML.parse(fs.readFileSync('content/kraeuter/kraeuterDB.yml', 'utf-8'))

for (const kraut of db.kraeuter) {
  const extraNamen = []
  const synonyme = []
  if (Object.hasOwnProperty.call(kraut, 'name2') && kraut.name2) {
    extraNamen.push(kraut.name2)
    delete kraut.name2
  }
  if (Object.hasOwnProperty.call(kraut, 'name3') && kraut.name3) {
    extraNamen.push(kraut.name3)
    delete kraut.name3
  }
  if (Object.hasOwnProperty.call(kraut, 'synonym1') && kraut.synonym1) {
    synonyme.push(kraut.synonym1)
    delete kraut.synonym1
  }
  if (Object.hasOwnProperty.call(kraut, 'synonym2') && kraut.synonym2) {
    synonyme.push(kraut.synonym2)
    delete kraut.synonym2
  }

  if (extraNamen.length)
    kraut.extraNamen = extraNamen
  if (synonyme.length)
    kraut.synonyme = synonyme
}

const output = YAML.stringify(db)

fs.writeFileSync('kraeuterDB.yml', output)
