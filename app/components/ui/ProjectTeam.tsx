import React from "react";
import LeaderCard from "./LeaderCard";
import SectionTitle from "./SectionTitle";

interface TeamMember {
  full_name: string;
  position: string | null;
  avatar_url: string | null;
  description: string | null;
  projects_count: number | null;
  experience_years: number | null;
  title: string;
}

interface ProjectTeamProps {
  team: TeamMember[];
}

export default function ProjectTeam({ team }: ProjectTeamProps) {
  if (team.length === 0) return null;

  return (
    <>
      <SectionTitle title="Project Team" align="left"   titleColor="text-white" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7 justify-items-center mt-12">
        {team.map((member, i) => (
          <LeaderCard
            key={`team-member-${i}`}
            person={{
              name: member.full_name,
              role: member.title || member.position || "",
              imageSrc: member.avatar_url || undefined,
              title: member.title || member.position || "",
              description: member.description || undefined,
              stats: {
                projects: member.projects_count || 0,
                years: member.experience_years || 0,
                scope: [],
              },
            }}
          />
        ))}
      </div>
    </>
  );
}
