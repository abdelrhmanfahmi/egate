import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist/legacy/build/pdf';
GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.js';

export const renderFirstPage = (canvas, url) => {
    getDocument(url).promise.then((pdf) => {
        var pageNumber = 1;
        pdf.getPage(pageNumber).then((page) => {
            var scale = 1.5;
            var viewport = page.getViewport({ scale: scale });

            // Prepare canvas using PDF page dimensions
            var context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            // Render PDF page into canvas context
            var renderContext = {
                canvasContext: context,
                viewport: viewport,
            };
            var renderTask = page.render(renderContext);
            renderTask.promise.then(function () { }).catch(err => console.log(err))
        });
    });
};


// all data what we need in page to run this plugin

// import { renderFirstPage } from "@/plugins/pdfJs"

// <a : href="myUrl" target="_blank" @click="getFile" >
//     <canvas id="the-canvas"></canvas>

// </a >

//     let url = 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf';
// this.myUrl = url
// let canvas = document.getElementById('the-canvas')
// if (canvas) {

//     console.log('canvas', canvas);
//     setTimeout(() => {
//         renderFirstPage(canvas, url);
//     }, 2000);
// }

// getFile() {
//     window.open(this.myUrl, "_blank");
// }

// myUrl: null