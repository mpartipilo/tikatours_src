var app = {
    config:{
        serviceUrl:'/requests/service'
    },
    init:function(p)
    {
        this.config = $.extend(true, this.config, jsVars, p);
        this.initNavigation();
        this.initGallery('.fancybox');
        this.modifyHeader();
        this.matchHeights($('.t-info'));
        
        this.toggleFootSlides();
        this.initCarousel();

        if($('.posted').length)
        {
            $(window).scrollTop($(document).height());

            $('#widget-99').show();
            $('#news-link').addClass('active');
            $('#news-link .fa-plus').addClass('fa-minus');
        }

        $('#map-upper').on('click', function(){
            
            var self = $(this),
            target = self.data('toggle'),
            jTarget = $(target);

            if(jTarget.length)
            {
                if(jTarget.is(':hidden'))
                {

                    jTarget.slideDown(400, function() {
                        app.initMap('map-canvas');
                        self.find('p:last').html('Click to close map <i class="fa fa-angle-double-up"></i>');
                    });
                }
                else
                {
                    jTarget.slideUp(400, function() {
                        
                        self.find('p:last').html('Click to see map <i class="fa fa-angle-double-down"></i>');
                    });
                }
            }
        });


    },
    initCarousel:function()
    {
        var owl = $(".slides");

        if(owl)
        {
            owl.owlCarousel({
                singleItem:true,
                pagination:false,
                addClassActive:true,
                slideSpeed:500,
                afterMove:function(){
                    var target = $('.count span');
                    var currentIndex = $('.owl-item.active').index() + 1;
                    target.html(currentIndex);
                }
            });

            $(".r-next").click(function(){
                owl.trigger('owl.next');
            });
            $(".r-prev").click(function(){
                owl.trigger('owl.prev');
            });
        }
        
    },
    matchHeights:function(eml)
    {
        var groupedArray = [];
        eml.each(function(index, item){
            if($.inArray($(item).attr('class'), groupedArray) < 0) groupedArray.push($(item).attr('class'));
        });

        if(groupedArray.length > 0)
        {
            $(groupedArray).each(function(ind, column){
                column = $('.'+column.replace(new RegExp(' ', 'g'), '.'));
                column.css('height', 'auto');
                var maxHeight = Math.max.apply(null, column.map(function ()
                {
                    return $(this).height();
                }).get());
                column.height(maxHeight)
            });
        }
    },
    modifyHeader:function()
    {
        var w        = $(window),
        header       = $('header .top'),
        headerHeight = header.height(),
        logoImg      = $('.logo img'),
        logoSrc      = logoImg.data('orig-src'),
        logoAltSrc   = logoImg.data('alt-src'),
        windowWidth  = $(window).width();
        scrollPoint  = w.scrollTop() - (headerHeight*1.5);

        if(scrollPoint < headerHeight){

            header.removeClass('fade-in fixed').dequeue();
            logoImg.attr('src',logoSrc);

        }else{

            header.addClass('fixed').delay(150).queue(function(){
                $('header .top').addClass('fade-in').dequeue();
            });

            if(windowWidth < 1200)
            {
                logoImg.attr('src',logoAltSrc);
            }
        }

        var overlay = $('.overlay'),
        overlayHeight = overlay.height();

        if(overlay.length){
            if(w.scrollTop() > overlayHeight){
                $('.ss-wrap').removeClass('fixed');
                $('.main').css('top','auto');
            }else{
                $('.ss-wrap').addClass('fixed');
                $('.main').css('top','100%');
            }
        }

        

    },
    fadeOverlay:function()
    {

        if($('.overlay').length)
        {
            var scrollTop = $(window).scrollTop(),
            height    = $(window).height(),
            capHeight = $('.ss-cap').height(),
            wWidth = $(window).width();
            if(wWidth < 768)
            {
                triggerPoint = (height / 2);
            }else{
                triggerPoint = (height / 2) + (capHeight * 1.5);
            }

            $('.overlay').css({
                'opacity': ((height - scrollTop) / height)
            });

            if(scrollTop > triggerPoint){
                $('.ss-cap,.ss-wrap .prev,.ss-wrap .next').fadeIn('slow');
            }else{
                $('.ss-cap,.ss-wrap .prev,.ss-wrap .next').fadeOut('fast');
            }
        }

    },
    toggleFootSlides:function()
    {
        var trigger = $('.social-links a[data-widget]');

        trigger.on('click',function(e){

            e.preventDefault();

            var targetID = $(this).data('widget');
            var target = $('#widget-'+targetID);

            $(target).toggle();

            $('.social-links .widget').not(target).hide();

            $(this).toggleClass('active');

            $('.news-sign').removeClass('posted');

            $('.social-links a[data-widget]').not($(this)).removeClass('active');

            $(this).children('.fa-plus').toggleClass('fa-minus');
            $('.social-links a[data-widget]').not($(this)).children('.fa-plus').removeClass('fa-minus');

            var iframe = target.children('iframe');
            if(iframe.attr('src') == "")
            {
                var src = iframe.data('src');
                iframe.attr('src',src);
                iframe.load(function(){
                    $(this).siblings('.spinner').remove();
                });
            }

            if(targetID == '8')
            {
                var src = $('script[data-sharesrc]').data('sharesrc');
                $('script[data-sharesrc]').attr('src',src);
                $('script[data-sharesrc]').load(function(){
                    $(this).siblings('.spinner').remove();
                });
            }

        });
    },
    initNavigation:function()
    {
        
        if($('li .fa').length)
        {
            $('li .fa').on('click', function(e){
                e.preventDefault();
                var self = $(this),
                target = self.siblings('ul');

                if(target.length)
                {
                    if(target.is(':hidden'))
                    {
                        target.slideDown('300', function(){
                            self.removeClass('fa-bars').addClass('fa-times');
                        });
                    }
                    else if(target.is(':visible'))
                    {
                        target.slideUp('300', function(){
                            self.removeClass('fa-times').addClass('fa-bars');
                        });
                    }
                }

            });
        }
        $('.top .fa-bars').on('click',function(){
            $('nav').slideToggle();
            $(window).scrollTop(0);
        });

    },
    getConfigItem:function(prop)
    {
        return this.getVar(prop, this.config);

    },
    getVar:function(property, obj)
    {
        if(obj.hasOwnProperty(property)) return obj[property];

        for(var prop in obj)
        {
            if(obj[prop].hasOwnProperty(property))
            {
                return obj[prop][property];
            }
        }
        
        return false;
    },
    initGalleryShuffle:function(elm)
    {
        var jElm = $(elm);
        if(jElm.length)
        {
            jElm.shuffle({
                group:'all',
                itemSelector:'.gallery-item',
                speed:450
            });

            $('.shuffle-btn').on('click', function(e) {

                e.preventDefault();

                jElm.shuffle( 'shuffle', $(this).attr('data-group') );

                $('.shuffle-btn').removeClass('shuffle-active');
                $(this).addClass('shuffle-active');
                
                
            });

            jElm.on('done.shuffle', function(){

                app.initGallery('.fancybox');

            }).on('layout.shuffle', function(a) {
                var self      = $(this),
                selectedGroup = $('.shuffle-btn.shuffle-active').data('group');

                if(selectedGroup == 'all')
                {
                    self.find('.fancybox').attr('data-fancybox-group', 'all');
                }
                else
                {
                    self.find('.fancybox[data-main-group="'+selectedGroup+'"]').attr('data-fancybox-group', selectedGroup);
                }
                
            });
        }
    },
    initGallery:function(elm, opts)
    {
        var jElm = $(elm);

        if(jElm.length)
        {   
            var defaults = {
                helpers:{
                    overlay:{
                       locked:false
                    }
                },
                padding:5,
                afterShow: function()
                {

                    var hammertime = new Hammer($('.fancybox-wrap')[0]);

                    hammertime.on('swipeleft', function(ev) {
                        $.fancybox.next();
                    });

                    hammertime.on('swiperight', function(ev) {
                        $.fancybox.prev();
                    });
                }
            };

            var opts = $.extend(true, defaults, opts);

            jElm.fancybox(opts);
           
        }
    },
    initMap:function(canvas, params, mapOpts)
    {
        canvas = document.getElementById(canvas);
        var ind = app.getConfigItem('globals');

        if(canvas && ind.location)
        {
            
           
            if(!params)
            {
                params = 'action=get-map&index='+ind.location;
            }

            $.post(app.getConfigItem('serviceUrl'), params, function(data){
                
                if(data)
                {

                    var center = new google.maps.LatLng(data.lat, data.lng);


                    var defaults = {
                        center:center,
                        mapTypeId:google.maps.MapTypeId.SATELLITE,
                        disableDefaultUI:true,
                        mapTypeControl:false,
                        zoomControl:true,
                        scaleControl:true,
                        panControl:true,
                        streetViewControl:false,
                        scrollwheel:false,
                    };

                    mapOpts = $.extend(true, defaults, mapOpts);
                    

                    var map      = new google.maps.Map(canvas, mapOpts);
                    var geocoder = new google.maps.Geocoder();
                    var countryName = data.label;

                    geocoder.geocode({'address': countryName+" Country" } , function(results, status) {

                        var ftTableId = 420419;

                        if (status == google.maps.GeocoderStatus.OK)
                        {
                            if(status != google.maps.GeocoderStatus.ZERO_RESULTS)
                            {

                                map.setCenter(results[0].geometry.location);
                                map.fitBounds(results[0].geometry.viewport);
                            }
                            else
                            {
                                console.error("No results found");
                                return false;
                            }
                        }
                        else
                        {
                            console.error("Geocode was not successful for the following reason: " + status);
                            return false;
                        }

                        var ftOptions = {
                            suppressInfoWindows:true,
                            query:{
                                select:'name, kml_4326',
                                from:ftTableId,
                                where:"'name_0' = '"+countryName+"'"
                            },
                            styles:[{
                                polygonOptions:{
                                    fillColor:'#A10A1D',
                                    strokeColor:'#A10A1D',
                                    fillOpacity:0.5
                                },
                            }]
                        };

                        layer = new google.maps.FusionTablesLayer(ftOptions);

                        layer.setMap(map);

                        var cmarker = new RichMarker({
                            position:center,
                            map:map,
                            flat: true,
                            anchor: RichMarkerPosition.MIDDLE,
                            content:'<div class="cname">'+countryName+'</div>',
                            zIndex:1
                        });
                
                        var marker;

                        var infoWindow = new google.maps.InfoWindow({
                            maxWidth:450
                        });

                        $.each(data.regions, function(i, point){

                            var markerPosition = new google.maps.LatLng(point.lat,point.lng);

                            marker = new RichMarker({
                                position:markerPosition,
                                id:point.ind,
                                title:point.label,
                                map:map,
                                flat: true,
                                anchor: RichMarkerPosition.MIDDLE,
                                content:'<div class="map-marker"><img src="'+data.icon+'"> '+point.label+'</div>',
                                infoContent:'',
                                zIndex:(i+2)
                            });

                            google.maps.event.addListener(marker, "click", function(){

                                var ths = this,
                                infoBoxTmpl = '<div class="info-box"><h3>{title}</h3><div><img src="{imgSrc}" alt="{title}" />{info}</div></div>';

                                if(infoWindow) infoWindow.close();

                                if(infoBoxTmpl)
                                {

                                    if(!ths.infoContent || typeof ths.infoContent == 'undefined')
                                    {
                                        var index = ths.id;

                                        if(index)
                                        {
                                            $.post(app.getConfigItem('serviceUrl'), 'action=get-info&index='+index, function(data){

                                                if(data)
                                                {

                                                    var compiledTmpl = infoBoxTmpl;

                                                    $.each(data, function(key, value){
                                                       
                                                      compiledTmpl = compiledTmpl.replace(new RegExp('{'+key.toString()+'}', 'g'), value);
                                                    });

                                                    ths.infoContent = compiledTmpl;

                                                    infoWindow.setContent(ths.infoContent);
                                                    infoWindow.setPosition(markerPosition);
                                                    infoWindow.open(map, ths);
                                                    
                                                }

                                            }, 'json');
                                        }
                                    }
                                    else
                                    {
                                        infoWindow.setContent(ths.infoContent);
                                        infoWindow.setPosition(markerPosition);
                                        infoWindow.open(map, this);
                                    }

                                }

                            });
                               
                        });

                    });
               
                }
            }, 'json');

            
        }
    }

};// end of app
$(function(){

    $(window).on('scroll',function(){
        app.modifyHeader();
        app.fadeOverlay();
    });

    $(window).on('resize',function(){
        app.matchHeights($('.t-info'));
    });

    app.initGalleryShuffle('#gallery-shuffle');

});