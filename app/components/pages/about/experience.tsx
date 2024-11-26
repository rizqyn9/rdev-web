import { Card } from "./card.tsx"

type Experience = {
  start: string
  end: string
  position: string
  company: string
  href?: string
}

const EXPERIENCES: Experience[] = [
  {
    start: "Jun 24",
    end: "Now",
    position: "Frontend Engineer",
    company: "Bitlabs",
  },
  {
    start: "Feb 24",
    end: "Sep 24",
    position: "Dev Lead",
    company: "Metaverspad (GGG)",
  },
  {
    start: "Feb 23",
    end: "Feb 24",
    position: "Dev Lead",
    company: "Good Games Guild (GGG)",
  },
  {
    start: "Sep 22",
    end: "Feb 23",
    position: "Cloud Architect",
    company: "Good Games Guild (GGG)",
  },
  {
    start: "Jan 22",
    end: "Sep 22",
    position: "Backend Engineer",
    company: "Good Games Guild (GGG)",
  },
  {
    start: "Aug 22",
    end: "Sep 23",
    position: "Frontend Engineer",
    company: "Info Sys Terpadu",
  },
  {
    start: "Jan 23",
    end: "Aug 23",
    position: "Project Manager",
    company: "Cariguru",
    href: "https://kelas.paudnesia.com/",
  },
  {
    start: "May 22",
    end: "Jan 23",
    position: "Lead Web Engineer",
    company: "Cariguru",
    href: "https://kelas.paudnesia.com/",
  },
  {
    start: "Feb 22",
    end: "May 22",
    position: "Fullstack Engineer",
    company: "Cariguru",
    href: "https://kelas.paudnesia.com/",
  },
  {
    start: "Jan 22",
    end: "Aug 22",
    position: "Frontend Engineer",
    company: "Blups Asia",
  },
  {
    start: "Mar 21",
    end: "Mar 22",
    position: "Lead Engineer",
    company: "Lingotalk",
    href: "https://lingotalk.org",
  },
  {
    start: "Dec 21",
    end: "Mar 21",
    position: "Backend Engineer",
    company: "Lingotalk",
    href: "https://lingotalk.org",
  },
  {
    start: "Sep 21",
    end: "Feb 22",
    position: "Backend Engineer",
    company: "PT. Sinarmas Asset Management",
    href: "https://www.sinarmas-am.co.id/id/",
  },
  {
    start: "Aug 21",
    end: "Dec 22",
    position: "Backend Engineer",
    company: "PT. Sinarmas Asset Management",
    href: "https://www.sinarmas-am.co.id/id/",
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
        {EXPERIENCES.map(({ start, end, position, company }, idx) => (
          <ExperienceItem
            key={idx}
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
