import { Card } from "./card.tsx"

type Experience = {
  start: string
  end: string
  position: string
  company: string
}

const EXPERIENCES: Experience[] = [
  {
    start: "Sep 21",
    end: "Feb 22",
    position: "Backend Engineer",
    company: "PT. Sinarmas Asset Management",
  },
  {
    start: "Dec 21",
    end: "Mar 21",
    position: "Backend Engineer",
    company: "Lingotalk",
  },
  {
    start: "Mar 21",
    end: "Jan 22",
    position: "Lead Engineer",
    company: "Lingotalk",
  },
  {
    start: "Jan 22",
    end: "Aug 22",
    position: "Frontend Engineer",
    company: "Blups Asia",
  },
  {
    start: "Jan 22",
    end: "Aug 22",
    position: "Frontend Engineer",
    company: "Blups Asia",
  },
  {
    start: "Feb 22",
    end: "May 22",
    position: "Fullstack Engineer",
    company: "Cariguru",
  },
  {
    start: "May 22",
    end: "Jan 23",
    position: "Lead Web Engineer",
    company: "Cariguru",
  },
  {
    start: "Jan 23",
    end: "Aug 23",
    position: "Project Manager",
    company: "Cariguru",
  },
  {
    start: "Sep 22",
    end: "Sep 23",
    position: "Frontend Engineer",
    company: "Info Sys Terpadu",
  },
]

function ExperienceItem(props: {
  start: string
  end?: string
  position: string
  company: string
}) {
  const { start, end, position, company } = props

  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="col-span-2 text-sm pt-1 flex items-start justify-start gap-2 h-min text-gray-400">
        <p>{start}</p>
        <hr className="border border-white/20 flex-1 my-auto" />
        <p>{end}</p>
      </div>
      <div className="col-span-4">
        <p>{position}</p>
        <p className="italic text-sm text-gray-400">{company}</p>
      </div>
    </div>
  )
}

export function CardExperience() {
  return (
    <Card className="p-6 pr-8">
      <p>EXPERIENCE</p>
      <div className="flex flex-col col-span-full gap-4 mt-6">
        {EXPERIENCES.map(({ start, end, position, company }) => (
          <ExperienceItem
            key={position}
            start={start}
            end={end}
            position={position}
            company={company}
          />
        ))}
      </div>
    </Card>
  )
}
