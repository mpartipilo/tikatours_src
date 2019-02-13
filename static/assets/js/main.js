var app = {
  config: {
    serviceUrl: "/requests/service"
  },
  init: function(p) {
    this.config = $.extend(true, this.config, jsVars, p)
    this.initGallery(".fancybox")
  },
  getConfigItem: function(prop) {
    return this.getVar(prop, this.config)
  },
  getVar: function(property, obj) {
    if (obj.hasOwnProperty(property)) return obj[property]

    for (var prop in obj) {
      if (obj[prop].hasOwnProperty(property)) {
        return obj[prop][property]
      }
    }

    return false
  },
  initGallery: function(elm, opts) {
    var jElm = $(elm)

    if (jElm.length) {
      var defaults = {
        helpers: {
          overlay: {
            locked: false
          }
        },
        padding: 5,
        afterShow: function() {
          var hammertime = new Hammer($(".fancybox-wrap")[0])

          hammertime.on("swipeleft", function(ev) {
            $.fancybox.next()
          })

          hammertime.on("swiperight", function(ev) {
            $.fancybox.prev()
          })
        }
      }

      var opts = $.extend(true, defaults, opts)

      jElm.fancybox(opts)
    }
  },
  initMap: function(canvas, params, mapOpts) {
    canvas = document.getElementById(canvas)
    var ind = app.getConfigItem("globals")

    if (canvas && ind.location) {
      if (!params) {
        params = "action=get-map&index=" + ind.location
      }

      $.post(
        app.getConfigItem("serviceUrl"),
        params,
        function(data) {
          if (data) {
            var center = new google.maps.LatLng(data.lat, data.lng)

            var defaults = {
              center: center,
              mapTypeId: google.maps.MapTypeId.SATELLITE,
              disableDefaultUI: true,
              mapTypeControl: false,
              zoomControl: true,
              scaleControl: true,
              panControl: true,
              streetViewControl: false,
              scrollwheel: false
            }

            mapOpts = $.extend(true, defaults, mapOpts)

            var map = new google.maps.Map(canvas, mapOpts)
            var geocoder = new google.maps.Geocoder()
            var countryName = data.label

            geocoder.geocode({ address: countryName + " Country" }, function(
              results,
              status
            ) {
              var ftTableId = 420419

              if (status == google.maps.GeocoderStatus.OK) {
                if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
                  map.setCenter(results[0].geometry.location)
                  map.fitBounds(results[0].geometry.viewport)
                } else {
                  console.error("No results found")
                  return false
                }
              } else {
                console.error(
                  "Geocode was not successful for the following reason: " +
                    status
                )
                return false
              }

              var ftOptions = {
                suppressInfoWindows: true,
                query: {
                  select: "name, kml_4326",
                  from: ftTableId,
                  where: "'name_0' = '" + countryName + "'"
                },
                styles: [
                  {
                    polygonOptions: {
                      fillColor: "#A10A1D",
                      strokeColor: "#A10A1D",
                      fillOpacity: 0.5
                    }
                  }
                ]
              }

              layer = new google.maps.FusionTablesLayer(ftOptions)

              layer.setMap(map)

              var cmarker = new RichMarker({
                position: center,
                map: map,
                flat: true,
                anchor: RichMarkerPosition.MIDDLE,
                content: '<div class="cname">' + countryName + "</div>",
                zIndex: 1
              })

              var marker

              var infoWindow = new google.maps.InfoWindow({
                maxWidth: 450
              })

              $.each(data.regions, function(i, point) {
                var markerPosition = new google.maps.LatLng(
                  point.lat,
                  point.lng
                )

                marker = new RichMarker({
                  position: markerPosition,
                  id: point.ind,
                  title: point.label,
                  map: map,
                  flat: true,
                  anchor: RichMarkerPosition.MIDDLE,
                  content:
                    '<div class="map-marker"><img src="' +
                    data.icon +
                    '"> ' +
                    point.label +
                    "</div>",
                  infoContent: "",
                  zIndex: i + 2
                })

                google.maps.event.addListener(marker, "click", function() {
                  var ths = this,
                    infoBoxTmpl =
                      '<div class="info-box"><h3>{title}</h3><div><img src="{imgSrc}" alt="{title}" />{info}</div></div>'

                  if (infoWindow) infoWindow.close()

                  if (infoBoxTmpl) {
                    if (
                      !ths.infoContent ||
                      typeof ths.infoContent == "undefined"
                    ) {
                      var index = ths.id

                      if (index) {
                        $.post(
                          app.getConfigItem("serviceUrl"),
                          "action=get-info&index=" + index,
                          function(data) {
                            if (data) {
                              var compiledTmpl = infoBoxTmpl

                              $.each(data, function(key, value) {
                                compiledTmpl = compiledTmpl.replace(
                                  new RegExp("{" + key.toString() + "}", "g"),
                                  value
                                )
                              })

                              ths.infoContent = compiledTmpl

                              infoWindow.setContent(ths.infoContent)
                              infoWindow.setPosition(markerPosition)
                              infoWindow.open(map, ths)
                            }
                          },
                          "json"
                        )
                      }
                    } else {
                      infoWindow.setContent(ths.infoContent)
                      infoWindow.setPosition(markerPosition)
                      infoWindow.open(map, this)
                    }
                  }
                })
              })
            })
          }
        },
        "json"
      )
    }
  }
} // end of app
