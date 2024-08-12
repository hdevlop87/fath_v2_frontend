'use client'

import { Label } from '@/components/ui/label'
import React, { useEffect, useRef, useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import useGoogleMapsAPI from '@/hooks/useGoogleMapsAPI';


const containerStyle = {
    width: '100%',
    height: '100%'
};

const Address = () => {
    const { isLoaded, apiKey } = useGoogleMapsAPI();
    const autocompleteRef = useRef(null);
    const [center, setCenter] = useState({
        lat: 31.34733230223935,
        lng: -7.7528914632761845
    });

    useEffect(() => {
        if (isLoaded && autocompleteRef.current) {
            const autocomplete = new window.google.maps.places.Autocomplete(
                autocompleteRef.current
            );

            autocomplete.addListener('place_changed', () => {
                const place: any = autocomplete.getPlace();
                if (place.geometry) {
                    setCenter({
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng(),
                    });
                }
            });
        }
    }, [isLoaded]);

    return (
        <div className="contact flex flex-col gap-10">
            <Label className='text-lg'>Address </Label>
            {isLoaded ? (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={13}
                    options={{
                        zoomControl: false,
                        disableDefaultUI: true,
                        styles: [
                            {
                                featureType: 'poi',
                                stylers: [{ visibility: 'off' }]
                            }
                        ]
                    }}
                >
                    <Marker position={{ lat: center.lat, lng: center.lng }}
                        icon={{
                            url: '/markerBlue.png',
                            scaledSize: new window.google.maps.Size(42, 42)
                        }}
                    />

                </GoogleMap>
            ) : <></>}
        </div>
    )
}

export default Address
