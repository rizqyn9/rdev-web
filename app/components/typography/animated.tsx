// https://codesandbox.io/s/framer-motion-responsive-text-animation-z7udk?file=/src/AnimatedText.js

import type { Variants } from "framer-motion"
import { motion } from "framer-motion"
import { useMemo, type ComponentProps } from "react"
import clsxm from "~/utils/clsxm"

type WrapperProps = ComponentProps<"span">
function Wrapper(props: WrapperProps) {
  const { className, ...rest } = props
  return <span className={clsxm("whitespace-nowrap", className)} {...rest} />
}

const itemVariants: Variants = {
  hidden: {
    y: "200%",
    transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.85 },
  },
  visible: {
    y: 0,
    transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.75 },
  },
}

function splitter(text: string) {
  const splitWords = text.split(" ")
  const words = []

  for (const [, item] of splitWords.entries()) {
    words.push(item.split(""))
  }

  // Add a space ("\u00A0") to the end of each word
  words.map((word) => {
    return word.push("\u00A0")
  })

  return words
}

type AnimatedTextProps = {
  wrapper?: WrapperProps
  text: string
} & ComponentProps<"h1">

export function AnimatedText(props: AnimatedTextProps) {
  const { wrapper, text, ...rest } = props
  const words = useMemo(() => splitter(text), [text])

  return (
    <h1 {...rest}>
      {words.map((word, index) => {
        return (
          // Wrap each word in the Wrapper component
          <Wrapper key={index} {...wrapper}>
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
                    variants={itemVariants}
                  >
                    {element}
                  </motion.span>
                </span>
              )
            })}
          </Wrapper>
        )
      })}
    </h1>
  )
}

const variantTemplate1: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.025,
    },
  },
}

type AnimatedTextTemplate1Props = AnimatedTextProps
export function AnimatedTextTemplate1(props: AnimatedTextTemplate1Props) {
  return (
    <motion.div
      initial="hidden"
      animate={"visible"}
      variants={variantTemplate1}
    >
      <AnimatedText {...props} />
    </motion.div>
  )
}

type AnimatedTextTemplate2Props = {
  visible: boolean
} & AnimatedTextProps

export function AnimatedTextTemplate2(props: AnimatedTextTemplate2Props) {
  const { visible, ...rest } = props
  return (
    <motion.div
      initial="hidden"
      animate={visible ? "visible" : "hidden"}
      variants={variantTemplate1}
    >
      <AnimatedText {...rest} />
    </motion.div>
  )
}
