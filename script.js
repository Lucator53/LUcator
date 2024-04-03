var map = L.map('map', {
    center: [14.25654,121.40538],
    zoom: 19,
    maxZoom: 20,
    minZoom: 17.4,
    doubleClickZoom: false,
    maxBounds: [
        [14.2588,121.4118],  // Northeast
        [14.2512,121.4000], // Southwest
    ],
});

var osmLayer = L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',{
    maxZoom: 20,
    minZoom: 16.5,
    attribution: "© OpenStreetMap Contributors. Tiles courtesy of Humanitarian OpenStreetMap Team",
    bounds: [
        [14.2512, 121.4000], // Southwest
        [14.2588, 121.4118]  // Northeast
]
}).addTo(map);

L.control.locate({
    position: 'bottomright',
    icon: 'fa fa-location-arrow',
    drawCircle: false,
    drawMarker: true,
    showPopup: true
}).addTo(map);
map.zoomControl.setPosition('bottomright');

var userLocationMarker;
    var draggableMarker;
    var routingControl;

    map.on('locationfound', function (e) {
        var userLocation = e.latlng;

        if (!userLocationMarker) {
            userLocationMarker = L.marker(userLocation).addTo(map);
        } else {
            userLocationMarker.setLatLng(userLocation);
        }

        if (!draggableMarker) {
            draggableMarker = L.marker(userLocation, {
                draggable: true
            }).addTo(map);
            
            draggableMarker.on('dragend', function(e) {
                updateRoutingWaypoints();
            });
        } else {
            draggableMarker.setLatLng(userLocation);
        }
        
        updateRoutingWaypoints();
    });

    function updateRoutingWaypoints() {
        if (routingControl) {
            var waypoints = [
                userLocationMarker.getLatLng(), 
                draggableMarker.getLatLng()
            ];
            
            routingControl.setWaypoints(waypoints);
        } else {
            routingControl = L.Routing.control({
                waypoints: [
                    userLocationMarker.getLatLng(), 
                    draggableMarker.getLatLng() 
                ],
                routeWhileDragging: false,
                show: true,
                GamepadButton: false
            }).addTo(map);
        }
    }

    function removeRoutingControl() {
        if (routingControl) {
            map.removeControl(routingControl);
            routingControl = null;
        }
        
        if (userLocationMarker) {
            map.removeLayer(userLocationMarker);
            userLocationMarker = null;
        }
        
        if (draggableMarker) {
            map.removeLayer(draggableMarker);
            draggableMarker = null;
        }
    }

    var removeRoutingButton = L.control({position: 'bottomright'});
    removeRoutingButton.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'remove-routing-button');
        div.innerHTML = `
        <style>
            #bul:hover{
                background-color:#929493;
                cursor:pointer;    
            }
        </style>
        <button id="bul" style="font-weight:bolder; width: 33px; background-color:white; border: solid rgba(74, 74, 74, 0.20) 1px; border-radius:10%; box-shadow: #949494 0.1px 0.1px 0.1px 1px;" onclick="removeRoutingControl()"><i class="fa-solid fa-xmark"></i></button>
        `;
        return div;
    };
    removeRoutingButton.addTo(map);


var allMarkers = [];
var allLabels = [];

function CustomMarker(map, latlng, iconUrl, popupSrc, iconSize, label) {

    var customMarkerIcon = L.icon({
        iconUrl: iconUrl,
        iconSize: iconSize
    });
    var customMarker = L.marker(latlng, { icon: customMarkerIcon }).addTo(map);
    
    var iframe = document.createElement('iframe');
        iframe.src = popupSrc;
        iframe.style.width = 'auto';
        iframe.style.height = '25rem';
        iframe.frameBorder = 0;
    
    var popupContent = L.popup({
        offset: [0, 1],
        maxWidth: "400px" 
    }).setContent(iframe);
    
    customMarker.bindPopup(popupContent);

    var labelIcon = L.divIcon({
        className: 'custom-marker-label',
        iconAnchor:[20, -18], 
        html: label 
    });

    L.marker(latlng, { icon: labelIcon }).addTo(map);
}
//!

//* SHS ROOMS

function SHSMarker(map, latlng, popupSrc, label) {

    var customMarkerIcon = L.icon({
        iconUrl: 'src/shs.png',
        iconSize: [20,20],
    });
    var customMarker = L.marker(latlng, { icon: customMarkerIcon }).addTo(map);
    
    var iframe = document.createElement('iframe');
        iframe.src = popupSrc;
        iframe.style.width = 'auto';
        iframe.style.height = '25rem';
        iframe.frameBorder = 0;

    var popupContent = L.popup({
        offset: [0, 1],
        maxWidth: "400px" 
    }).setContent(iframe);
    
    customMarker.bindPopup(popupContent);

    var labelIcon = L.divIcon({
        className: 'custom-marker-label',
        iconAnchor:[10, -10], 
        html: label 
    });

    var labelicon = L.marker(latlng, { icon: labelIcon }).addTo(map);
    
    labelicon.isSHSL = true;
    customMarker.isSHS = true;


    allMarkers.push(customMarker);
    allLabels.push(labelicon);
}

