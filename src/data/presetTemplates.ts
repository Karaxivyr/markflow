export type PresetId = "markdown" | "bio" | "project" | "discord";

export interface PresetOption {
  id: PresetId;
  label: string;
  description: string;
}

export const presetOptions: PresetOption[] = [
  {
    id: "markdown",
    label: "Plain Markdown",
    description:
      "Freeform writing mode for cleanup, note shaping, and general markdown drafting.",
  },
  {
    id: "bio",
    label: "Bio Mode",
    description:
      "Fast structure for profile bios, intros, identity blurbs, and creator summaries.",
  },
  {
    id: "project",
    label: "Project Summary",
    description:
      "Overview, stack, status, and notes for small apps, repos, experiments, and tools.",
  },
  {
    id: "discord",
    label: "Discord Announcement",
    description:
      "A short announcement structure with headline, details, reminders, and readable spacing.",
  },
];

export function getPresetTemplate(presetId: PresetId): string {
  switch (presetId) {
    case "bio":
      return [
        "# Your Name",
        "",
        "**Role / Focus**",
        "",
        "A short, clear bio that explains who you are, what you make, and what direction you are moving in.",
        "",
        "- Strength or focus",
        "- Interest or specialty",
        "- Current goal or direction",
      ].join("\n");

    case "project":
      return [
        "# Project Name",
        "",
        "## Overview",
        "One clear sentence on what this project is, who it is for, and why it exists.",
        "",
        "## Stack",
        "- Vue 3",
        "- Vite",
        "- SCSS",
        "",
        "## Status",
        "> In progress",
        "",
        "## Notes",
        "- What is already working",
        "- What still needs cleanup",
        "- What comes next",
      ].join("\n");

    case "discord":
      return [
        "# Announcement Title",
        "",
        "Short opening line that explains the update clearly and quickly.",
        "",
        "## Details",
        "- Key point one",
        "- Key point two",
        "- Key point three",
        "",
        "> Note: Add a reminder, call to action, or follow-up detail here.",
      ].join("\n");

    case "markdown":
    default:
      return "";
  }
}
