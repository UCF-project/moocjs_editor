VISH.Samples.API = (function(V,undefined){
	
  var recommendationList = [
    { "id"                : "1",
      "url"               : "http://vishub.org/excursions/144",
      "title"             : "Nanogame",
      "author"            : "ebarra",
      "description"       : " bla bla bla",
      "image"             : "http://vishub.org/assets/logos/original/excursion-05.png",
      "views"             : "56",
      "favourites"        : "3",
      "number_of_slides"  : "8"
    },
    { "id"                : "2",
      "url"               : "http://vishub.org/excursions/83",
      "title"             : "Flascard Curiosity in my title long",
      "author"            : "aldo",
      "description"       : " bla bla bla 2",
      "image"             : "http://vishub.org/assets/logos/original/excursion-07.png",
      "views"             : "563",
      "favourites"        : "13",
      "number_of_slides"  : "2"
    },
    { "id"                : "3",
      "url"               : "http://vishub.org/excursions/55",
      "title"             : "Nanogame by UCAM or by her friend",
      "author"            : "nestor",
      "description"       : " bla bla bla",
      "image"             : "http://vishub.org/assets/logos/original/excursion-08.png",
      "views"             : "56",
      "favourites"        : "33",
      "number_of_slides"  : "8"
    },
    { "id"                : "4",
      "url"               : "http://vishub.org/excursions/14",
      "title"             : "Heart",
      "author"            : "ebarra",
      "description"       : " bla bla bla",
      "image"             : "http://vishub.org/assets/logos/original/excursion-15.png",
      "views"             : "156",
      "favourites"        : "3",
      "number_of_slides"  : "8"
    },
    { "id"                : "5",
      "url"               : "http://vishub.org/excursions/81",
      "title"             : "Flascard Curiosity",
      "author"            : "aldo",
      "description"       : " bla bla bla 2",
      "image"             : "http://vishub.org/assets/logos/original/excursion-17.png",
      "views"             : "463",
      "favourites"        : "23",
      "number_of_slides"  : "2"
    },
    { "id"                : "6",
      "url"               : "http://vishub.org/excursions/56",
      "title"             : "Nanogame",
      "author"            : "nestor",
      "description"       : " bla bla bla",
      "image"             : "http://vishub.org/assets/logos/original/excursion-18.png",
      "views"             : "1256",
      "favourites"        : "33",
      "number_of_slides"  : "8"
    }    
  ];

  var flashcardList = {
    'flashcards': [
    {
      "id"      : "1120",
      "VEVersion":"0.2",
      "type":"flashcard",
      "author":"",
      "slides":[
        {
          "id":"article4",
          "type":"flashcard",
          "background":"url(http://4.bp.blogspot.com/-fsV8poJXoJc/ULe8nkVbaVI/AAAAAAAAA-M/Q2vW16z6Ivc/s1600/Imagen16.png)",
          "pois":[
            {
              "id":"article4_poi1",
              "x":"36.875",
              "y":"67.33333333333333",
              "slide_id":"article4_article1"
            },{
              "id":"article4_poi2",
              "x":"55.375",
              "y":"68.16666666666667",
              "slide_id":"article4_article2"
            },{
              "id":"article4_poi3",
              "x":"45.875",
              "y":"5.5",
              "slide_id":"article4_article3"
            }
          ],
          "slides":[
            {
              "id":"article4_article1",
              "type":"standard",
              "template":"t2",
              "elements":[
                {
                  "id":"article4_article1_zone1",
                  "type":"image",
                  "areaid":"left",
                  "body":"http://1.bp.blogspot.com/_KaMLeO20q1Q/TGk8gfWkp7I/AAAAAAAAAHI/80bTifiIk6M/s1600/24+Do%C3%B1ana.JPG",
                  "style":"position: relative; width:110.31518624641834%; height:97.1590909090909%; top:2.0833333333333335%; left:-1.146131805157593%;"
                }
              ]
            },
            {
              "id":"article4_article2",
              "type":"standard",
              "template":"t2",
              "elements":[
                {
                  "id":"article4_article2_zone1",
                  "type":"image",
                  "areaid":"left",
                  "body":"http://farm9.staticflickr.com/8504/8367119464_f8ff09456d.jpg",
                  "style":"position: relative; width:103.15186246418338%; height:90.53030303030303%; top:3.0303030303030303%; left:-0.5730659025787965%;"
                }
              ]
            },{
              "id":"article4_article3",
              "type":"standard",
              "template":"t2",
              "elements":[
                {
                  "id":"article4_article3_zone1",
                  "type":"image",
                  "areaid":"left",
                  "body":"http://cabeceras.eldiariomontanes.es/imagenes-municipios/galerias/5348/mf01z4411811x1492-452.jpg",
                  "style":"position: relative; width:119.05444126074498%; height:129.54545454545453%; top:-2.6515151515151514%; left:-3.5816618911174785%;"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id"      : "1115","VEVersion":"0.2","type":"flashcard","author":"","slides":[{"id":"article4","type":"flashcard","background":"url(http://www.exploringnature.org/graphics/endangered_species/endangered_animals200.jpg)","pois":[{"id":"article4_poi1","x":"15.625","y":"8.5","slide_id":"article4_article3"},{"id":"article4_poi2","x":"77.75","y":"11.5","slide_id":"article4_article1"},{"id":"article4_poi3","x":"17.125","y":"58.833333333333336","slide_id":"article4_article2"}],"slides":[{"id":"article4_article3","type":"standard","template":"t10","elements":[{"id":"article4_article3_zone1","type":"image","areaid":"center","body":"http://d30mmglg94tqnw.cloudfront.net/wp-content/plugins/magic-gallery/uploads/12/komodo-dragon_6771_600x450.jpg","style":"position: relative; width:49.62406015037594%; height:66.22073578595318%; top:15.719063545150501%; left:24.18546365914787%;"}]},{"id":"article4_article1","type":"standard","template":"t10","elements":[{"id":"article4_article1_zone1","type":"image","areaid":"center","body":"http://www.golden-gate-park.com/wp-content/uploads/2011/03/bison_bufflo_in_golden_gate_park.jpg","style":"position: relative; width:60.526315789473685%; height:67.3913043478261%; top:15.719063545150501%; left:20.17543859649123%;"}]},{"id":"article4_article2","type":"standard","template":"t10","elements":[{"id":"article4_article2_zone1","type":"image","areaid":"center","body":"http://wfiles.brothersoft.com/e/elephant_88059-1600x1200.jpg","style":"position: relative; width:115.91478696741855%; height:116.05351170568562%; top:-2.842809364548495%; left:-0.7518796992481203%;"}]}]}]
    },
    {
        "id"      : "111",
        "title"     : "Chess: The Art of Learning",
        "description"   : "The Art of Learning, a journey in the pursuit of excellence.\nAmazing presentation with images, videos and 3d objects, generated by Vish Editor.",
        "avatar" : "/vishEditor/images/excursion_thumbnails/excursion-10.png",
        "author"    : "",
        "type"      : "flashcard", //flashcard, game, presentation, microscope, experiment, quiz
        "tags": ["Samples","Test","Development"],
        "author" : "",
        "theme"  : "theme1",
        "age_range" : "4 - 14",
        "subject" : "Media Education",
        "language" : "en",
        "educational_objectives" : "bla bla bla 3",
        "adquired_competencies" : "pupils will be smarter",
        "slides" : [
        {
          "id"      : "27",
          "type"      : "flashcard",
          "background"  : "url(http://html.rincondelvago.com/000563580.png)",
          "pois": [{"id": "poi1",
                "x" : "11",
                "y" : "4.5",
                "slide_id": "1"},
               {"id": "poi2",
                "x" : "47",
                "y" : "34",
                "slide_id": "2"},
               {"id": "poi3",
                "x" : "84",
                "y" : "81",
                "slide_id": "3"}],
          "slides" : [{
          "id" : "1",
          "template" : "t1",
          "elements" : [{
            "id" : "zone1",
            "type" : "image",
            "areaid" : "left",
            "body" : "http://blogs.20minutos.es/cronicaverde/files/parque_nacional_donana_lince_iberico.jpg",
            "style" : "position: relative; width:97.82608695652173%; height:80.10752688172043%; top:0%; left:0%;"
          }, {
            "id" : "zone2",
            "type" : "text",
            "areaid" : "header",
            "body" : "<div class=\"vish-parent-font3 vish-parent-font6\" style=\"text-align: center; font-weight: normal; \"><span class=\"vish-font3 vish-fontarial\"><span class=\"vish-font6 vish-fontHelvetica\" style=\"undefined;\"><span style=\"font-family: helvetica;\"><span style=\"font-weight: bold;\">Chess</span>: The Art of Learning</span></span><br></span></div>"
          }, {
            "id" : "zone3",
            "type" : "text",
            "areaid" : "subheader",
            "body" : "<div class=\"vish-parent-font3 vish-parent-font4\" style=\"text-align: right; font-weight: normal; \"><span class=\"vish-font3 vish-fontarial\"><span class=\"vish-font4 vish-fontHelvetica\" style=\"undefined;\"><span style=\"font-style: italic; font-family: helvetica;\">by Aldo Gordillo&nbsp; </span></span><br></span></div>"
          }]
        }, {
          'id'       :'2',
          'template' :'t2',
          'elements':[
            {
                        'id'     : '325',
              'type'   : 'text',
              'areaid' : 'header',
              'body'   : 'Experimento virtual1'
            },
            {
              'id'     : '7335',
              'type'   : 'object',
              'areaid' : 'left',
              'body'   : '<embed width="99%" height="99%" src="examples/contents/swf/virtualexperiment.swf" type="application/x-shockwave-flash"></embed>'
            }]
            }, {
          "id" : "3",
          "template" : "t6",
          "elements" : [{
            "id" : "zone6",
            "type" : "text",
            "areaid" : "header",
            "body" : "<div class=\"vish-parent-font3 vish-parent-font6 vish-parent-font4\" style=\"font-weight: normal; \"><span class=\"vish-font3 vish-fontHelvetica\" style=\"\"><span class=\"vish-font6 vish-fontHelvetica\" style=\"undefined;\"><span style=\"color: rgb(219, 150, 0);\">Iberian</span></span><span class=\"vish-font6 vish-fontHelvetica\" style=\"undefined;\"> </span><span class=\"vish-font6 vish-fontHelvetica\" style=\"undefined;\"><span style=\"color: rgb(32, 24, 21);\">Lynx</span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span class=\"vish-font4 vish-fontHelvetica\" style=\"undefined;\"><span style=\"color: rgb(113, 113, 117);\">Reproduction</span></span><br></span></div>"
          }, {
            "id" : "zone7",
            "type" : "image",
            "areaid" : "left",
            "body" : "http://i13.photobucket.com/albums/a288/inkslinger0611/drawings/Iberian.jpg",
            "style" : "position: relative; width:380.95238095238096%; height:218.69565217391303%; top:-36.231884541718856%; left:-58.201090494791664%;"
          }, {
            "id" : "zone8",
            "type" : "image",
            "areaid" : "center",
            "body" : "http://i13.photobucket.com/albums/a288/inkslinger0611/drawings/Iberian.jpg",
            "style" : "position: relative; width:357.14285714285717%; height:205.2173913043478%; top:-45.41062894074813%; left:-193.12174479166666%;"
          }, {
            "id" : "zone9",
            "type" : "text",
            "areaid" : "right",
            "body" : "<div class=\"vish-parent-font2\" style=\"text-align: center; font-weight: normal; \"><span class=\"vish-font2 vish-fontHelvetica\" style=\"\">During the mating season the female leaves her territory in search of a male. The typical gestation period is about two months; the cubs are born between March and September, with a peak of births in March and April. A litter consists of two or three (rarely one, four or five) kittens weighing between 200 and 250 grams (7.1 and 8.8 oz).The kittens become independent at seven to 10 months old, but remain with the mother until around 20 months old. Survival of the young depends heavily on the availability of prey species. In the wild, both males and females reach sexual maturity at one year old, though in practice they rarely breed until a territory becomes vacant; one female was known not to breed until five years old when its mother died.</span></div>"
          }]
        }]

        }]
      },
      {
        "id"      : "222",
        "title"     : "Curiosity",
        "description"   : "The Art of Learning, a journey in the pursuit of excellence.\nAmazing presentation with images, videos and 3d objects, generated by Vish Editor.",
        "avatar" : "/vishEditor/images/excursion_thumbnails/excursion-12.png",
        "author"    : "",
        "type"      : "flashcard", //flashcard, game, presentation, microscope, experiment, quiz
        "tags": ["Samples","Test","Development"],
        "author" : "",
        "theme"  : "theme1",
        "age_range" : "4 - 14",
        "subject" : "Media Education",
        "language" : "en",
        "educational_objectives" : "bla bla bla 3",
        "adquired_competencies" : "pupils will be smarter",
        "slides" : [
        {
          "id"      : "28",
          "type"      : "flashcard",
          "background"  : "url(http://images.freshnessmag.com/wp-content/uploads//2012/08/nasa-NASA-curiosity-mars-rover-00.jpg)",
          "pois": [{"id": "poi1",
                "x" : "11",
                "y" : "4.5",
                "slide_id": "1"},
               {"id": "poi2",
                "x" : "47",
                "y" : "34",
                "slide_id": "2"},
               {"id": "poi3",
                "x" : "84",
                "y" : "81",
                "slide_id": "3"}],
          "slides" : [{
          "id" : "1",
          "template" : "t1",
          "elements" : [{
            "id" : "zone1",
            "type" : "image",
            "areaid" : "left",
            "body" : "http://blogs.20minutos.es/cronicaverde/files/parque_nacional_donana_lince_iberico.jpg",
            "style" : "position: relative; width:97.82608695652173%; height:80.10752688172043%; top:0%; left:0%;"
          }, {
            "id" : "zone2",
            "type" : "text",
            "areaid" : "header",
            "body" : "<div class=\"vish-parent-font3 vish-parent-font6\" style=\"text-align: center; font-weight: normal; \"><span class=\"vish-font3 vish-fontarial\"><span class=\"vish-font6 vish-fontHelvetica\" style=\"undefined;\"><span style=\"font-family: helvetica;\"><span style=\"font-weight: bold;\">Chess</span>: The Art of Learning</span></span><br></span></div>"
          }, {
            "id" : "zone3",
            "type" : "text",
            "areaid" : "subheader",
            "body" : "<div class=\"vish-parent-font3 vish-parent-font4\" style=\"text-align: right; font-weight: normal; \"><span class=\"vish-font3 vish-fontarial\"><span class=\"vish-font4 vish-fontHelvetica\" style=\"undefined;\"><span style=\"font-style: italic; font-family: helvetica;\">by Aldo Gordillo&nbsp; </span></span><br></span></div>"
          }]
        }, {
          'id'       :'2',
          'template' :'t2',
          'elements':[
            {
                        'id'     : '325',
              'type'   : 'text',
              'areaid' : 'header',
              'body'   : 'Experimento virtual1'
            },
            {
              'id'     : '7335',
              'type'   : 'object',
              'areaid' : 'left',
              'body'   : '<embed width="99%" height="99%" src="examples/contents/swf/virtualexperiment.swf" type="application/x-shockwave-flash"></embed>'
            }]
            }, {
          "id" : "3",
          "template" : "t6",
          "elements" : [{
            "id" : "zone6",
            "type" : "text",
            "areaid" : "header",
            "body" : "<div class=\"vish-parent-font3 vish-parent-font6 vish-parent-font4\" style=\"font-weight: normal; \"><span class=\"vish-font3 vish-fontHelvetica\" style=\"\"><span class=\"vish-font6 vish-fontHelvetica\" style=\"undefined;\"><span style=\"color: rgb(219, 150, 0);\">Iberian</span></span><span class=\"vish-font6 vish-fontHelvetica\" style=\"undefined;\"> </span><span class=\"vish-font6 vish-fontHelvetica\" style=\"undefined;\"><span style=\"color: rgb(32, 24, 21);\">Lynx</span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span class=\"vish-font4 vish-fontHelvetica\" style=\"undefined;\"><span style=\"color: rgb(113, 113, 117);\">Reproduction</span></span><br></span></div>"
          }, {
            "id" : "zone7",
            "type" : "image",
            "areaid" : "left",
            "body" : "http://i13.photobucket.com/albums/a288/inkslinger0611/drawings/Iberian.jpg",
            "style" : "position: relative; width:380.95238095238096%; height:218.69565217391303%; top:-36.231884541718856%; left:-58.201090494791664%;"
          }, {
            "id" : "zone8",
            "type" : "image",
            "areaid" : "center",
            "body" : "http://i13.photobucket.com/albums/a288/inkslinger0611/drawings/Iberian.jpg",
            "style" : "position: relative; width:357.14285714285717%; height:205.2173913043478%; top:-45.41062894074813%; left:-193.12174479166666%;"
          }, {
            "id" : "zone9",
            "type" : "text",
            "areaid" : "right",
            "body" : "<div class=\"vish-parent-font2\" style=\"text-align: center; font-weight: normal; \"><span class=\"vish-font2 vish-fontHelvetica\" style=\"\">During the mating season the female leaves her territory in search of a male. The typical gestation period is about two months; the cubs are born between March and September, with a peak of births in March and April. A litter consists of two or three (rarely one, four or five) kittens weighing between 200 and 250 grams (7.1 and 8.8 oz).The kittens become independent at seven to 10 months old, but remain with the mother until around 20 months old. Survival of the young depends heavily on the availability of prey species. In the wild, both males and females reach sexual maturity at one year old, though in practice they rarely breed until a territory becomes vacant; one female was known not to breed until five years old when its mother died.</span></div>"
          }]
        }]

        }]
      },
      {
        "id"      : "333",
        "title"     : "fly",
        "description"   : "The Art of Learning, a journey in the pursuit of excellence.\nAmazing presentation with images, videos and 3d objects, generated by Vish Editor.",
        "avatar" : "/vishEditor/images/excursion_thumbnails/excursion-10.png",
        "author"    : "",
        "type"      : "flashcard", //flashcard, game, presentation, microscope, experiment, quiz
        "tags": ["Samples","Test","Development"],
        "author" : "",
        "theme"  : "theme1",
        "age_range" : "4 - 14",
        "subject" : "Media Education",
        "language" : "en",
        "educational_objectives" : "bla bla bla 3",
        "adquired_competencies" : "pupils will be smarter",
        "slides" : [
        {
          "id"      : "27",
          "type"      : "flashcard",
          "background"  : "url(http://1.bp.blogspot.com/_Y_4eV9-N0NY/SeToztTkalI/AAAAAAAAAe0/zpSf85grpW8/s400/small+fly.jpg)",
          "pois": [{"id": "poi1",
                "x" : "11",
                "y" : "4.5",
                "slide_id": "1"},
               {"id": "poi2",
                "x" : "47",
                "y" : "34",
                "slide_id": "2"},
               {"id": "poi3",
                "x" : "84",
                "y" : "81",
                "slide_id": "3"}],
          "slides" : [{
          "id" : "1",
          "template" : "t1",
          "elements" : [{
            "id" : "zone1",
            "type" : "image",
            "areaid" : "left",
            "body" : "http://blogs.20minutos.es/cronicaverde/files/parque_nacional_donana_lince_iberico.jpg",
            "style" : "position: relative; width:97.82608695652173%; height:80.10752688172043%; top:0%; left:0%;"
          }, {
            "id" : "zone2",
            "type" : "text",
            "areaid" : "header",
            "body" : "<div class=\"vish-parent-font3 vish-parent-font6\" style=\"text-align: center; font-weight: normal; \"><span class=\"vish-font3 vish-fontarial\"><span class=\"vish-font6 vish-fontHelvetica\" style=\"undefined;\"><span style=\"font-family: helvetica;\"><span style=\"font-weight: bold;\">Chess</span>: The Art of Learning</span></span><br></span></div>"
          }, {
            "id" : "zone3",
            "type" : "text",
            "areaid" : "subheader",
            "body" : "<div class=\"vish-parent-font3 vish-parent-font4\" style=\"text-align: right; font-weight: normal; \"><span class=\"vish-font3 vish-fontarial\"><span class=\"vish-font4 vish-fontHelvetica\" style=\"undefined;\"><span style=\"font-style: italic; font-family: helvetica;\">by Aldo Gordillo&nbsp; </span></span><br></span></div>"
          }]
        }, {
          'id'       :'2',
          'template' :'t2',
          'elements':[
            {
                        'id'     : '325',
              'type'   : 'text',
              'areaid' : 'header',
              'body'   : 'Experimento virtual1'
            },
            {
              'id'     : '7335',
              'type'   : 'object',
              'areaid' : 'left',
              'body'   : '<embed width="99%" height="99%" src="examples/contents/swf/virtualexperiment.swf" type="application/x-shockwave-flash"></embed>'
            }]
            }, {
          "id" : "3",
          "template" : "t6",
          "elements" : [{
            "id" : "zone6",
            "type" : "text",
            "areaid" : "header",
            "body" : "<div class=\"vish-parent-font3 vish-parent-font6 vish-parent-font4\" style=\"font-weight: normal; \"><span class=\"vish-font3 vish-fontHelvetica\" style=\"\"><span class=\"vish-font6 vish-fontHelvetica\" style=\"undefined;\"><span style=\"color: rgb(219, 150, 0);\">Iberian</span></span><span class=\"vish-font6 vish-fontHelvetica\" style=\"undefined;\"> </span><span class=\"vish-font6 vish-fontHelvetica\" style=\"undefined;\"><span style=\"color: rgb(32, 24, 21);\">Lynx</span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span class=\"vish-font4 vish-fontHelvetica\" style=\"undefined;\"><span style=\"color: rgb(113, 113, 117);\">Reproduction</span></span><br></span></div>"
          }, {
            "id" : "zone7",
            "type" : "image",
            "areaid" : "left",
            "body" : "http://i13.photobucket.com/albums/a288/inkslinger0611/drawings/Iberian.jpg",
            "style" : "position: relative; width:380.95238095238096%; height:218.69565217391303%; top:-36.231884541718856%; left:-58.201090494791664%;"
          }, {
            "id" : "zone8",
            "type" : "image",
            "areaid" : "center",
            "body" : "http://i13.photobucket.com/albums/a288/inkslinger0611/drawings/Iberian.jpg",
            "style" : "position: relative; width:357.14285714285717%; height:205.2173913043478%; top:-45.41062894074813%; left:-193.12174479166666%;"
          }, {
            "id" : "zone9",
            "type" : "text",
            "areaid" : "right",
            "body" : "<div class=\"vish-parent-font2\" style=\"text-align: center; font-weight: normal; \"><span class=\"vish-font2 vish-fontHelvetica\" style=\"\">During the mating season the female leaves her territory in search of a male. The typical gestation period is about two months; the cubs are born between March and September, with a peak of births in March and April. A litter consists of two or three (rarely one, four or five) kittens weighing between 200 and 250 grams (7.1 and 8.8 oz).The kittens become independent at seven to 10 months old, but remain with the mother until around 20 months old. Survival of the young depends heavily on the availability of prey species. In the wild, both males and females reach sexual maturity at one year old, though in practice they rarely breed until a territory becomes vacant; one female was known not to breed until five years old when its mother died.</span></div>"
          }]
        }]

        }]
      },
      {
        "id"      : "444",
        "title"     : "dogs",
        "description"   : "The Art of Learning, a journey in the pursuit of excellence.\nAmazing presentation with images, videos and 3d objects, generated by Vish Editor.",
        "avatar" : "/vishEditor/images/excursion_thumbnails/excursion-12.png",
        "author"    : "",
        "type"      : "flashcard", //flashcard, game, presentation, microscope, experiment, quiz
        "tags": ["Samples","Test","Development"],
        "author" : "",
        "theme"  : "theme1",
        "age_range" : "4 - 14",
        "subject" : "Media Education",
        "language" : "en",
        "educational_objectives" : "bla bla bla 3",
        "adquired_competencies" : "pupils will be smarter",
        "slides" : [
        {
          "id"      : "28",
          "type"      : "flashcard",
          "background"  : "url(http://images5.fanpop.com/image/photos/31900000/Doggie-3-all-small-dogs-31936880-500-348.jpg)",
          "pois": [{"id": "poi1",
                "x" : "11",
                "y" : "4.5",
                "slide_id": "1"},
               {"id": "poi2",
                "x" : "47",
                "y" : "34",
                "slide_id": "2"},
               {"id": "poi3",
                "x" : "84",
                "y" : "81",
                "slide_id": "3"}],
          "slides" : [{
          "id" : "1",
          "template" : "t1",
          "elements" : [{
            "id" : "zone1",
            "type" : "image",
            "areaid" : "left",
            "body" : "http://blogs.20minutos.es/cronicaverde/files/parque_nacional_donana_lince_iberico.jpg",
            "style" : "position: relative; width:97.82608695652173%; height:80.10752688172043%; top:0%; left:0%;"
          }, {
            "id" : "zone2",
            "type" : "text",
            "areaid" : "header",
            "body" : "<div class=\"vish-parent-font3 vish-parent-font6\" style=\"text-align: center; font-weight: normal; \"><span class=\"vish-font3 vish-fontarial\"><span class=\"vish-font6 vish-fontHelvetica\" style=\"undefined;\"><span style=\"font-family: helvetica;\"><span style=\"font-weight: bold;\">Chess</span>: The Art of Learning</span></span><br></span></div>"
          }, {
            "id" : "zone3",
            "type" : "text",
            "areaid" : "subheader",
            "body" : "<div class=\"vish-parent-font3 vish-parent-font4\" style=\"text-align: right; font-weight: normal; \"><span class=\"vish-font3 vish-fontarial\"><span class=\"vish-font4 vish-fontHelvetica\" style=\"undefined;\"><span style=\"font-style: italic; font-family: helvetica;\">by Aldo Gordillo&nbsp; </span></span><br></span></div>"
          }]
        }, {
          'id'       :'2',
          'template' :'t2',
          'elements':[
            {
                        'id'     : '325',
              'type'   : 'text',
              'areaid' : 'header',
              'body'   : 'Experimento virtual1'
            },
            {
              'id'     : '7335',
              'type'   : 'object',
              'areaid' : 'left',
              'body'   : '<embed width="99%" height="99%" src="examples/contents/swf/virtualexperiment.swf" type="application/x-shockwave-flash"></embed>'
            }]
            }, {
          "id" : "3",
          "template" : "t6",
          "elements" : [{
            "id" : "zone6",
            "type" : "text",
            "areaid" : "header",
            "body" : "<div class=\"vish-parent-font3 vish-parent-font6 vish-parent-font4\" style=\"font-weight: normal; \"><span class=\"vish-font3 vish-fontHelvetica\" style=\"\"><span class=\"vish-font6 vish-fontHelvetica\" style=\"undefined;\"><span style=\"color: rgb(219, 150, 0);\">Iberian</span></span><span class=\"vish-font6 vish-fontHelvetica\" style=\"undefined;\"> </span><span class=\"vish-font6 vish-fontHelvetica\" style=\"undefined;\"><span style=\"color: rgb(32, 24, 21);\">Lynx</span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span class=\"vish-font4 vish-fontHelvetica\" style=\"undefined;\"><span style=\"color: rgb(113, 113, 117);\">Reproduction</span></span><br></span></div>"
          }, {
            "id" : "zone7",
            "type" : "image",
            "areaid" : "left",
            "body" : "http://i13.photobucket.com/albums/a288/inkslinger0611/drawings/Iberian.jpg",
            "style" : "position: relative; width:380.95238095238096%; height:218.69565217391303%; top:-36.231884541718856%; left:-58.201090494791664%;"
          }, {
            "id" : "zone8",
            "type" : "image",
            "areaid" : "center",
            "body" : "http://i13.photobucket.com/albums/a288/inkslinger0611/drawings/Iberian.jpg",
            "style" : "position: relative; width:357.14285714285717%; height:205.2173913043478%; top:-45.41062894074813%; left:-193.12174479166666%;"
          }, {
            "id" : "zone9",
            "type" : "text",
            "areaid" : "right",
            "body" : "<div class=\"vish-parent-font2\" style=\"text-align: center; font-weight: normal; \"><span class=\"vish-font2 vish-fontHelvetica\" style=\"\">During the mating season the female leaves her territory in search of a male. The typical gestation period is about two months; the cubs are born between March and September, with a peak of births in March and April. A litter consists of two or three (rarely one, four or five) kittens weighing between 200 and 250 grams (7.1 and 8.8 oz).The kittens become independent at seven to 10 months old, but remain with the mother until around 20 months old. Survival of the young depends heavily on the availability of prey species. In the wild, both males and females reach sexual maturity at one year old, though in practice they rarely breed until a territory becomes vacant; one female was known not to breed until five years old when its mother died.</span></div>"
          }]
        }]

        }]
      },
      {
        "id"      : "555",
        "title"     : "cats",
        "description"   : "The Art of Learning, a journey in the pursuit of excellence.\nAmazing presentation with images, videos and 3d objects, generated by Vish Editor.",
        "avatar" : "/vishEditor/images/excursion_thumbnails/excursion-10.png",
        "author"    : "",
        "type"      : "flashcard", //flashcard, game, presentation, microscope, experiment, quiz
        "tags": ["Samples","Test","Development"],
        "author" : "",
        "theme"  : "theme1",
        "age_range" : "4 - 14",
        "subject" : "Media Education",
        "language" : "en",
        "educational_objectives" : "bla bla bla 3",
        "adquired_competencies" : "pupils will be smarter",
        "slides" : [
        {
          "id"      : "27",
          "type"      : "flashcard",
          "background"  : "url(http://25.media.tumblr.com/tumblr_m6utxcoA7y1qdortwo1_1280.jpg)",
          "pois": [{"id": "poi1",
                "x" : "11",
                "y" : "4.5",
                "slide_id": "1"},
               {"id": "poi2",
                "x" : "47",
                "y" : "34",
                "slide_id": "2"},
               {"id": "poi3",
                "x" : "84",
                "y" : "81",
                "slide_id": "3"}],
          "slides" : [{
          "id" : "1",
          "template" : "t1",
          "elements" : [{
            "id" : "zone1",
            "type" : "image",
            "areaid" : "left",
            "body" : "http://blogs.20minutos.es/cronicaverde/files/parque_nacional_donana_lince_iberico.jpg",
            "style" : "position: relative; width:97.82608695652173%; height:80.10752688172043%; top:0%; left:0%;"
          }, {
            "id" : "zone2",
            "type" : "text",
            "areaid" : "header",
            "body" : "<div class=\"vish-parent-font3 vish-parent-font6\" style=\"text-align: center; font-weight: normal; \"><span class=\"vish-font3 vish-fontarial\"><span class=\"vish-font6 vish-fontHelvetica\" style=\"undefined;\"><span style=\"font-family: helvetica;\"><span style=\"font-weight: bold;\">Chess</span>: The Art of Learning</span></span><br></span></div>"
          }, {
            "id" : "zone3",
            "type" : "text",
            "areaid" : "subheader",
            "body" : "<div class=\"vish-parent-font3 vish-parent-font4\" style=\"text-align: right; font-weight: normal; \"><span class=\"vish-font3 vish-fontarial\"><span class=\"vish-font4 vish-fontHelvetica\" style=\"undefined;\"><span style=\"font-style: italic; font-family: helvetica;\">by Aldo Gordillo&nbsp; </span></span><br></span></div>"
          }]
        }, {
          'id'       :'2',
          'template' :'t2',
          'elements':[
            {
                        'id'     : '325',
              'type'   : 'text',
              'areaid' : 'header',
              'body'   : 'Experimento virtual1'
            },
            {
              'id'     : '7335',
              'type'   : 'object',
              'areaid' : 'left',
              'body'   : '<embed width="99%" height="99%" src="examples/contents/swf/virtualexperiment.swf" type="application/x-shockwave-flash"></embed>'
            }]
            }, {
          "id" : "3",
          "template" : "t6",
          "elements" : [{
            "id" : "zone6",
            "type" : "text",
            "areaid" : "header",
            "body" : "<div class=\"vish-parent-font3 vish-parent-font6 vish-parent-font4\" style=\"font-weight: normal; \"><span class=\"vish-font3 vish-fontHelvetica\" style=\"\"><span class=\"vish-font6 vish-fontHelvetica\" style=\"undefined;\"><span style=\"color: rgb(219, 150, 0);\">Iberian</span></span><span class=\"vish-font6 vish-fontHelvetica\" style=\"undefined;\"> </span><span class=\"vish-font6 vish-fontHelvetica\" style=\"undefined;\"><span style=\"color: rgb(32, 24, 21);\">Lynx</span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span class=\"vish-font4 vish-fontHelvetica\" style=\"undefined;\"><span style=\"color: rgb(113, 113, 117);\">Reproduction</span></span><br></span></div>"
          }, {
            "id" : "zone7",
            "type" : "image",
            "areaid" : "left",
            "body" : "http://i13.photobucket.com/albums/a288/inkslinger0611/drawings/Iberian.jpg",
            "style" : "position: relative; width:380.95238095238096%; height:218.69565217391303%; top:-36.231884541718856%; left:-58.201090494791664%;"
          }, {
            "id" : "zone8",
            "type" : "image",
            "areaid" : "center",
            "body" : "http://i13.photobucket.com/albums/a288/inkslinger0611/drawings/Iberian.jpg",
            "style" : "position: relative; width:357.14285714285717%; height:205.2173913043478%; top:-45.41062894074813%; left:-193.12174479166666%;"
          }, {
            "id" : "zone9",
            "type" : "text",
            "areaid" : "right",
            "body" : "<div class=\"vish-parent-font2\" style=\"text-align: center; font-weight: normal; \"><span class=\"vish-font2 vish-fontHelvetica\" style=\"\">During the mating season the female leaves her territory in search of a male. The typical gestation period is about two months; the cubs are born between March and September, with a peak of births in March and April. A litter consists of two or three (rarely one, four or five) kittens weighing between 200 and 250 grams (7.1 and 8.8 oz).The kittens become independent at seven to 10 months old, but remain with the mother until around 20 months old. Survival of the young depends heavily on the availability of prey species. In the wild, both males and females reach sexual maturity at one year old, though in practice they rarely breed until a territory becomes vacant; one female was known not to breed until five years old when its mother died.</span></div>"
          }]
        }]

        }]
      },
      {
        "id"      : "666",
        "title"     : "nature",
        "description"   : "The Art of Learning, a journey in the pursuit of excellence.\nAmazing presentation with images, videos and 3d objects, generated by Vish Editor.",
        "avatar" : "/vishEditor/images/excursion_thumbnails/excursion-12.png",
        "author"    : "",
        "type"      : "flashcard", //flashcard, game, presentation, microscope, experiment, quiz
        "tags": ["Samples","Test","Development"],
        "author" : "",
        "theme"  : "theme1",
        "age_range" : "4 - 14",
        "subject" : "Media Education",
        "language" : "en",
        "educational_objectives" : "bla bla bla 3",
        "adquired_competencies" : "pupils will be smarter",
        "slides" : [
        {
          "id"      : "28",
          "type"      : "flashcard",
          "background"  : "url(http://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Bachalpseeflowers.jpg/300px-Bachalpseeflowers.jpg)",
          "pois": [{"id": "poi1",
                "x" : "11",
                "y" : "4.5",
                "slide_id": "1"},
               {"id": "poi2",
                "x" : "47",
                "y" : "34",
                "slide_id": "2"},
               {"id": "poi3",
                "x" : "84",
                "y" : "81",
                "slide_id": "3"}],
          "slides" : [{
          "id" : "1",
          "template" : "t1",
          "elements" : [{
            "id" : "zone1",
            "type" : "image",
            "areaid" : "left",
            "body" : "http://blogs.20minutos.es/cronicaverde/files/parque_nacional_donana_lince_iberico.jpg",
            "style" : "position: relative; width:97.82608695652173%; height:80.10752688172043%; top:0%; left:0%;"
          }, {
            "id" : "zone2",
            "type" : "text",
            "areaid" : "header",
            "body" : "<div class=\"vish-parent-font3 vish-parent-font6\" style=\"text-align: center; font-weight: normal; \"><span class=\"vish-font3 vish-fontarial\"><span class=\"vish-font6 vish-fontHelvetica\" style=\"undefined;\"><span style=\"font-family: helvetica;\"><span style=\"font-weight: bold;\">Chess</span>: The Art of Learning</span></span><br></span></div>"
          }, {
            "id" : "zone3",
            "type" : "text",
            "areaid" : "subheader",
            "body" : "<div class=\"vish-parent-font3 vish-parent-font4\" style=\"text-align: right; font-weight: normal; \"><span class=\"vish-font3 vish-fontarial\"><span class=\"vish-font4 vish-fontHelvetica\" style=\"undefined;\"><span style=\"font-style: italic; font-family: helvetica;\">by Aldo Gordillo&nbsp; </span></span><br></span></div>"
          }]
        }, {
          'id'       :'2',
          'template' :'t2',
          'elements':[
            {
                        'id'     : '325',
              'type'   : 'text',
              'areaid' : 'header',
              'body'   : 'Experimento virtual1'
            },
            {
              'id'     : '7335',
              'type'   : 'object',
              'areaid' : 'left',
              'body'   : '<embed width="99%" height="99%" src="examples/contents/swf/virtualexperiment.swf" type="application/x-shockwave-flash"></embed>'
            }]
            }, {
          "id" : "3",
          "template" : "t6",
          "elements" : [{
            "id" : "zone6",
            "type" : "text",
            "areaid" : "header",
            "body" : "<div class=\"vish-parent-font3 vish-parent-font6 vish-parent-font4\" style=\"font-weight: normal; \"><span class=\"vish-font3 vish-fontHelvetica\" style=\"\"><span class=\"vish-font6 vish-fontHelvetica\" style=\"undefined;\"><span style=\"color: rgb(219, 150, 0);\">Iberian</span></span><span class=\"vish-font6 vish-fontHelvetica\" style=\"undefined;\"> </span><span class=\"vish-font6 vish-fontHelvetica\" style=\"undefined;\"><span style=\"color: rgb(32, 24, 21);\">Lynx</span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span class=\"vish-font4 vish-fontHelvetica\" style=\"undefined;\"><span style=\"color: rgb(113, 113, 117);\">Reproduction</span></span><br></span></div>"
          }, {
            "id" : "zone7",
            "type" : "image",
            "areaid" : "left",
            "body" : "http://i13.photobucket.com/albums/a288/inkslinger0611/drawings/Iberian.jpg",
            "style" : "position: relative; width:380.95238095238096%; height:218.69565217391303%; top:-36.231884541718856%; left:-58.201090494791664%;"
          }, {
            "id" : "zone8",
            "type" : "image",
            "areaid" : "center",
            "body" : "http://i13.photobucket.com/albums/a288/inkslinger0611/drawings/Iberian.jpg",
            "style" : "position: relative; width:357.14285714285717%; height:205.2173913043478%; top:-45.41062894074813%; left:-193.12174479166666%;"
          }, {
            "id" : "zone9",
            "type" : "text",
            "areaid" : "right",
            "body" : "<div class=\"vish-parent-font2\" style=\"text-align: center; font-weight: normal; \"><span class=\"vish-font2 vish-fontHelvetica\" style=\"\">During the mating season the female leaves her territory in search of a male. The typical gestation period is about two months; the cubs are born between March and September, with a peak of births in March and April. A litter consists of two or three (rarely one, four or five) kittens weighing between 200 and 250 grams (7.1 and 8.8 oz).The kittens become independent at seven to 10 months old, but remain with the mother until around 20 months old. Survival of the young depends heavily on the availability of prey species. In the wild, both males and females reach sexual maturity at one year old, though in practice they rarely breed until a territory becomes vacant; one female was known not to breed until five years old when its mother died.</span></div>"
          }]
        }]

        }]
      }


    ]};

	var imageList = {
		'pictures': [
		{
			"id":54,
			"title":"ClintEastwood.jpg",
			"description":null,
			"author":"Demo",
			"src":"http://www.dan-dare.org/dan%20simpsons/TheSimpsonsEveryoneEver800.jpg"
		},
		{
      "id":55,
      "title":"ClintEastwood.jpg",
      "description":null,
      "author":"Demo",
      "src":"http://3.bp.blogspot.com/--H0o8mc28bA/TxrsnMAFMDI/AAAAAAAAARs/eOCVIXKlm9I/s1600/sala-cine.jpg"
    },
		{
      "id":56,
      "title":"ClintEastwood.jpg",
      "description":null,
      "author":"Demo",
      "src":"http://www.deviantart.com/download/46036660/The_Simpsonzu_by_spacecoyote.jpg"
    },
		{
      "id":57,
      "title":"ClintEastwood.jpg",
      "description":null,
      "author":"Demo",
      "src":"http://www.granadablogs.com/pateandoelmundo/wp-content/uploads/2009/10/_061.jpg"
    },
		{
      "id":58,
      "title":"ClintEastwood.jpg",
      "description":null,
      "author":"Demo",
      "src":"http://www.revistaintime.com/wp-content/uploads/2012/03/el-padrino-2.jpg"
    },
		{
      "id":59,
      "title":"ClintEastwood.jpg",
      "description":null,
      "author":"Demo",
      "src":"http://cinealdesnudo.files.wordpress.com/2011/12/el-indomable-will-hunting.jpg"
    },
		{
      "id":60,
      "title":"ClintEastwood.jpg",
      "description":null,
      "author":"Demo",
      "src":"http://politicamenteconservador.blogia.com/upload/20060818041914-el-senor-de-los-anillos2.jpg"
    },
		{
      "id":61,
      "title":"ClintEastwood.jpg",
      "description":null,
      "author":"Demo",
      "src":"http://despertando.me/wp-content/uploads/2012/04/el-se%C3%B1or-de-los-anillos.jpg"
    },
		{
      "id":62,
      "title":"ClintEastwood.jpg",
      "description":null,
      "author":"Demo",
      "src":"http://4.bp.blogspot.com/-Fh_v8PYbVg0/TyGdKEiYmKI/AAAAAAAAAPI/MKdfZ224aEQ/s1600/el_senor_de_los_anillos_la_batalla_por_la_tierra_media_2_the_rise_of_the_witchking-181035.jpg"
    },
		{
      "id":63,
      "title":"ClintEastwood.jpg",
      "description":null,
      "author":"Demo",
      "src":"http://1.bp.blogspot.com/_9PpLM82o3g0/S8uPONu3kaI/AAAAAAAAC9A/thHNALuFxdE/s1600/Gandalf-vs-El-Balrog-gandalf-7018563-1280-960.jpg"
    },
		{
      "id":64,
      "title":"ClintEastwood.jpg",
      "description":null,
      "author":"Demo",
      "src":"NOVAACARGAR"
    },
		{
      "id":65,
      "title":"ClintEastwood.jpg",
      "description":null,
      "author":"Demo",
      "src":"http://www.deviantart.com/download/46036660/The_Simpsonzu_by_spacecoyote.jpg"
    },
		{
      "id":66,
      "title":"ClintEastwood.jpg",
      "description":null,
      "author":"Demo",
      "src":"http://www.deviantart.com/download/46036660/The_Simpsonzu_by_spacecoyote.jpg"
    },
		{
      "id":67,
      "title":"ClintEastwood.jpg",
      "description":null,
      "author":"Demo",
      "src":"http://www.deviantart.com/download/46036660/The_Simpsonzu_by_spacecoyote.jpg"
    },
		{
      "id":68,
      "title":"ClintEastwood.jpg",
      "description":null,
      "author":"Demo",
      "src":"http://www.deviantart.com/download/46036660/The_Simpsonzu_by_spacecoyote.jpg"
    },
		{
			"id":69,
			"title":"ClintEastwoooood.jpg",
			"description": "this is clint",
			"author":"Demo",
			"src":"http://upload.wikimedia.org/wikipedia/en/4/47/Simpsons_on_Tracey_Ullman.png"
		}
		]
	};
	
	var imageListLittle = {
    'pictures': [
    {
      "id":54,
      "title":"ClintEastwood.jpg",
      "description":null,
      "author":"Demo",
      "src":"http://www.dan-dare.org/dan%20simpsons/TheSimpsonsEveryoneEver800.jpg"
    },
    {
      "id":55,
      "title":"ClintEastwood.jpg",
      "description":null,
      "author":"Demo",
      "src":"http://3.bp.blogspot.com/--H0o8mc28bA/TxrsnMAFMDI/AAAAAAAAARs/eOCVIXKlm9I/s1600/sala-cine.jpg"
    },
    {
      "id":56,
      "title":"ClintEastwood.jpg",
      "description":null,
      "author":"Demo",
      "src":"http://www.deviantart.com/download/46036660/The_Simpsonzu_by_spacecoyote.jpg"
    }
    ]
  };
	
	
	 var imageListDummy = {
    'pictures': []
  };
	
	
	var video = {
      'id'     : '1534',
      'title'         :  'Midnight Sun',
      'description'   :  'Awesome HTML5 video example',
      'author'        :  'John Doe',
      'poster' : "http://d1p69vb2iuddhr.cloudfront.net/assets/www/demo/midnight_sun_800-e460322294501e1d5db9ab3859dd859a.jpg",
      'sources': '['                                                                                                         +
                    '{ "type": "video/webm", "src": "http://media.jilion.com/videos/demo/midnight_sun_sv1_720p.webm"},'  + 
                    '{ "type": "video/mp4",  "src": "http://media.jilion.com/videos/demo/midnight_sun_sv1_360p.mp4" }'   +
                 ']'
    };
    
  var videoList = {
    'videos'        : [
    {
      'id'     : '1534',
      'title'         :  'HTML5 Demo',
      'description'   :  'HTML5 (HyperText Markup Language, version 5) es la quinta revision importante del lenguaje basico de la World Wide Web, HTML. HTML5 especifica dos variantes de sintaxis para HTML: un clasico HTML (text/html), la variante conocida como HTML5 y una variante XHTML conocida como sintaxis XHTML5 que debera ser servida como XML (XHTML) (application/xhtml+xml).1 2 Esta es la primera vez que HTML y XHTML se han desarrollado en paralelo.',
      'author'        :  'Awesome Videos',
      'poster' : "http://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Sasso_lungo_da_passo_pordoi.jpg/250px-Sasso_lungo_da_passo_pordoi.jpg",
      'sources': '['                                                                                                         +
                    '{ "type": "video/webm", "src": "http://media.jilion.com/videos/demo/midnight_sun_sv1_720p.webm"},'  + 
                    '{ "type": "video/mp4",  "src": "http://media.jilion.com/videos/demo/midnight_sun_sv1_360p.mp4" }'   +
                 ']'
    },
    {
      'id'     : '1535',
      'title'         :  'Paisaje bonito',
      'description'   :  'Awesome HTML5 video example',
      'author'        :  'Aldo Gordillo',
      'poster' : "http://d1p69vb2iuddhr.cloudfront.net/assets/www/demo/midnight_sun_800-e460322294501e1d5db9ab3859dd859a.jpg",
      'sources': '['                                                                                                         +
                    '{ "type": "video/webm", "src": "http://media.jilion.com/videos/demo/midnight_sun_sv1_720p.webm"},'  + 
                    '{ "type": "video/mp4",  "src": "http://media.jilion.com/videos/demo/midnight_sun_sv1_360p.mp4" }'   +
                 ']'
    },
    {
      'id'     : '1536',
      'title'         :  'Otro paisaje bonito',
      'description'   :  'Awesome HTML5 video example',
      'author'        :  'Aldo Gordillo',
      'poster' : "http://1.bp.blogspot.com/-DFj9INluj80/TfiNl7q3DbI/AAAAAAAAAws/hVJu13VbKEY/s1600/paisaje.jpg",
      'sources': '['                                                                                                         +
                    '{ "type": "video/webm", "src": "http://media.jilion.com/videos/demo/midnight_sun_sv1_720p.webm"},'  + 
                    '{ "type": "video/mp4",  "src": "http://media.jilion.com/videos/demo/midnight_sun_sv1_360p.mp4" }'   +
                 ']'
    },
    {
      'id'     : '1537',
      'title'         :  'Verde',
      'description'   :  'Awesome HTML5 video example',
      'author'        :  'Aldo Gordillo',
      'poster' : "http://www.forodefotos.com/attachments/naturaleza/12983d1281113830-fotos-de-paisaje-fotos-de-paisaje.jpg",
      'sources': '['                                                                                                         +
                    '{ "type": "video/webm", "src": "http://media.jilion.com/videos/demo/midnight_sun_sv1_720p.webm"},'  + 
                    '{ "type": "video/mp4",  "src": "http://media.jilion.com/videos/demo/midnight_sun_sv1_360p.mp4" }'   +
                 ']'
    },
    {
      'id'     : '1538',
      'title'         :  'Noche',
      'description'   :  'Awesome HTML5 video example',
      'author'        :  'Aldo Gordillo',
      'poster' : "http://ro18.blogspot.es/img/paisaje.jpg",
      'sources': '['                                                                                                         +
                    '{ "type": "video/webm", "src": "http://media.jilion.com/videos/demo/midnight_sun_sv1_720p.webm"},'  + 
                    '{ "type": "video/mp4",  "src": "http://media.jilion.com/videos/demo/midnight_sun_sv1_360p.mp4" }'   +
                 ']'
    },
    {
      'id'     : '1539',
      'title'         :  'Puesta de sol',
      'description'   :  'Awesome HTML5 video example',
      'author'        :  'Aldo Gordillo',
      'poster' : "http://walpaper.es/images/wallpapers/Paisaje-fotografia-HDR-656343.jpeg",
      'sources': '['                                                                                                         +
                    '{ "type": "video/webm", "src": "http://media.jilion.com/videos/demo/midnight_sun_sv1_720p.webm"},'  + 
                    '{ "type": "video/mp4",  "src": "http://media.jilion.com/videos/demo/midnight_sun_sv1_360p.mp4" }'   +
                 ']'
    },
    {
      'id'     : '1540',
      'title'         :  'Cayuco',
      'description'   :  'Awesome HTML5 video example',
      'author'        :  'Aldo Gordillo',
      'poster' : "http://3.bp.blogspot.com/-a-WrZZf0WJo/TsEBPXjUQXI/AAAAAAAAFBg/kh0aS9Kemag/s1600/PAISAJE+JUANMA.jpg",
      'sources': '['                                                                                                         +
                    '{ "type": "video/webm", "src": "http://media.jilion.com/videos/demo/midnight_sun_sv1_720p.webm"},'  + 
                    '{ "type": "video/mp4",  "src": "http://media.jilion.com/videos/demo/midnight_sun_sv1_360p.mp4" }'   +
                 ']'
    },
    {
      'id'     : '1541',
      'title'         :  'Aves',
      'description'   :  'Awesome HTML5 video example',
      'author'        :  'Aldo Gordillo',
      'poster' : "http://images.artelista.com/artelista/obras/fichas/8/3/3/8619208014133041.JPG",
      'sources': '['                                                                                                         +
                    '{ "type": "video/webm", "src": "http://media.jilion.com/videos/demo/midnight_sun_sv1_720p.webm"},'  + 
                    '{ "type": "video/mp4",  "src": "http://media.jilion.com/videos/demo/midnight_sun_sv1_360p.mp4" }'   +
                 ']'
    },
    {
      'id'     : '1542',
      'title'         :  'Delfines',
      'description'   :  'Awesome HTML5 video example',
      'author'        :  'Aldo Gordillo',
      'poster' : "http://4.bp.blogspot.com/-CfZKEdXcXtg/TijG57sIFWI/AAAAAAAAARQ/O8FP1OQ0a0w/s1600/delfines-saltando.jpg",
      'sources': '['                                                                                                         +
                    '{ "type": "video/webm", "src": "http://media.jilion.com/videos/demo/midnight_sun_sv1_720p.webm"},'  + 
                    '{ "type": "video/mp4",  "src": "http://media.jilion.com/videos/demo/midnight_sun_sv1_360p.mp4" }'   +
                 ']'
    },
    {
      'id'     : '1543',
      'title'         :  'Gato',
      'description'   :  'Awesome HTML5 video example',
      'author'        :  'Aldo Gordillo',
      'poster' : "http://www.10puntos.com/wp-content/uploads/2010/09/gato-lindo.jpg",
      'sources': '['                                                                                                         +
                    '{ "type": "video/webm", "src": "http://media.jilion.com/videos/demo/midnight_sun_sv1_720p.webm"},'  + 
                    '{ "type": "video/mp4",  "src": "http://media.jilion.com/videos/demo/midnight_sun_sv1_360p.mp4" }'   +
                 ']'
    },
    {
      'id'     : '1544',
      'title'         :  'Otro gato',
      'description'   :  'Awesome HTML5 video example',
      'author'        :  'Aldo Gordillo',
      'poster' : "http://neko.koiora.net/files/2011/06/Gato17.jpg",
      'sources': '['                                                                                                         +
                    '{ "type": "video/webm", "src": "http://media.jilion.com/videos/demo/midnight_sun_sv1_720p.webm"},'  + 
                    '{ "type": "video/mp4",  "src": "http://media.jilion.com/videos/demo/midnight_sun_sv1_360p.mp4" }'   +
                 ']'
    },
    {
      'id'     : '1545',
      'title'         :  'Gato ninja',
      'description'   :  'Awesome HTML5 video example',
      'author'        :  'Aldo Gordillo',
      'poster' : "http://www.sarda.es/fotos/gato_volador/gato_volador.jpg",
      'sources': '['                                                                                                         +
                    '{ "type": "video/webm", "src": "http://media.jilion.com/videos/demo/midnight_sun_sv1_720p.webm"},'  + 
                    '{ "type": "video/mp4",  "src": "http://media.jilion.com/videos/demo/midnight_sun_sv1_360p.mp4" }'   +
                 ']'
    }
    ]};
		
		
	var videoListLittle = {
    'videos'        : [
    {
      'id'     : '1534',
      'title'         :  'HTML5 Demo',
      'description'   :  'HTML5 (HyperText Markup Language, version 5) es la quinta revision importante del lenguaje basico de la World Wide Web, HTML. HTML5 especifica dos variantes de sintaxis para HTML: un clasico HTML (text/html), la variante conocida como HTML5 y una variante XHTML conocida como sintaxis XHTML5 que debera ser servida como XML (XHTML) (application/xhtml+xml).1 2 Esta es la primera vez que HTML y XHTML se han desarrollado en paralelo.',
      'author'        :  'Awesome Videos',
      'poster' : "http://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Sasso_lungo_da_passo_pordoi.jpg/250px-Sasso_lungo_da_passo_pordoi.jpg",
      'sources': '['                                                                                                         +
                    '{ "type": "video/webm", "src": "http://media.jilion.com/videos/demo/midnight_sun_sv1_720p.webm"},'  + 
                    '{ "type": "video/mp4",  "src": "http://media.jilion.com/videos/demo/midnight_sun_sv1_360p.mp4" }'   +
                 ']'
    },
    {
      'id'     : '1535',
      'title'         :  'Paisaje bonito',
      'description'   :  'Awesome HTML5 video example',
      'author'        :  'Aldo Gordillo',
      'poster' : "http://d1p69vb2iuddhr.cloudfront.net/assets/www/demo/midnight_sun_800-e460322294501e1d5db9ab3859dd859a.jpg",
      'sources': '['                                                                                                         +
                    '{ "type": "video/webm", "src": "http://media.jilion.com/videos/demo/midnight_sun_sv1_720p.webm"},'  + 
                    '{ "type": "video/mp4",  "src": "http://media.jilion.com/videos/demo/midnight_sun_sv1_360p.mp4" }'   +
                 ']'
    },
    {
      'id'     : '1536',
      'title'         :  'Otro paisaje bonito',
      'description'   :  'Awesome HTML5 video example',
      'author'        :  'Aldo Gordillo',
      'poster' : "http://1.bp.blogspot.com/-DFj9INluj80/TfiNl7q3DbI/AAAAAAAAAws/hVJu13VbKEY/s1600/paisaje.jpg",
      'sources': '['                                                                                                         +
                    '{ "type": "video/webm", "src": "http://media.jilion.com/videos/demo/midnight_sun_sv1_720p.webm"},'  + 
                    '{ "type": "video/mp4",  "src": "http://media.jilion.com/videos/demo/midnight_sun_sv1_360p.mp4" }'   +
                 ']'
    }
    ]};
		
		
	var videoListDummy = {
    'videos'        : []
	};	
    
		
  var flashList = {
    'flashes'       : [
    {
      'id'     : '1534',
      'title'         :  'Profe',
      'description'   :  'Flash Object Test',
      'author'        :  'FlashMan',
      'content'       :  '<embed width="100%" height="100%" id="player_api" src="examples/contents/swf/virtualexperiment.swf" type="application/x-shockwave-flash" wmode="opaque"></embed>'
    },
    {
        'id'     : '1535',
        'title'         :  'Youtube video about HTML5',
        'description'   :  'HTML5 (HyperText Markup Language, version 5) es la quinta revision importante del lenguaje basico de la World Wide Web, HTML.',
        'author'        :  'W3C',
        'content'       :  '<iframe width="560" height="315" src="http://www.youtube.com/embed/1hR7EtD6Bns?wmode=opaque" frameborder="0" allowfullscreen></iframe>'
    },
    {
        'id'     : '1536',
        'title'         :  'Global excursion',
        'description'   :  'Iframe example',
        'author'        :  'Vish',
        'content'       :  '<iframe width="100%" height="100%" src="http://www.globalexcursion-project.eu"></iframe>'
    },
    {
        'id'     : '1537',
        'title'         :  'Image',
        'description'   :  'Image Embed',
        'author'        :  'Globedia',
        'content'       :  '<embed width="100%" src="http://globedia.com/imagenes/noticias/2011/2/10/encuentran-octava-maravilla-mundo-destruida-125-anos_2_585286.jpg"></embed>'
    },
    {
        'id'     : '1538',
        'title'         :  'Profe Demo',
        'description'   :  'Flash Object Test 2',
        'author'        :  'FlashMan',
        'content'       :  '<embed width="100%" height="100%" id="player_api" src="examples/contents/swf/virtualexperiment.swf" type="application/x-shockwave-flash" wmode="opaque"></embed>'
    },
    {
        'id'     : '1539',
        'title'         :  'Profe Demo',
        'description'   :  'Flash Object Test 2',
        'author'        :  'FlashMan',
        'content'       :  '<embed width="100%" height="100%" id="player_api" src="examples/contents/swf/virtualexperiment.swf" type="application/x-shockwave-flash" wmode="opaque"></embed>'
    },
    {
        'id'     : '1540',
        'title'         :  'Profe Demo',
        'description'   :  'Flash Object Test 2',
        'author'        :  'FlashMan',
        'content'       :  '<embed width="100%" height="100%" id="player_api" src="examples/contents/swf/virtualexperiment.swf" type="application/x-shockwave-flash" wmode="opaque"></embed>'
    },
    {
        'id'     : '1541',
        'title'         :  'Profe Demo',
        'description'   :  'Flash Object Test 2',
        'author'        :  'FlashMan',
        'content'       :  '<embed width="100%" height="100%" id="player_api" src="examples/contents/swf/virtualexperiment.swf" type="application/x-shockwave-flash" wmode="opaque"></embed>'
    },
    {
        'id'     : '1542',
        'title'         :  'Profe Demo',
        'description'   :  'Flash Object Test 2',
        'author'        :  'FlashMan',
        'content'       :  '<embed width="100%" height="100%" id="player_api" src="examples/contents/swf/virtualexperiment.swf" type="application/x-shockwave-flash" wmode="opaque"></embed>'
    },
    {
        'id'     : '1543',
        'title'         :  'Youtube video',
        'description'   :  'Flash Object Test 2',
        'author'        :  'FlashMan',
        'content'       :  '<iframe width="560" height="315" src="http://www.youtube.com/embed/1hR7EtD6Bns" frameborder="0" allowfullscreen></iframe>'
    }
    ]};
    
		
		var flashListLittle = {
    'flashes'       : [
    {
      'id'     : '1534',
      'title'         :  'Profe',
      'description'   :  'Flash Object Test',
      'author'        :  'FlashMan',
      'content'       :  '<embed width="100%" height="100%" id="player_api" src="examples/contents/swf/virtualexperiment.swf" type="application/x-shockwave-flash" wmode="opaque"></embed>'
    },
    {
        'id'     : '1535',
        'title'         :  'Youtube video about HTML5',
        'description'   :  'HTML5 (HyperText Markup Language, version 5) es la quinta revision importante del lenguaje basico de la World Wide Web, HTML.',
        'author'        :  'W3C',
        'content'       :  '<iframe width="560" height="315" src="http://www.youtube.com/embed/1hR7EtD6Bns?wmode=opaque" frameborder="0" allowfullscreen></iframe>'
    },
    {
        'id'     : '1536',
        'title'         :  'Global excursion',
        'description'   :  'Iframe example',
        'author'        :  'Vish',
        'content'       :  '<iframe width="100%" height="100%" src="http://www.globalexcursion-project.eu"></iframe>'
    }
    ]};
		
		
	 var flashListDummy = {
    'flashes'       : []
	 };
	   
			 
   var liveList = [
    {
      'id'     : '1534',
      'title'         :  'Do\u00f1ana Test',
      'description'   :  'Parque Nacional de Do\u00f1ana (Spain) ',
      'author'        :  'Demo',
      'fulltext'       :  'http://www.youtube.com/watch?v=5TVrUFxzOk8'
    },
      {
      'id'     : '1535',
      'title'         :  'Do\u00f1ana Test',
      'description'   :  'Parque Nacional de Do\u00f1ana (Spain) ',
      'author'        :  'Demo',
      'fulltext'       :  'http://www.youtube.com/watch?v=5TVrUFxzOk8'
    },
		  {
      'id'     : '1536',
      'title'         :  'Do\u00f1ana Test',
      'description'   :  'Parque Nacional de Do\u00f1ana (Spain) ',
      'author'        :  'Demo',
      'fulltext'       :  'http://www.youtube.com/watch?v=5TVrUFxzOk8'
    },
		  {
      'id'     : '1537',
      'title'         :  'Do\u00f1ana Test',
      'description'   :  'Parque Nacional de Do\u00f1ana (Spain) ',
      'author'        :  'Demo',
      'fulltext'       :  'http://www.youtube.com/watch?v=5TVrUFxzOk8'
    },
		  {
      'id'     : '1538',
      'title'         :  'Do\u00f1ana Test',
      'description'   :  'Parque Nacional de Do\u00f1ana (Spain) ',
      'author'        :  'Demo',
      'fulltext'       :  'http://www.youtube.com/watch?v=5TVrUFxzOk8'
    },
		  {
      'id'     : '1539',
      'title'         :  'Do\u00f1ana Test',
      'description'   :  'Parque Nacional de Do\u00f1ana (Spain) ',
      'author'        :  'Demo',
      'fulltext'       :  'http://www.youtube.com/watch?v=5TVrUFxzOk8'
    },
		  {
      'id'     : '1540',
      'title'         :  'Do\u00f1ana Test',
      'description'   :  'Parque Nacional de Do\u00f1ana (Spain) ',
      'author'        :  'Demo',
      'fulltext'       :  'http://www.youtube.com/watch?v=5TVrUFxzOk8'
    },
		  {
      'id'     : '1541',
      'title'         :  'Do\u00f1ana Test',
      'description'   :  'Parque Nacional de Do\u00f1ana (Spain) ',
      'author'        :  'Demo',
      'fulltext'       :  'http://www.youtube.com/watch?v=5TVrUFxzOk8'
    },
		  {
      'id'     : '1542',
      'title'         :  'Do\u00f1ana Test',
      'description'   :  'Parque Nacional de Do\u00f1ana (Spain) ',
      'author'        :  'Demo',
      'fulltext'       :  'http://www.youtube.com/watch?v=5TVrUFxzOk8'
    },
		  {
      'id'     : '1543',
      'title'         :  'Do\u00f1ana Test',
      'description'   :  'Parque Nacional de Do\u00f1ana (Spain) ',
      'author'        :  'Demo',
      'fulltext'       :  'http://www.youtube.com/watch?v=5TVrUFxzOk8'
    },
		  {
      'id'     : '1544',
      'title'         :  'Do\u00f1ana Test',
      'description'   :  'Parque Nacional de Do\u00f1ana (Spain) ',
      'author'        :  'Demo',
      'fulltext'       :  'http://www.youtube.com/watch?v=5TVrUFxzOk8'
    },
		  {
      'id'     : '1545',
      'title'         :  'Do\u00f1ana Test',
      'description'   :  'Parque Nacional de Do\u00f1ana (Spain) ',
      'author'        :  'Demo',
      'fulltext'       :  'http://www.youtube.com/watch?v=5TVrUFxzOk8'
    },
		  {
      'id'     : '1546',
      'title'         :  'Do\u00f1ana Test',
      'description'   :  'Parque Nacional de Do\u00f1ana (Spain) ',
      'author'        :  'Demo',
      'fulltext'       :  'http://www.youtube.com/watch?v=5TVrUFxzOk8'
    },
		  {
      'id'     : '1547',
      'title'         :  'Do\u00f1ana Test',
      'description'   :  'Parque Nacional de Do\u00f1ana (Spain) ',
      'author'        :  'Demo',
      'fulltext'       :  'http://www.youtube.com/watch?v=5TVrUFxzOk8'
    },
		  {
      'id'     : '1548',
      'title'         :  'Do\u00f1ana Test',
      'description'   :  'Parque Nacional de Do\u00f1ana (Spain) ',
      'author'        :  'Demo',
      'fulltext'       :  'http://www.youtube.com/watch?v=5TVrUFxzOk8'
    }
    ];
    
    
    var liveListLittle = [
    {
      'id'     : '1534',
      'title'         :  'Do\u00f1ana Test',
      'description'   :  'Parque Nacional de Do\u00f1ana (Spain) ',
      'author'        :  'Demo',
      'fulltext'       :  'http://www.youtube.com/watch?v=5TVrUFxzOk8'
    },
    {
      'id'     : '1535',
      'title'         :  'Do\u00f1ana Test',
      'description'   :  'Parque Nacional de Do\u00f1ana (Spain) ',
      'author'        :  'Demo',
      'fulltext'       :  'http://www.youtube.com/watch?v=5TVrUFxzOk8'
    },
    {
      'id'     : '1548',
      'title'         :  'Do\u00f1ana Test',
      'description'   :  'Parque Nacional de Do\u00f1ana (Spain) ',
      'author'        :  'Demo',
      'fulltext'       :  'http://www.youtube.com/watch?v=5TVrUFxzOk8'
    }
    ];
    
    
   var liveListDummy = [];
	 

	 var objectList = [
    {
      'id'     : '1534',
      'title'         :  'Game Strauss',
      'description'   :  'Fichero PDF',
      'author'        :  'Conspirazzi',
      'object'        :  'http://www.conspirazzi.com/e-books/game-strauss.pdf'
    },
		{
      'id'     : '1536',
      'title'         :  'Profe',
      'description'   :  'Flash Object Test',
      'author'        :  'FlashMan',
      'object'       :  '<embed width="100%" height="100%" id="player_api" src="examples/contents/swf/virtualexperiment.swf" type="application/x-shockwave-flash" wmode="opaque"></embed>'
    },
    {
        'id'     : '1537',
        'title'         :  'Youtube video about HTML5',
        'description'   :  'HTML5 (HyperText Markup Language, version 5) es la quinta revision importante del lenguaje basico de la World Wide Web, HTML.',
        'author'        :  'W3C',
        'object'       :  '<iframe width="560" height="315" src="http://www.youtube.com/embed/1hR7EtD6Bns?wmode=opaque" frameborder="0" allowfullscreen></iframe>'
    },
    {
        'id'     : '1538',
        'title'         :  'Global excursion',
        'description'   :  'Iframe example',
        'author'        :  'Vish',
        'object'       :  '<iframe width="100%" height="100%" src="http://www.globalexcursion-project.eu"></iframe>'
    },
    {
        'id'     : '1539',
        'title'         :  'Image',
        'description'   :  'Image Embed',
        'author'        :  'Globedia',
        'object'       :  '<embed width="100%" src="http://globedia.com/imagenes/noticias/2011/2/10/encuentran-octava-maravilla-mundo-destruida-125-anos_2_585286.jpg"></embed>'
    },
    {
        'id'     : '1540',
        'title'         :  'Profe Demo',
        'description'   :  'Flash Object Test 2',
        'author'        :  'FlashMan',
        'object'       :  '<embed width="100%" height="100%" id="player_api" src="examples/contents/swf/virtualexperiment.swf" type="application/x-shockwave-flash" wmode="opaque"></embed>'
    }
    ];
	 
	 var objectListLittle = [
    {
      'id'     : '1534',
      'title'         :  'Game Strauss',
      'description'   :  'Fichero PDF',
      'author'        :  'Conspirazzi',
      'object'       :  'http://www.conspirazzi.com/e-books/game-strauss.pdf'
    },
    {
      'id'     : '1536',
      'title'         :  'Profe',
      'description'   :  'Flash Object Test',
      'author'        :  'FlashMan',
      'object'       :  '<embed width="100%" height="100%" id="player_api" src="examples/contents/swf/virtualexperiment.swf" type="application/x-shockwave-flash" wmode="opaque"></embed>'
    },
    {
        'id'     : '1537',
        'title'         :  'Youtube video about HTML5',
        'description'   :  'HTML5 (HyperText Markup Language, version 5) es la quinta revision importante del lenguaje basico de la World Wide Web, HTML.',
        'author'        :  'W3C',
        'object'       :  '<iframe width="560" height="315" src="http://www.youtube.com/embed/1hR7EtD6Bns?wmode=opaque" frameborder="0" allowfullscreen></iframe>'
    }
    ];
    
    
   var objectListDummy = [];
	 
	 var tagsList = {
   	'tags': ["ActionScript","AppleScript","Asp","BASIC","C","C++","Clojure","COBOL","ColdFusion","Erlang",
		"Fortran","Groovy","Haskell","Java","JavaScript","Lisp","Perl","PHP","Python","Ruby","Scala","Scheme"]
   };

   var thumbnailsList =
     {
      "pictures"        : [
        { "title" : "Thumbnail 1",    "description" : "Sample excursion thumbnail 1",    "src" : "/vishEditor/images/excursion_thumbnails/excursion-01.png" },
        { "title" : "Thumbnail 2",    "description" : "Sample excursion thumbnail 2",    "src" : "/vishEditor/images/excursion_thumbnails/excursion-02.png" },
        { "title" : "Thumbnail 3",    "description" : "Sample excursion thumbnail 3",    "src" : "/vishEditor/images/excursion_thumbnails/excursion-03.png" },
        { "title" : "Thumbnail 4",    "description" : "Sample excursion thumbnail 4",    "src" : "/vishEditor/images/excursion_thumbnails/excursion-04.png" },
        { "title" : "Thumbnail 5",    "description" : "Sample excursion thumbnail 5",    "src" : "/vishEditor/images/excursion_thumbnails/excursion-05.png" },
        { "title" : "Thumbnail 6",    "description" : "Sample excursion thumbnail 6",    "src" : "/vishEditor/images/excursion_thumbnails/excursion-06.png" },
        { "title" : "Thumbnail 7",    "description" : "Sample excursion thumbnail 7",    "src" : "/vishEditor/images/excursion_thumbnails/excursion-07.png" },
        { "title" : "Thumbnail 8",    "description" : "Sample excursion thumbnail 8",    "src" : "/vishEditor/images/excursion_thumbnails/excursion-08.png" },
        { "title" : "Thumbnail 9",    "description" : "Sample excursion thumbnail 9",    "src" : "/vishEditor/images/excursion_thumbnails/excursion-09.png" },
        { "title" : "Thumbnail 10",   "description" : "Sample excursion thumbnail 10",   "src" : "/vishEditor/images/excursion_thumbnails/excursion-10.png" },
        { "title" : "Thumbnail 11",   "description" : "Sample excursion thumbnail 11",   "src" : "/vishEditor/images/excursion_thumbnails/excursion-11.png" },
        { "title" : "Thumbnail 12",   "description" : "Sample excursion thumbnail 12",   "src" : "/vishEditor/images/excursion_thumbnails/excursion-12.png" },
        { "title" : "Thumbnail 13",   "description" : "Sample excursion thumbnail 13",   "src" : "/vishEditor/images/excursion_thumbnails/excursion-13.png" },
        { "title" : "Thumbnail 14",   "description" : "Sample excursion thumbnail 14",   "src" : "/vishEditor/images/excursion_thumbnails/excursion-14.png" },
        { "title" : "Thumbnail 15",   "description" : "Sample excursion thumbnail 15",   "src" : "/vishEditor/images/excursion_thumbnails/excursion-15.png" },
        { "title" : "Thumbnail 16",   "description" : "Sample excursion thumbnail 16",   "src" : "/vishEditor/images/excursion_thumbnails/excursion-16.png" },
        { "title" : "Thumbnail 17",   "description" : "Sample excursion thumbnail 17",   "src" : "/vishEditor/images/excursion_thumbnails/excursion-17.png" },
        { "title" : "Thumbnail 18",   "description" : "Sample excursion thumbnail 18",   "src" : "/vishEditor/images/excursion_thumbnails/excursion-18.png" },
        { "title" : "Thumbnail 19",   "description" : "Sample excursion thumbnail 19",   "src" : "/vishEditor/images/excursion_thumbnails/excursion-19.png" },
        { "title" : "Thumbnail 20",   "description" : "Sample excursion thumbnail 20",   "src" : "/vishEditor/images/excursion_thumbnails/excursion-20.png" },
        { "title" : "Thumbnail 21",   "description" : "Sample excursion thumbnail 21",   "src" : "/vishEditor/images/excursion_thumbnails/excursion-21.png" },
        { "title" : "Thumbnail 22",   "description" : "Sample excursion thumbnail 22",   "src" : "/vishEditor/images/excursion_thumbnails/excursion-22.png" },
        { "title" : "Thumbnail 23",   "description" : "Sample excursion thumbnail 23",   "src" : "/vishEditor/images/excursion_thumbnails/excursion-23.png" },
        { "title" : "Thumbnail 24",   "description" : "Sample excursion thumbnail 24",   "src" : "/vishEditor/images/excursion_thumbnails/excursion-24.png" },
        { "title" : "Thumbnail 25",   "description" : "Sample excursion thumbnail 25",   "src" : "/vishEditor/images/excursion_thumbnails/excursion-25.png" },
        { "title" : "Thumbnail 26",   "description" : "Sample excursion thumbnail 26",   "src" : "/vishEditor/images/excursion_thumbnails/excursion-26.png" },
        { "title" : "Thumbnail 27",   "description" : "Sample excursion thumbnail 27",   "src" : "/vishEditor/images/excursion_thumbnails/excursion-27.png" },
        { "title" : "Thumbnail 28",   "description" : "Sample excursion thumbnail 28",   "src" : "/vishEditor/images/excursion_thumbnails/excursion-28.png" },
        { "title" : "Thumbnail 29",   "description" : "Sample excursion thumbnail 29",   "src" : "/vishEditor/images/excursion_thumbnails/excursion-29.png" },
        { "title" : "Thumbnail 30",   "description" : "Sample excursion thumbnail 30",   "src" : "/vishEditor/images/excursion_thumbnails/excursion-30.png" }
      ]
    };
                
		
	return {
    recommendationList  : recommendationList,
    flashcardList     : flashcardList,
		imageList         : imageList,
		imageListLittle   : imageListLittle,
		imageListDummy    : imageListDummy,
		videoList         : videoList,
		videoListLittle   : videoListLittle,
		videoListDummy    : videoListDummy,
		flashList         : flashList,
		flashListLittle   : flashListLittle,
		flashListDummy    : flashListDummy,
		liveList          : liveList,
    liveListLittle    : liveListLittle,
    liveListDummy     : liveListDummy,
		objectList        : objectList,
    objectListLittle  : objectListLittle,
    objectListDummy   : objectListDummy,
		tagsList          : tagsList,
    thumbnailsList    : thumbnailsList
	};

})(VISH);