//LU Buildings
function lublg(map, latlng, iconUrl, popupSrc, iconSize, label) {

    var customMarkerIcon = L.icon({
        iconUrl: iconUrl,
        iconSize: iconSize
    });
    var customMarker = L.marker(latlng, { icon: customMarkerIcon }).addTo(map);
    
    var iframe = document.createElement('iframe');
        iframe.src = popupSrc;
        iframe.style.width = 'auto';
        iframe.style.height = '25rem';
        iframe.frameBorder = 0;
    
    var popupContent = L.popup({
        offset: [0, 1],
        maxWidth: "400px" 
    }).setContent(iframe);
    
    customMarker.bindPopup(popupContent);

    var labelIcon = L.divIcon({
        className: 'custom-marker-label',
        iconAnchor:[30, -18], 
        html: label 
    });

    var labelicon = L.marker(latlng, { icon: labelIcon }).addTo(map);
    
    labelicon.isBL = true;
    customMarker.isB = true;


    allMarkers.push(customMarker);
    allLabels.push(labelicon);
}

//TODO ADMIN OFFICE

function office(map, iconUrl, latlng, popupSrc, label){

        var customMarkerIcon = L.icon({
            iconUrl: iconUrl,
            iconSize: [25,25],
        });
        var customMarker = L.marker(latlng, {icon: customMarkerIcon}).addTo(map);
        
        var iframe = document.createElement('iframe');
            iframe.src = popupSrc;
            iframe.style.width = 'auto';
            iframe.style.height = '25rem';
            iframe.frameBorder = 0;
        
        var popupContent = L.popup({
            offset: [0, 1],
            maxWidth: "400px" 
        }).setContent(iframe);
        
        customMarker.bindPopup(popupContent);
    
        var labelIcon = L.divIcon({
            className: 'Admin-custom-marker-label',
            iconAnchor:[30, -18], 
            html: label
        });
    
       var labelicon = L.marker(latlng, { icon: labelIcon }).addTo(map);

        customMarker.isO = true;
        labelicon.isOL = true;

        allLabels.push(labelicon)
        allMarkers.push(customMarker);
    }

//? COMPLEX
    function complex(map, latlng, iconUrl, popupSrc, iconSize, label) {

        var customMarkerIcon = L.icon({
            iconUrl: iconUrl,
            iconSize: iconSize
        });
        var customMarker = L.marker(latlng, { icon: customMarkerIcon }).addTo(map);
        
        var iframe = document.createElement('iframe');
            iframe.src = popupSrc;
            iframe.style.width = 'auto';
            iframe.style.height = '25rem';
            iframe.frameBorder = 0;
        
        var popupContent = L.popup({
            offset: [0, 1],
            maxWidth: "400px" 
        }).setContent(iframe);
        
        customMarker.bindPopup(popupContent);
    
        var labelIcon = L.divIcon({
            className: 'complex',
            iconAnchor:[10, -18], 
            html: label 
        });
    
        var labelicon = L.marker(latlng, { icon: labelIcon }).addTo(map);

        customMarker.isC = true;

        allLabels.push(labelicon)
        allMarkers.push(customMarker);
    }
    

CustomMarker(
    map,
    [14.25545, 121.40073], // Gate 1
    'src/entrance.png',
    'assets/html/footer.html',
    [50, 30],
    ""
);

CustomMarker(
    map,
    [14.25626, 121.40779], // Gate 2
    'src/exit.png',
    'assets/html/footer.html',
    [50, 30],
    ""
);

CustomMarker(
    map,
    [14.25571,121.40581], // Jose Rizal Monument
    'src/RizalMon.png',
    'assets/html/RIZZ.html',
    [30, 30],
    'Jose Rizal Monument'
);
    
//! COMPLEX 
    complex(
        map,
        [14.25499, 121.40753], // Athlete's Village
        'src/AV.png',
        'assets/html/AV.html',
        [40, 40],
        "Athletes' Village"
    );

    complex(
        map,
        [14.25523,121.40620], // San Luis Gym
        'src/sanluis.png',
        'assets/html/footer.html',
        [40, 40],
        "San Luis Gym"
    );
    
    complex(
        map,
        [14.25467,121.40630], // MP
        'src/MP.png',
        'assets/html/footer.html',
        [40, 40],
        "Multi-Purpose Gym"
    );

    complex(
        map,
        [14.25547,121.40677], // Pool
        'src/swimming.png',
        'assets/html/footer.html',
        [40,40],
        `Complex Pool Area`
    )

    complex(
        map, 
        [14.25604,121.40604], //Canteen
        'src/canteen.png',
        'assets/html/footer.html',
        [40,40],
        ""
    )

