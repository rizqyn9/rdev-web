import { Section } from "~/components/ui/layout.tsx"
import { LightStick } from "~/components/ui/light-stick.tsx"

export default function ContactPage() {
  return (
    <>
      <Section wrapNav>
        <h1>CONTACT</h1>
        <LightStick direction="x" />
        <div className="stick">
          <div className="runner-light"></div>
        </div>
        <div className="stick-horizontal">
          <div className="runner-horizontal"></div>
        </div>
      </Section>
    </>
  )
}
