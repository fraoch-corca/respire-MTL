'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function GeoLocation(){
    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();
    const latitude = params.get("lat");
    const longitude = params.get("long");

    if (!latitude || !longitude) {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    const pathParams = `${pathname}?lat=${latitude}&long=${longitude}`;
                    console.log(pathParams);
                    console.log('/////////////// change route GL //////////////');
                    router.replace(pathParams);
                },
                (error) => {
                    console.error("Error obtaining location: ", error);
                }
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }

    return (
        <div className="w-full border-4 border-amber-300">
            Loc here
        </div>
    )
} 