import {isAndroid} from '@base/common/Utils'
import {DocumentDirectoryPath, DownloadDirectoryPath, downloadFile, LibraryDirectoryPath, mkdir} from 'react-native-fs'
import Constants from '@base/common/Constants'
import {Alert} from 'react-native'

type typeItemFile = {fileUrl: string; type?: string}

const DownloadFiles = (itemFile: typeItemFile) => {
    let path: string
    if (itemFile.type === Constants.typeDownload.public) {
        if (isAndroid()) {
            path = DownloadDirectoryPath
        } else {
            path = DocumentDirectoryPath
        }
    } else {
        if (isAndroid()) {
            path = DocumentDirectoryPath
        } else {
            path = LibraryDirectoryPath
        }
    }

    const newFileUri = itemFile.fileUrl.lastIndexOf('/')
    const fileName = itemFile.fileUrl.substring(newFileUri)

    mkdir(`${path}/MyApp`)
        .then(() => {
            console.log('mkdir folder success')
            downloadFile({
                fromUrl: itemFile.fileUrl,
                toFile: `${path}/MyApp/${fileName}`,
                background: true,
            })
                .promise.then(() => {
                    Alert.alert('download success!')
                })
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                .catch(() => {})
        })
        .catch(err => {
            console.log('mkdir error', err)
        })
}

export {DownloadFiles}
