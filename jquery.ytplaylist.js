(function($) {

    $.fn.ytplaylist = function( options ) {

        // Establish our default settings
        var settings = $.extend({
            playlist : 'PLg7s6cbtAD15G8lNyoaYDuKZSKyJrgwB-',
            complete : null
        }, options);

        return this.each( function() {

            var targetEl = jq(this);

            $.getJSON('//gdata.youtube.com/feeds/api/playlists/' + settings.playlist + '?v=2&alt=json&callback=?', function (data) {
                var list_data = "";
                jq.each(data.feed.entry, function (i, item) {
                    //filter out private videos
                    if (item.title.$t != 'Private video') {                    
                        var feedTitle = item.title.$t;
                        var feedURL = item.link[1].href;
                        var fragments = feedURL.split("/");
                        var videoID = fragments[fragments.length - 2];
                        var thumb = "//i1.ytimg.com/vi/" + videoID + "/mqdefault.jpg";
                        list_data += '<li><a href="https://www.youtube.com/watch?v=" title="' + feedTitle + '"><img src="' + thumb + '" width="267" height="160" alt="' + feedTitle + '"></a></li>';
                    }
                });
                jq(list_data).appendTo(targetEl);

            if ( $.isFunction( settings.complete ) ) {
                settings.complete.call(this);
            }
        });

    };

}(jQuery));
