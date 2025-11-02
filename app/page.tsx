'use client';

import { Cartesian3, createOsmBuildingsAsync, Ion, Math as CesiumMath, Terrain, Viewer, Color, Material, EntityCollection, Rectangle, Cartesian2, Math, VerticalOrigin, LabelStyle, StripeMaterialProperty } from 'cesium';
import "cesium/Build/Cesium/Widgets/widgets.css";
import { useEffect, useState } from "react";
import "tailwindcss";
import Drawer from '@cesium-extends/drawer';

declare global {
  interface Window {
    CESIUM_BASE_URL: string;
  }
}


export default function Home() {

  let viewer: Viewer;
  let drawer: Drawer;
  let polygonId = 0;
  

  useEffect(() => {

    Math.setRandomNumberSeed(1);
    // The URL on your server where CesiumJS's static files are hosted.
    window.CESIUM_BASE_URL = '/cesium/';

    // Ion.defaultAccessToken = 'Access_Token'; // Replace with your Cesium Ion access token if needed.
    // Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.


    viewer = new Viewer('cesiumContainer');
    drawer = new Drawer(viewer);


  }, []);

  return (<>
    <div>
      <div className='h-screen w-0 absolute z-10 w-0 flex flex-col justify-center object-center'>
        <div className='h-screen absolute z-10  flex flex-col object-center w-0'>

          <button onClick={() => {
            if (drawer.operateType.CANCEL) {
              drawer.reset();

            }
            document.getElementById("form")?.classList.remove("invisible");
            drawer.start({
              type: 'POLYGON',
              finalOptions: {
                Material: Color.RED
              },

              onEnd(entity, positions) {
                let shapeName = prompt("enter shape name: ");
                let extrudeHeight = prompt("enter extruded Height: ");
                viewer.zoomTo(entity);
                viewer.entities.add({
                  name: shapeName ? shapeName : "default name",
                  polygon: {
                    hierarchy: positions,
                    material: Color.fromRandom(),
                    outline: true,
                    outlineColor: Color.BLACK,
                    extrudedHeight: Number(extrudeHeight) ? Number(extrudeHeight) : parseFloat('0'),
                  }

                })
                drawer.reset();
                console.log(viewer.entities.values);
              },

            });
          }} className='m-2 w-15 h-15 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md shadow-sm flex items-center justify-center transition duration-200'><svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"><polygon points="5,3 19,3 23,12 12,21 1,12" strokeWidth="2" /></svg></button>

          <button onClick={() => {
            if (drawer.operateType.CANCEL) {
              drawer.reset();

            }
            drawer.start({
              type: 'POLYLINE',
              finalOptions: {
                Material: Color.RED
              },

              onEnd(entity, positions) {
                let shapeName = prompt("enter shape name: ");
                let extrudeHeight = prompt("enter extruded Height: ");
                viewer.zoomTo(entity);
                viewer.entities.add({
                  name: shapeName ? shapeName : "default name",
                  polyline: {
                    positions: positions,
                    width: Number(extrudeHeight) ? Number(extrudeHeight) : parseFloat('0'),
                    material: Color.fromRandom()
                    
                  }
                })
              },

            });
          }} className='m-2 w-15 h-15 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md shadow-sm flex items-center justify-center transition duration-200'><svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="4" y1="20" x2="20" y2="4" strokeWidth="2" /></svg></button>

          <button onClick={() => {
            if (drawer.operateType.CANCEL) {
              drawer.reset();

            }
            drawer.start({
              type: 'POINT',
              finalOptions: {
                Material: Color.RED
              },

              onEnd(entity, positions) {
                viewer.zoomTo(entity);
                let shapeName = prompt("enter point name: ");
                viewer.entities.add({
                  name: shapeName ? shapeName : "default name",
                  position: positions[0],
                  point: {
                    pixelSize: 15,
                    color: Color.RED,
                    outlineColor: Color.WHITE,
                    outlineWidth: 2,
                  },
                  label: {
                    text: shapeName ? shapeName : "default name",
                    font: "14pt monospace",
                    style: LabelStyle.FILL_AND_OUTLINE,
                    outlineWidth: 2,
                    verticalOrigin: VerticalOrigin.BOTTOM,
                    pixelOffset: new Cartesian2(0, -9)
                  },
                })
              },

            });
          }} className='m-2 w-15 h-15 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md shadow-sm flex items-center justify-center transition duration-200'> <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="2" /></svg></button>

          <button onClick={() => {
            if (drawer.operateType.CANCEL) {
              drawer.reset();

            }
            drawer.start({
              type: 'CIRCLE',
              finalOptions: {
                Material: Color.RED
              },

              onEnd(entity, positions) {
               const entit = viewer.entities.add({
                  
                  name:"Circle",
                  position:positions[0],
                  ellipse: {
                    semiMajorAxis: Cartesian3.distance(positions[1],positions[0]),
                    semiMinorAxis: Cartesian3.distance(positions[0],positions[1]),
                    outline: true,
                    height:0,
                    extrudedHeight:2,
                    outlineColor: Color.BLACK,
                    material: Color.fromRandom()
                  }
                })
                viewer.zoomTo(entit);
              },

            });
          }} className='m-2 w-15 h-15 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md shadow-sm flex items-center justify-center transition duration-200'><svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="8" strokeWidth="2" /></svg></button>

          <button onClick={() => {
            if (drawer.operateType.CANCEL) {
              drawer.reset();

            }
            drawer.start({
              type: 'RECTANGLE',
              finalOptions: {
                Material: Color.RED
              },

              onEnd(entity, positions) {


                let shapeName = prompt("Enter Name for Rectangle:");
                let extrudedHeight = prompt("Enter Height for Rectangle:");
                viewer.zoomTo(entity);
                viewer.entities.add({
                  name: shapeName ? shapeName : "default name",
                  rectangle: {
                    extrudedHeight: extrudedHeight ? parseFloat(extrudedHeight) : 0,
                    coordinates: Rectangle.fromCartesianArray(positions),
                    material: Color.fromRandom(),
                    outline: true,
                    outlineColor: Color.BLACK,

                  }
                })
              },

            });
          }} className='m-2 w-15 h-15 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md shadow-sm flex items-center justify-center transition duration-200'><svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="4" y="4" width="16" height="12" strokeWidth="2" /></svg></button>

        </div>
      </div>
      <div id="cesiumContainer" className='mainView' style={{ width: "100%", height: "100vh" }} >

      </div>


    </div>


  </>

  );

}




