"use client";
import GoogleMapReact from "google-map-react";

const GoogleMap = ({ text }) => <div>{text}</div>;

export default function SimpleMap() {
  const defaultProps = {
    center: {
      lat: 34.8962751,
      lng: 33.6091561,
    },
    zoom: 11,
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "350px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <GoogleMap lat={34.8962751} lng={33.6091561} text="My Marker" />
      </GoogleMapReact>
    </div>
  );
}
