/* eslint-disable jsx-a11y/alt-text */
import { LoaderFunctionArgs } from "@remix-run/node"
import satori, { SatoriOptions } from "satori"
import { Resvg } from "@resvg/resvg-js"

async function getFont(
  font: string,
  weights = [400, 500, 600, 700],
  text = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\!@#$%^&*()_+-=<>?[]{}|;:,.`'’\"–—"
) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${font}:wght@${weights.join(
      ";"
    )}&text=${encodeURIComponent(text)}`,
    {
      headers: {
        // Make sure it returns TTF.
        "User-Agent":
          "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
      },
    }
  ).then((response) => response.text())
  const resource = css.matchAll(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/g
  )
  return Promise.all(
    [...resource]
      .map((match) => match[1])
      .map((url) => fetch(url).then((response) => response.arrayBuffer()))
      .map(async (buffer, i) => ({
        name: font,
        style: "normal",
        weight: weights[i],
        data: await buffer,
      }))
  ) as Promise<SatoriOptions["fonts"]>
}

export async function loader({ request }: LoaderFunctionArgs) {
  const jsx = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <img src="https://picsum.photos/200/300" width={200} height={300} />
      <p>hello, world</p>
    </div>
  )

  const svg = await satori(jsx, {
    width: 600,
    height: 400,
    fonts: await getFont("Inter"),
  })

  const resvg = new Resvg(svg)
  const pngData = resvg.render()
  const data = pngData.asPng()
  return new Response(data, {
    headers: {
      "Content-Type": "image/png",
    },
  })
}
