
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad = true;
let initialImagesCount = 5;
const imagesCount = 30;

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');



/*****************
 * unsplash api
 * {@link} https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY
 * 
 ********************/
const apiKey = 'lXp4mbT13PpmnvUhudz_ZOG0slwYFmwDcdsCl8AP-Jo';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialImagesCount}`;


//helper function to set attributes in dom elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}



//check if all images were loaded
function imageLoaded() {
    //console.log('image loaded');
    imagesLoaded++;
    //console.log(imagesLoaded);
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;

        updateImageFromAPI();
        //console.log('read =', ready);
    }
}

function updateImageFromAPI() {
    let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialImagesCount}`;
}

//create elements for links & photos, add to dom
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    //   console.log('total images', totalImages);

    //run function for each object in photosArray
    photosArray.forEach((photo) => {
        //create <a> to link to unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });

        //create <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute("alt", photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        //event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);



        //put <img> inside <a>, then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}


//get photos from unsplash api
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        // console.log(photosArray);
        displayPhotos();
    } catch (error) {
        //catch error here
        console.log('Error fetching data :' + error);
    }
}


//check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
    //console.log('scrolled');
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
        //console.log('load more');
    }
});

//on load
getPhotos();
