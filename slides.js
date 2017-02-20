(function (window) {

    function Location () {
        var self = this;
        self.update = function (index) {
            window.location.hash = '#' + index;
        }
        try {
            var hash = window.location.hash;
            target = parseInt(hash.slice(1));
            self.index = target || 0;
        }
        catch (exception) {
            console.log(exception);
            self.index = -1;
        }
    }

    var location = new Location();
    var slides = $('section.slide').hide().toArray();
    var currentSlide = location.index;

    function initialize(){
        showSlide(currentSlide);
    }

    function next() {
        var next_slide = currentSlide + 1;
        (currentSlide <= slides.length - 2) && showSlide(next_slide);
    }

    function previous() {
        currentSlide !== 0 && showSlide(currentSlide - 1);
    }

    function showSlide (index) {

        location.update(index);

        // TODO: Add check
        $(slides[currentSlide]).hide();
        currentSlide = index;
        $(slides[currentSlide]).show();
    }

    var Keys = {
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        LEFT: 37,
        RIGHT: 39,
        HOME:  36,
        END: 35,
        F5: 116
    }

    document.addEventListener('keyup', function (e) {
        console.log(e.keyCode);
        switch(e.keyCode){
            case Keys.PAGE_DOWN:
            case Keys.RIGHT:
                next();
                break;
            case Keys.PAGE_UP:
            case Keys.LEFT:
                previous();
                break;
            case Keys.HOME:
                showSlide(0);
                break;
            case Keys.END:
                showSlide(slides.length - 1);
                next();
                break;
        }
    });

    initialize();

})(window);
