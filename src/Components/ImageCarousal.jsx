import React from "react";

const ImageCarousal = () => {
  return (
    <div class="w-full h-screen overflow-hidden relative">
      <div class="absolute top-0 left-0 w-full h-full flex transition-transform duration-700 ease-in-out">
        <div
          class="w-full h-full bg-cover bg-center animate-fade-in-right"
          style="background-image: url('https://via.placeholder.com/1920x1080')"
        ></div>
        <div
          class="w-full h-full bg-cover bg-center animate-fade-in-right delay-300"
          style="background-image: url('https://via.placeholder.com/1920x1080')"
        ></div>
        <div
          class="w-full h-full bg-cover bg-center animate-fade-in-right delay-600"
          style="background-image: url('https://via.placeholder.com/1920x1080')"
        ></div>
        <div
          class="w-full h-full bg-cover bg-center animate-fade-in-right delay-900"
          style="background-image: url('https://via.placeholder.com/1920x1080')"
        ></div>
      </div>
    </div>
  );
};

export default ImageCarousal;