//! LU Buildings

lublg(
    map,
    [14.25559, 121.40774], // Oreta Building
    'src/oreta.png',
    'assets/html/oreta.html',
    [40, 40],
    'Oreta Building'
);

lublg(
    map,
    [14.25426,121.40904], // New Building
    'src/NB.png',
    'assets/html/NB.html',
    [40, 40],
    "New Building"
);

lublg(
    map,
    [14.25450,121.40977], //Admin Building
    'src/admin.png',
    'assets/html/footer.html',
    [40,40],
    "Under Construction"
)

lublg(
    map,
    [14.25504,121.40680], //Chem Lab
    'src/chem.png',
    'assets/html/footer.html',
    [20,20],
    "Chem Lab"
)

lublg(
    map,
    [14.25509,121.40691], //Bio Lab
    'src/bio.png',
    'assets/html/footer.html',
    [20,20],
    "Bio Lab"
)

lublg(
    map,
    [14.25514,121.40703], //Physics Lab
    'src/physics.png',
    'assets/html/footer.html',
    [20,20],
    "Physics Lab"
    )
    
    lublg(
        map,
        [14.25498,121.40665], // Engineering
        'src/eng.png',
        'assets/html/NB.html',
        [25, 25],
        "Engineering"
    );
    
    lublg(
        map,
        [14.25491,121.40685], // Engineering (1)
        'src/gear.png',
        'assets/html/NB.html',
        [25, 25],
        "Engineering"
    );
    
    //! SHS ROOMS
SHSMarker(
    map,
    [14.25674,121.40529], //LU 01
    'assets/html/LU 01.html',
    "LU 01"
)
SHSMarker(
    map,
    [14.25666,121.40533], //LU 02
    'assets/html/LU 02.HTML',
    "LU 02"
)
SHSMarker(
    map,
    [14.25660,121.40535], //LU 03
    'assets/html/LU 03.HTML',
    "LU 03"
)
SHSMarker(
    map,
    [14.25648,121.40540], //LU 04
    'assets/html/LU 04.HTML',
    "LU 04"
)

SHSMarker(
    map,
    [14.25639,121.40544], //LU 05
    'assets/html/LU 05.HTML',
    "LU 05"
)

SHSMarker(
    map,
    [14.25630,121.40548], //LU 06
    'assets/html/LU 06.HTML',
    "LU 06"
)

SHSMarker(
    map,
    [14.25606,121.40571], //LU 08
    'assets/html/LU 08.HTML',
    "LU 08"
)

SHSMarker(
    map,
    [14.25631,121.40561], //LU 10
    'assets/html/LU 10.HTML',
    "LU 10"
)

SHSMarker(
    map,
    [14.25648,121.40553], //LU 12
    'assets/html/LU 12.HTML',
    "LU 12"
)

SHSMarker(
    map,
    [14.25670,121.40544], //LU 15
    'assets/html/LU 15.HTML',
    "LU 15"
)

//ADMIN BLDG OFFICES


office(
    map,
    'src/chs.png',
    [14.25619,121.40553], //CHS
    'assets/html/LU 07.html',
    "<i>CHS Laboratory</i>"
)

office(
    map,
    'src/faculty.png',
    [14.25618,121.40565], //SHS Faculty
    'assets/html/LU 09.html',
    "<i>SHS Faculty Room</i>"
)

office(
    map,
    'src/clinic.png',
    [14.25678,121.40541], //Clinic
    'assets/html/LU 16.html',
    "<i>University Clinic</i>"
)

office(
    map,
    'src/lu11.png',
    [14.25642,121.40556], //Records Office
    'assets/html/LU 11.html',
    "<i>Records Office</i>"
)

office(
    map,
    'src/registrar.png',
    [14.25658,121.40549], //Registrar
    'assets/html/LU 13.html',
    "<i>Registrar's Office</i>"
)

office(
    map,
    'src/research-center.png',
    [14.25686,121.40537], //Research Center
    'assets/html/LU 17.html',
    "<i>Research Center</i>"
)

office(
    map,
    'src/hrmo2.png',
    [14.25692,121.40534], //HRMO
    'assets/html/LU 18.html',
    "<i>HRMO</i>"
)

office(
    map,
    'src/cashier.png',
    [14.25699,121.40531], //Cashier
    'assets/html/LU 19.html',
    "<i>Cashier's Office</i>"
)

