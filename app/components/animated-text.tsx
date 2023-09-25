// https://codesandbox.io/s/framer-motion-responsive-text-animation-z7udk?file=/src/AnimatedText.js

import { motion } from "framer-motion"
import { useMemo, type ComponentProps } from "react"

type WrapperProps = ComponentProps<"span">
function Wrapper(props: WrapperProps) {
  const { children } = props
  return (
    <span className="whitespace-nowrap text-[6rem] font-bold">{children}</span>
  )
}

const item = {
  hidden: {
    y: "200%",
    color: "#0055FF",
    transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.85 },
  },
  visible: {
    y: 0,
    color: "#FF0088",
    transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.75 },
  },
}

const TEXT = "KERJA KERJA KERJA BUAT HALALIN KAMU DEK TASYOO"

export function AnimatedText() {
  const words = useMemo(() => {
    const splitWords = TEXT.split(" ")
    const words = []

    for (const [, item] of splitWords.entries()) {
      words.push(item.split(""))
    }

    // Add a space ("\u00A0") to the end of each word
    words.map((word) => {
      return word.push("\u00A0")
    })

    words[words.length - 1].push("😘😘😘😘😘")

    return words
  }, [])

  return (
    <p className="text-center">
      {words.map((word, index) => {
        return (
          // Wrap each word in the Wrapper component
          <Wrapper key={index}>
            {words[index].flat().map((element, index) => {
              return (
                <span
                  style={{
                    overflow: "hidden",
                    display: "inline-block",
                  }}
                  key={index}
                >
                  <motion.span
                    style={{ display: "inline-block" }}
                    variants={item}
                  >
                    {element}
                  </motion.span>
                </span>
              )
            })}
          </Wrapper>
        )
      })}
    </p>
  )
}
