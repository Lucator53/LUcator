const markers = [];

//! MARKERS
markers.push({
  name: "Oreta Building",
  coordinates: [14.25559, 121.40774],
});

markers.push({
  name: "Gate 1",
  coordinates: [14.25545, 121.40073],
});

markers.push({
  name: "Gate 2",
  coordinates: [14.25626, 121.40779],
});

markers.push({
  name: "Athlete's Village",
  coordinates: [14.25499, 121.40753],
});

markers.push({
  name: "Jose Rizal Monument",
  coordinates: [14.25571,121.40581],
});

markers.push({
  name: "LU 01",
  coordinates: [14.25674,121.40529],
});

markers.push({
  name: "LU 02",
  coordinates: [14.25666,121.40533],
});

markers.push({
  name: "LU 03",
  coordinates: [14.25660,121.40535],
});

markers.push({
  name: "LU 04",
  coordinates: [14.25648,121.40540],
});

markers.push({
  name: "LU 05",
  coordinates: [14.25639,121.40544],
});

markers.push({
  name: "LU 06",
  coordinates: [14.25630,121.40548],
});

markers.push({
  name: "CHS Laboratory",
  coordinates: [14.25619,121.40553],
});

markers.push({
  name: "LU 07",
  coordinates: [14.25619,121.40553],
});

markers.push({
  name: "LU 08",
  coordinates: [14.25606,121.40571],
});

markers.push({
  name: "SHS Faculty Room",
  coordinates: [14.25618,121.40565],
});

markers.push({
  name: "LU 09",
  coordinates: [14.25618,121.40565],
});

markers.push({
  name: "LU 10",
  coordinates: [14.25631,121.40561],
});

markers.push({
  name: "Records Office",
  coordinates: [14.25642,121.40556],
});

markers.push({
  name: "LU 11",
  coordinates: [14.25642,121.40556],
});

markers.push({
  name: "LU 12",
  coordinates: [14.25648,121.40553],
});

markers.push({
  name: "Registrar's Office",
  coordinates: [14.25658,121.40549],
});

markers.push({
  name: "LU 13",
  coordinates: [14.25658,121.40549],
});

markers.push({
  name: "LU 14",
  coordinates: [14.25658,121.40549],
});

markers.push({
  name: "LU 15",
  coordinates: [14.25670,121.40544],
});

markers.push({
  name: "University Clinic",
  coordinates: [14.25678,121.40541],
});

markers.push({
  name: "LU 16",
  coordinates: [14.25678,121.40541],
});

markers.push({
  name: "Research Center",
  coordinates: [14.25686,121.40537],
});
markers.push({
  name: "LU 17",
  coordinates: [14.25686,121.40537],
});

markers.push({
  name: "HRMO",
  coordinates: [14.25692,121.40534],
});

markers.push({
  name: "LU 18",
  coordinates: [14.25692,121.40534],
});

markers.push({
  name: "Cashier's Office",
  coordinates: [14.25699,121.40531],
});

markers.push({
  name: "LU 19",
  coordinates: [14.25699,121.40531],
});

markers.push({
  name: "Admin Office",
  coordinates: [14.25707,121.40528],
});

markers.push({
  name: "LU 20",
  coordinates: [14.25707,121.40528],
});

markers.push({
  name: "San Luis Gym",
  coordinates: [14.25523,121.40620],
});


markers.push({
  name: "Multi-Purpose Gym",
  coordinates: [14.25467,121.40630],
});


markers.push({
  name: "Complex Pool Area",
  coordinates: [14.25547,121.40677],
});


markers.push({
  name: "New Building",
  coordinates: [14.25426,121.40904],
});


markers.push({
  name: "Complex Canteen",
  coordinates: [14.25604,121.40604],
});


markers.push({
  name: "",
  coordinates: [],
});


markers.push({
  name: "",
  coordinates: [],
});


markers.push({
  name: "",
  coordinates: [],
});


markers.push({
  name: "",
  coordinates: [],
});


markers.push({
  name: "",
  coordinates: [],
});


markers.push({
  name: "",
  coordinates: [],
});



let maxZoomReached = false;

function searchMarkers(query) {
  let selectedMarker = null;

  const formattedQuery = query.toLowerCase().replace(/[^a-z0-9]/g, '');

  if (maxZoomReached) {
    
    const defaultZoomLevel = 12;
    map.setView([14.25559, 121.40774], defaultZoomLevel); 
    maxZoomReached = false;
    setTimeout(() => {
      searchMarkers(query);
    }, 1000); 
    return;
  }

  markers.forEach((marker) => {
    const formattedMarkerName = marker.name.toLowerCase().replace(/[^a-z0-9]/g, '');

    if (formattedMarkerName.includes(formattedQuery)) {
      selectedMarker = marker;
      const maxZoomLevel = 20; 
      map.setView(marker.coordinates, maxZoomLevel);
      maxZoomReached = true;
      simulateMarkerClick(selectedMarker);
    }
  });

  if (!selectedMarker) {
    alert("No matching marker found for the search query.");
  }
}

function simulateMarkerClick(marker) {
  map.eachLayer((layer) => {
    if (layer instanceof L.Marker && layer.getLatLng().equals(marker.coordinates)) {
      layer.openPopup();
    }
  });
}

document.getElementById('srchbtn').addEventListener('click', function () {
  const searchQuery = document.getElementById('output').value.trim();

  if (searchQuery !== "") {
    searchMarkers(searchQuery);
  } else {
    alert("Please enter a search query.");
  }
});