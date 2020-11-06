// Image upload options & events
UIkit.upload('.img-upload', {

    mime: 'image/*',

    error: function () { // On upload error
        alert('Upload error!');
    },
    complete: function () { // On upload complete
        console.log(this.files);
        alert('Upload complete!');
    }

});

// Get average RGB
function getAvgRGB(img) {

    // Initializing canvas
    const canvas = document.createElement('canvas');
    const width = canvas.width = img.naturalWidth;
    const height = canvas.height = img.naturalHeight;

    // Drawing image to canvas
    let ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    // Collecting image data
    const data = ctx.getImageData(0, 0, width, height).data;

    // Calculating RGB values from image data
    let r, g, b;

    for (let i = 0, l = data.length; i < l; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
    }

    r = Math.floor(r / (data.length / 4));
    g = Math.floor(g / (data.length / 4));
    b = Math.floor(b / (data.length / 4));

    return {
        r: r,
        g: g,
        b: b
    };

}