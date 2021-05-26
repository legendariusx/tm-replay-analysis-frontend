import axios from 'axios';
import env from "react-dotenv";

export function uploadFileRequest(files) {
    return new Promise((resolve, reject) => {
        let promises = []
        for (let file of files) {
            promises.push(new Promise((resolve) => {
                const fileReader = new FileReader();
                fileReader.onloadend = () => {
                    resolve({
                        filename: file.name,
                        // Remove metadata of base64 converted file
                        base64Data: fileReader.result.replace('data:application/octet-stream;base64,', '')
                    })
                }
                fileReader.readAsDataURL(file)
            }))
        }

        Promise.all(promises).then(values => {
            axios.post(`${env.API_HOST}/analyze`, {
                files: values
            })
            .then(res => {
                resolve(res.data)
            })
            .catch(e => {
                reject(e)
            })
        })
    })
    
}