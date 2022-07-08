import fs from 'fs'
import path from 'path'

function infoFoldersAndFiles(directory) {
    let files = fs.readdirSync(directory);
    let countFolders = 0
    let countFiles = 0

    for (let document of files) {
        let isFolder = fs.statSync(path.join(directory, document)).isDirectory()
        if (isFolder) {
            countFolders++;
            infoFoldersAndFiles(path.join(directory, document));
        } else {
            countFiles++;
        }
    }
    const info = JSON.stringify({
        path: path.join(directory, 'info.json'),
        countFolders,
        countFiles
    }, null, '\t')
    fs.writeFileSync(path.join(directory, 'info.json'), info)
}

infoFoldersAndFiles(path.resolve())