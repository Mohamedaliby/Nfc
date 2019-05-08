import * as bghttp from "nativescript-background-http";
import productService from "./ProductService";



export default {
    upload(images) {
        // result is ConnectionType enumeration (none, wifi or mobile)
        
        return new Promise((resolve, reject) => {
            let imageUrl;
            console.log('uploading image')
            console.log(images)
            if (images.length === 0) return;
            let url = 'https://elmarka.herokuapp.com/products/image'
            let session = bghttp.session("image-upload");
            let request = {
                url: url,
                method: 'POST',
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            };


            var params = [{
                    name: "name",
                    value: "name"
                },
                // { name: "price", value: price},
                // { name: "size", value:  size},
                // { name: "color", value: color},
                // { name: "text", value:  text},
            ];

            let counter = 0;
            images.forEach(i => {
                params.push({
                    name: 'file',
                    filename: i.src.android,
                    mimeType: 'image/jpeg'
                });

            });

            let task = session.multipartUpload(params, request);

            task.on('error', (e) => {
                console.log('error', e);
                let err = 'failed'
            //     reject(e)
            // return e
            resolve(err)
            return err
            });

            task.on('complete', (e) => {
                console.log('complete', JSON.stringify(e));
            });
            task.on("responded", (e) => {
                imageUrl = e.data
                console.log('response', JSON.stringify(imageUrl));
                // JSON.parse(e.data)
                resolve(imageUrl)
                return imageUrl
            });
        })
    }
}