office(
    map,
    'src/adminof.png',
    [14.25707,121.40528], //Admin Office
    'assets/html/LU 20.html',
    "<i>Admin Office</i>"
)
    

        document.getElementById("rum").addEventListener("click", function () {
            allMarkers.forEach(function (marker) {
                if (!marker.hasOwnProperty('isSHS')) {
                    map.removeLayer(marker);
        
        
                } else {
                    map.addLayer(marker);
                }
            });
        });
        
        
        document.getElementById("rum").addEventListener("click", function () {
            allLabels.forEach(function (marker) {
                if (!marker.hasOwnProperty('isSHSL')) {
                    map.removeLayer(marker);
                } else {
                    map.addLayer(marker);
                }
            });
        });
        
        
        document.getElementById("opis").addEventListener("click", function () {
            allMarkers.forEach(function (marker) {
                if (!marker.hasOwnProperty('isO')) {
                    map.removeLayer(marker);
                } else {
                    map.addLayer(marker);
                }
            });
        });
        
        
        document.getElementById("opis").addEventListener("click", function () {
            allLabels.forEach(function (marker) {
                if (!marker.hasOwnProperty('isOL')) {
                    map.removeLayer(marker);
                } else {
                    map.addLayer(marker);
                }
            });
        });
        
        
        document.getElementById("bilding").addEventListener("click", function () {
            allMarkers.forEach(function (marker) {
                if (!marker.hasOwnProperty('isB')) {
                    map.removeLayer(marker);
        
        
                } else {
                    map.addLayer(marker);
                }
            });
        });
        
        
        document.getElementById("bilding").addEventListener("click", function () {
            allLabels.forEach(function (marker) {
                if (!marker.hasOwnProperty('isBL')) {
                    map.removeLayer(marker);
                } else {
                    map.addLayer(marker);
                }
            });
        });
        
        
        document.getElementById("kmplks").addEventListener("click", function () {
            allMarkers.forEach(function (marker) {
                if (!marker.hasOwnProperty('isC')) {
                    map.removeLayer(marker);
        
        
                } else {
                    map.addLayer(marker);
                }
            });
        });
        
        
        document.getElementById("kmplks").addEventListener("click", function () {
            allLabels.forEach(function (marker) {
                if (!marker.hasOwnProperty('isCL')) {
                    map.removeLayer(marker);
                } else {
                    map.addLayer(marker);
                }
            });
        });
        
        
        document.getElementById("cr").addEventListener("click", function () {
            allMarkers.forEach(function (marker) {
                if (!marker.hasOwnProperty('isCR')) {
                    map.removeLayer(marker);
        
        
                } else {
                    map.addLayer(marker);
                }
            });
        });
        
        
        document.getElementById("cr").addEventListener("click", function () {
            allLabels.forEach(function (marker) {
                if (!marker.hasOwnProperty('isCRL')) {
                    map.removeLayer(marker);
                } else {
                    map.addLayer(marker);
                }
            });
        });
        
        
        document.getElementById("all").addEventListener("click", function () {
            allMarkers.forEach(function (marker) {
                    map.addLayer(marker);
            });
        });
        
        
        document.getElementById("all").addEventListener("click", function () {
            allLabels.forEach(function (marker) {
                    map.addLayer(marker);
            });
        });

//! ADMIN BUILDING POLYGON
var polygonCoordinates = [
    [14.25701,121.40501],
    [14.25713,121.40534],
    [14.25664,121.40555],
    [14.25608,121.40578], 
    [14.25598,121.40582],
    [14.25595,121.40572],
    [14.25603,121.40554],
    [14.25612,121.40538],    
    [14.25631,121.40530],
    [14.25701,121.40501]
];

var polygon = L.polygon(polygonCoordinates, {
    color: 'orange',       
    fillColor: 'orange', 
    fillOpacity: 0.05
}).addTo(map);         

polygon.bindPopup(`<i>Admin Building<i>`);

//! POOL
var polygonCoordinates = [
    [14.25567,121.40660],
    [14.25524,121.40676],
    [14.25533,121.40698],
    [14.25573,121.40680]
];

var polygon = L.polygon(polygonCoordinates, {  
    color: 'skyblue',       
    fillColor: 'skyblue', 
    fillOpacity: 1
}).addTo(map);         

polygon.bindPopup(`<i>Swimming Pool<i>`);

//! ENGINEERING
var polygonCoordinates = [
    [14.25501,121.40653],
    [14.25522,121.40704],
    [14.25498,121.40715],
    [14.25480,121.40670],
    [14.25483,121.40660],
    [14.25501,121.40653]
];

var polygon = L.polygon(polygonCoordinates, {
    color: '#FD6666',       
    fillColor: 'red', 
    fillOpacity: 0.01
}).addTo(map);         

polygon.bindPopup(`<i>College of Engineering<i>`);