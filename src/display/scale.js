(function pdfjsScale() {

'use strict';

var Scale = PDFJS.Scale = (function ScaleFunctionalityClosure() {

    function _createViewport(width, height, page) {
        var actualWidth = page.pageInfo.view[2];
        var actualHeight = page.pageInfo.view[3];

        var scale;
        var viewport;

        if (typeof(width)=='number' && typeof(height)!='number') {
            scale = width/actualWidth;
            viewport = page.getViewport(scale);
            return viewport;
        }
        if (typeof(width)!='number' && typeof(height)=='number') {
            scale = height/actualHeight;
            viewport = page.getViewport(scale);
            return viewport;
        }
        // This one is special. Specifying a  width & height means setting bounds. Both are tested and the
        // pdf is not to go outside the max width or height
        if (typeof(width)=='number' && typeof(height)=='number') {
            scale = height/actualHeight;
            if (scale*actualWidth>width) { // too big, use other dimension's scale
                scale = width/actualWidth;
                viewport = page.getViewport(scale);
                return viewport;
            }
            viewport = page.getViewport(scale);
            return viewport;
        }
        viewport = page.getViewport(1);
        return viewport;
    }

    return {
        render: function (width, height, page, target) {
            if (typeof(width)!='number' && typeof(height)!='number') {
                throw "at least one parameter must be specified as a number: width, height";
            }
            //
            // Get viewport
            //
            var viewport = _createViewport(width, height, page);
            //
            // Add canvas
            //
            var canvas = document.createElement('canvas');
            target.appendChild(canvas);
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            //
            // Render PDF page into canvas context
            //
            var context = canvas.getContext('2d');
            var renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            page.render(renderContext);
        }
    }
})();

}).call((typeof window === 'undefined') ? this : window);