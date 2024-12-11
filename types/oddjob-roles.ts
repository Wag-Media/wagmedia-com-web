export const ODDJOB_ROLE_OPTIONS: { name: string; value: string }[] = [
  // Website and Discord Bot Development
  { name: "Developer", value: "Developer" },
  { name: "QA and Product Owner", value: "QA and Product Owner" },
  { name: "QA", value: "QA" },
  { name: "Product Owner", value: "Product Owner" },
  { name: "WagTool", value: "WagTool" },
  { name: "Infra", value: "Infra" },
  { name: "Web Designer", value: "Web Designer" },

  // Management / Team
  { name: "Director", value: "Director" },
  { name: "Social Media", value: "Social Media" },
  { name: "Intern", value: "Intern" },
  { name: "Treasury Management", value: "Treasury Management" },
  { name: "Designer", value: "Designer" },

  // Marketing
  { name: "Ads", value: "Ads" },
  { name: "KaitoAI", value: "KaitoAI" },
  { name: "Analytics", value: "Analytics" },
]

export enum OddJobRole {
  Developer = "Developer",
  "QA and Product Owner" = "QA and Product Owner",
  QA = "QA",
  ProductOwner = "Product Owner",
  WagTool = "WagTool",
  Infra = "Infra",
  WebDesigner = "Web Designer",
  Director = "Director",
  SocialMedia = "Social Media",
  Intern = "Intern",
  TreasuryManagement = "Treasury Management",
  Designer = "Designer",
  Ads = "Ads",
  KaitoAI = "KaitoAI",
  Analytics = "Analytics",
}
