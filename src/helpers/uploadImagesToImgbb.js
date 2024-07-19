import axios from "axios";
import FormData from "form-data";

export const uploadImagesToImgbb = async (files) => {
    if (!files || files.length === 0) {
        return [];
    }

    const urls = [];

    for (const file of files) {
        const formData = new FormData();
        formData.append('image', file.buffer.toString('base64'));

        const response = await axios.post(`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`, formData, {
            headers: formData.getHeaders(),
        });
        urls.push(response.data.data.url);
    }

    return urls;
};
