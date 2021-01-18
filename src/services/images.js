const axios = require('axios').default;
import models from '../models';
export const getImagesFromAgile = async () => {
    // clear old model
    models.images = [];
    // First, get Authorization token
    const authResponse = await axios.post('http://interview.agileengine.com/auth', {
        apiKey: process.env.API_KEY
    });
    let page = 1;
    const response = await getImagesFromPage(page, authResponse.data.token);
    models.images.push(response.data.pictures);
    // check more pages and load them in memory
    const promises = [];
    while (response.data.pageCount > page) {
        promises.push(getImagesFromPage(page, authResponse.data.token).then(async response => {
            // for each picture, we need to get the values
            return response.data.pictures.map(async picture => {
                const imageContent = await getImageContent(picture.id, authResponse.data.token);
                return {
                    ...picture,
                    ...imageContent.data
                }
            });
        }));
        page++;
    }
    const multiPromises = await Promise.all(promises);
    const multiImages = await Promise.all(multiPromises.flat(1));
    models.images = multiImages.flat(1);
    console.log('Images initialized');
}

const getImagesFromPage = async (page, token) => {
    return await axios.get(`http://interview.agileengine.com/images?page=${page}`, { 
        headers: {
            Authorization: token
        }
    });
}

const getImageContent = async (imageId, token) => {
    return await axios.get(`http://interview.agileengine.com/images/${imageId}`, { 
        headers: {
            Authorization: token
        }
    });
}