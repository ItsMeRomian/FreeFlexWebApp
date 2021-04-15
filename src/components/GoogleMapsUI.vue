<template>
    <div class="map" ref="mapDivRef"></div>
</template>

<script>
    import { ref, onMounted } from "vue";

    export default {
        name: "GoogleMapsUI",
        props: {
            zoom: Number,
            mapType: String,
            disableUI: Boolean,
            address: String
        },
        data() {
            return {
                latlong: {}
            }
        },
        setup(props) {
            const map = ref(null);

            const mapDivRef = ref(null);
            // load in the google script
            onMounted(() => {
                const googleMapScript = document.createElement("SCRIPT");
                googleMapScript.setAttribute(
                    "src",
                    `https://maps.googleapis.com/maps/api/js?key=AIzaSyAST_Wy_UGBS7O8Mgm4U3srzVS-exy_nXg&callback=initMap`
                );
                googleMapScript.setAttribute("defer", "");
                googleMapScript.setAttribute("async", "");
                document.head.appendChild(googleMapScript);
            });
            window.initMap = () => {
                const geoc = new window.google.maps.Geocoder();


                map.value = new window.google.maps.Map(mapDivRef.value, {
                    mapTypeId: "roadmap",
                    zoom: props.zoom || 8,
                    styles: [ { elementType: "geometry", stylers: [{ color: "#242f3e" }] }, { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }], }, { elementType: "labels.text.fill", stylers: [{ color: "#746855" }], }, { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }], }, { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }], }, { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#263c3f" }], }, { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#6b9a76" }], }, { featureType: "road", elementType: "geometry", stylers: [{ color: "#38414e" }], }, { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#212a37" }], }, { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#9ca5b3" }], }, { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#746855" }], }, { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#1f2835" }], }, { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#f3d19c" }], }, { featureType: "transit", elementType: "geometry", stylers: [{ color: "#2f3948" }], }, { featureType: "transit.station", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }], }, { featureType: "water", elementType: "geometry", stylers: [{ color: "#17263c" }], }, { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#515c6d" }], }, { featureType: "water", elementType: "labels.text.stroke", stylers: [{ color: "#17263c" }], }, ],
                    disableDefaultUI: true,
                    center: { lat: 38.0, lng: -77.01 }
                });
                geoc.geocode( {'address': props.address}, function (result,status) {
                    if (status === "OK") {
                        map.value.setCenter(result[0].geometry.location)
                        new window.google.maps.Marker({
                            position: result[0].geometry.location,
                            map: map.value,
                            title: "Job Location"
                        })
                    } else {
                        //TODO: Display error message when address cannot be found.
                        //alert('There has been an error finding your given address. Try changing the address to something more specific.')
                    }
                })
            };
            return {
                mapDivRef
            };
        }
    };
</script>

<style lang="css" scoped>
    .map {
        width: 100%;
        height: 300px;
        background-color: azure;
    }
</style>