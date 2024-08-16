import React from "react";

{
  /* <div className="w-[600px] h-[600px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
<div className="absolute left-8 top-16 -z-10 overflow-visible opacity-30 dark:opacity-10">
  <div className="z-10 h-[400px] w-[700px] rounded-full bg-purple-300 dark:bg-purple-500 mix-blend-multiply blur-[128px] animate-blob"></div>
</div>
<div className="absolute top-0 -right-4 -z-10 overflow-visible opacity-30 dark:opacity-10">
  <div className="-z-10 h-[400px] w-[700px] rounded-full bg-yellow-300 dark:bg-pink-500 mix-blend-multiply blur-[128px] animate-blob"></div>
</div>
<div className="absolute -bottom-8 left-20 -z-10 overflow-visible opacity-30 dark:opacity-10">
  <div className="-z-10 h-[600px] w-[500px] rounded-full bg-pink-300 dark:bg-blue-400 mix-blend-multiply blur-[128px] animate-blob"></div>
</div>
</div> */
}

function AnimatedBackground() {
  // blur-[128px] animate-blob
  const center = `absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`;
  return (
    <>
      <div
        className={`top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute`}
      >
        <div
          className={`absolute ${center} -z-10 overflow-visible opacity-30 dark:opacity-10`}
        >
          <div
            className={`relative left-[100px] z-10 h-[400px] w-[700px] rounded-full bg-purple-300 dark:bg-purple-500 mix-blend-multiply blur-[128px] animate-blob`}
          ></div>
        </div>
        <div
          className={`absolute ${center} -z-10 overflow-visible opacity-30 dark:opacity-10`}
        >
          <div
            className={`relative right-[100px] bottom-[100px] -z-10 h-[400px] w-[700px] rounded-full bg-yellow-300 dark:bg-pink-500 mix-blend-multiply blur-[128px] animate-blob`}
          ></div>
        </div>
        <div
          className={`absolute ${center} -z-10 overflow-visible opacity-30 dark:opacity-10`}
        >
          <div
            className={`relative top-[60px] -z-10 h-[600px] w-[500px] rounded-full bg-pink-300 dark:bg-blue-400 mix-blend-multiply blur-[128px] animate-blob`}
          ></div>
        </div>
      </div>
    </>
  );
}

export default AnimatedBackground;
