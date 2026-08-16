import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { socialEntries } from "@/lib/format";
import type { TeamMember } from "@/types";

interface TeamCardProps {
  member: TeamMember;
}

export function TeamCard({ member }: TeamCardProps) {
  const links = socialEntries(member.social);

  return (
    <article className="group overflow-hidden rounded-[1.4rem] bg-[#e8efe9]">
      <div className="aspect-[4/5] overflow-hidden">
        {member.photo ? (
          <ImageWithFallback
            src={member.photo}
            alt={member.name}
            className="h-full w-full object-cover object-[center_20%] transition duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full items-end p-6">
            <span className="font-serif text-6xl text-primary/30">{member.initials}</span>
          </div>
        )}
      </div>
      <div className="p-5">
        <p className="text-xs uppercase tracking-[0.18em] text-muted">{member.designation}</p>
        <h3 className="mt-2 font-serif text-2xl">{member.name}</h3>
        {member.shortBio ? <p className="mt-2 text-sm text-muted">{member.shortBio}</p> : null}
        {links.length ? (
          <ul className="mt-4 flex gap-3 text-xs uppercase tracking-[0.14em]">
            {links.map(([network, href]) => (
              <li key={network}>
                <a href={href} className="hover:text-primary" target="_blank" rel="noreferrer">
                  {network}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}

interface TeamGridProps {
  members: TeamMember[];
}

export function TeamGrid({ members }: TeamGridProps) {
  if (!members.length) return null;

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(240px,1fr))]">
      {members.map((member) => (
        <TeamCard key={member.id} member={member} />
      ))}
    </div>
  );
}
