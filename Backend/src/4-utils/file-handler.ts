import fsPromises from "fs/promises";
import path from "path";
import { v4 as uuid } from "uuid";
import { UploadedFile } from "express-fileupload";

const imagesDir = path.join(__dirname, "..", "1-assets", "images");

function getImagePath(imageName: string): string {
    return imagesDir + "/" + imageName;
}

async function saveImage(image: UploadedFile): Promise<string>{
    const extension = path.extname(image.name);
    const imageName = uuid() + extension;
    const absolutePath = getImagePath(imageName);
    await image.mv(absolutePath);

    return imageName;
}

async function updateImage(image: UploadedFile, prevImageName: string): Promise<string>{
    await deleteImage(prevImageName);  
    const imageName = saveImage(image); 
    return imageName;
}

async function deleteImage(imageName: string){
    try {
        if(!imageName) return;
        const absolutePath = getImagePath(imageName);
        await fsPromises.unlink(absolutePath);
    } catch (error:any) {
        console.log(error.message);
        
    }
}

export default {
    getImagePath,
    saveImage,
    updateImage,
    deleteImage
};
