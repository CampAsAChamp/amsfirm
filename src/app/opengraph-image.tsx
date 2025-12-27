import { ImageResponse } from "next/og"

// Image metadata
export const alt = "Anna M Schneider Law - Wills & Trusts Attorney"
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

// Image generation
export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "linear-gradient(135deg, #0c4a6e 0%, #00AEEF 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "72px",
            fontWeight: "bold",
            color: "white",
            marginBottom: "20px",
            lineHeight: 1.2,
          }}
        >
          Anna M. Schneider Law
        </h1>
        <p
          style={{
            fontSize: "36px",
            color: "rgba(255, 255, 255, 0.9)",
            marginTop: "0",
          }}
        >
          Estate Planning • Wills • Trusts • Probate
        </p>
        <p
          style={{
            fontSize: "28px",
            color: "rgba(255, 255, 255, 0.85)",
            marginTop: "30px",
          }}
        >
          Protecting Your Family&apos;s Future in Torrance, CA
        </p>
      </div>
    </div>,
    {
      ...size,
    }
  )
}
