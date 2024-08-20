/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import Config from "@/content/config";
import { extractDomain } from "@/lib/utils";
import { ArticleBannerProps } from "./types";

export const contentType = "image/png";

//og:image generation
export default async function ArticleBanner({
  size,
  title,
  summary,
  image,
}: ArticleBannerProps) {
  console.log("ArticleBannerProps: ", { size, title, summary, image });
  // domain name
  const domainName = extractDomain(Config.site.url);
  if (!domainName) {
    throw new Error("Failed to extract domain name: " + Config.site.url);
  }

  const name = Config.site.name;

  // dancing script font
  const dancingScriptFont = await fetch(
    new URL(
      "/public/fonts/dancing-script/DancingScript-Medium.ttf",
      import.meta.url
    )
  );
  if (!dancingScriptFont.ok) {
    throw new Error("Failed to fetch the font file");
  }
  const dancingScriptFontData = await dancingScriptFont.arrayBuffer();

  // geist font

  const geistFont = await fetch(
    new URL("/public/fonts/geist/Geist-Light.woff", import.meta.url)
  );
  if (!geistFont.ok) {
    throw new Error("Failed to fetch the font file");
  }
  const geistFontData = await geistFont.arrayBuffer();

  // if image is provided, render with the image.

  if (!image) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "black",
            position: "relative",
            color: "white",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              position: "absolute",
              backgroundColor: "black",
              backgroundImage:
                "linear-gradient(#121212 1px, transparent 1px), linear-gradient(90deg, #121212 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 20,
              left: 20,
              borderRadius: "10px",
              padding: "10px",
              fontFamily: "Geist",
              backgroundColor: "#191919",
              border: "1px solid #333",
              fontSize: 30,
            }}
          >
            {domainName}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              // marginLeft: "-100px",
            }}
          >
            {/* <img
              src={`${Config.site.url}/peep.svg`}
              alt="Acme Logo"
              style={{
                width: "400px",
                height: "400px",
                filter:
                  "drop-shadow(2px 0 0 antiquewhite) drop-shadow(-2px 0 0 antiquewhite) drop-shadow(0 2px 0 antiquewhite) drop-shadow(0 -2px 0 antiquewhite)",
              }}
            /> */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h1
                style={{
                  fontSize: 120,
                  fontFamily: "Geist",
                  margin: 0,
                }}
              >
                {title}
              </h1>
              <h2
                style={{
                  fontSize: 50,
                  fontFamily: "Geist",
                  margin: 0,
                  opacity: 0.8,
                }}
              >
                {summary}
              </h2>
            </div>
          </div>
        </div>
      ),
      {
        ...size,
        fonts: [
          {
            name: "Dancing Script",
            data: dancingScriptFontData,
            style: "normal",
            weight: 400,
          },
          {
            name: "Geist",
            data: geistFontData,
            style: "normal",
            weight: 300,
          },
        ],
      }
    );
  }
}
