const imdbIdRegExp = /ev\d{7}\/\d{4}(-\d)?|(ch|co|ev|nm|tt)\d{7}/;

export const getBase64Image = (imgUrl) => {
    return new Promise((resole, reject) => {
        const img = new Image();
        img.setAttribute("crossOrigin", "anonymous");
        function onLoadHandler() {
            const canvas = document.createElement("canvas");

            canvas.width = img.width;
            canvas.height = img.height;

            const ctx = canvas.getContext("2d");

            ctx.drawImage(img, 0, 0);

            const dataURL = canvas.toDataURL("image/png");
            resole(dataURL);

            img.removeEventListener("load", onLoadHandler);
        }
        function onErrorHandler(error) {
            reject(error);
            img.removeEventListener("error", onErrorHandler);
        }

        img.addEventListener("load", onLoadHandler);
        img.addEventListener("error", onErrorHandler);
        img.src = imgUrl;
    });
};

export const isValidImdbId = (id) => imdbIdRegExp.test(id);

export const isNAPoster = (poster) => poster === "N/A";

export const mapMovieDetails = (movieInfo, keys) => {
    return keys.reduce((acc, key) => [...acc, { title: key, value: movieInfo[key] } ], []);
};
