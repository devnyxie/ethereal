import React from "react";

function AnimatedBackground() {
  const size_0 = `h-[500px] w-[500px]`;
  const size_1 = `h-[400px] w-[700px]`;
  const size_2 = `h-[400px] w-[700px]`;
  const size_3 = `h-[600px] w-[500px]`;
  const size_4 = `h-[150px] w-[500px]`;

  const enableBlur = true;
  const blurClass = `blur-[120px]`;

  const enableAnimation = true;
  const animationClass = `animate-blob`;

  const classes = `${enableBlur ? `${blurClass}` : ""} ${
    enableAnimation ? `${animationClass}` : ""
  }`;

  const center = `absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`;

  // Variants of Animations
  // --- Three Blobs
  const three = (
    <>
      <div className={`${center} z-0`}>
        <div
          className={`absolute ${center} -z-10 overflow-visible opacity-25 dark:opacity-15`}
        >
          <div
            className={`relative left-[100px] bottom-[100px] z-10 ${size_1} rounded-full bg-purple-300 dark:bg-purple-500 mix-blend-multiply ${classes}
          
          `}
          ></div>
        </div>
        <div
          className={`absolute ${center} -z-10 overflow-visible opacity-25 dark:opacity-15`}
        >
          <div
            className={`relative right-[100px] bottom-[100px] -z-10 ${size_2} rounded-full bg-yellow-300 dark:bg-pink-500 mix-blend-multiply ${classes} animation-delay-2000`}
          ></div>
        </div>
        <div
          className={`absolute ${center} -z-10 overflow-visible opacity-25 dark:opacity-15`}
        >
          <div
            className={`relative top-[0px] -z-10 ${size_3} rounded-full bg-pink-300 dark:bg-blue-400 mix-blend-multiply ${classes} animation-delay-4000`}
          ></div>
        </div>
      </div>
    </>
  );
  // --- Single Blob
  const single = (
    <>
      <div className={`${center} z-0`}>
        <div
          className={`absolute ${center} -z-10 overflow-visible opacity-30 dark:opacity-20 `}
        >
          {/* <div
            className={`relative top-[0px] -z-10 ${size_2} rounded-full bg-pink-400 dark:bg-blue-500 mix-blend-multiply ${classes}`}
          ></div> */}
          <div
            className={`relative top-[0px] -z-10 ${size_4} rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-500 mix-blend-multiply ${classes}`}
          ></div>
        </div>
      </div>
    </>
  );
  // --- Two Blobs
  const two = (
    <>
      <div className={`${center} z-0`}>
        <div
          className={`absolute ${center} -z-10 overflow-visible opacity-30 dark:opacity-15`}
        >
          <div
            className={`relative top-[-100px] left-[100px] -z-10 ${size_0} rounded-full bg-yellow-300 dark:bg-pink-600 mix-blend-multiply ${classes}`}
          ></div>
        </div>
        <div
          className={`absolute ${center} -z-10 overflow-visible opacity-30 dark:opacity-15`}
        >
          <div
            className={`relative top-[0px] -z-10 ${size_0} rounded-full bg-pink-300 dark:bg-purple-500 mix-blend-multiply ${classes} animation-delay-2000`}
          ></div>
        </div>
      </div>
    </>
  );
  // --- Two Blobs (Violet - Blue)
  const violet_blue_dark = (
    <>
      <div className={`${center} z-0`}>
        <div
          className={`absolute ${center} -z-10 overflow-visible opacity-30 dark:opacity-20`}
        >
          <div
            className={`relative top-[25px] -z-10 h-[300px] w-[400px] rounded-full dark:bg-blue-500 mix-blend-multiply ${classes}`}
          ></div>
        </div>
        <div
          className={`absolute ${center} -z-10 overflow-visible opacity-30 dark:opacity-20`}
        >
          <div
            className={`relative top-[-110px] left-[80px] -z-10 h-[300px] w-[300px] rounded-full dark:bg-pink-600 mix-blend-multiply ${classes} animation-delay-2000`}
          ></div>
        </div>
      </div>
    </>
  );

  const test = <></>;

  // summary / thoughts
  // 1. Light: "three" (Twilight) is the most visually appealing version for the light version. We can even use similar colors for the footer.
  // 2. Dark: "violet_blue_dark" Blue and Violet are the most visually appealing colors.

  return (
    <>
      <div className="hidden dark:block">{violet_blue_dark}</div>
      <div className="block dark:hidden">{three}</div>
    </>
  );
}

export default AnimatedBackground;
