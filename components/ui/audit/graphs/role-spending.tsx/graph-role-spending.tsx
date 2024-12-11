"use server"

import {
  Spending,
  getSpendingsContent,
  getSpendingsDevelopmentTooling,
  getSpendingsFinders,
  getSpendingsGroupedByRole,
  getSpendingsMarketing,
  getSpendingsNewsletter,
  getSpendingsTeam,
} from "@/actions/get-spending"

import { GraphRoleSpendingBars } from "./graph-role-spending-bars"
import { GraphRoleSpendingDetail } from "./graph-role-spending-detail"

// Content Creations (English + Non-Anglo) - $96,200 (We will start with a fixed amount of DOT based on current price, should be adjustable, USDC prices should be converted to DOT at a fix price of $5/DOT (or the amount we decide)), we should always use a disclaimer for the budget allocations.
// Newsletter + Finders Program - $52,000 (Will fix an amount of DOT, which can be updated later.)
// Development + Tooling - $94,500 (Developer, QA and Product Owner, QA, Product Owner, WagTool, Infra, Web Designer, WagTool Maintenance/Bug Squash)
// Marketing - $38,000 (Social Media, Intern, Ads, KaitoAI, Analytics)
// Team - 167,700 (Director, Treasury Management, Designer)

const BUDGET_CONTENT = 96200
const BUDGET_NEWSLETTER_FINDERS = 52000
const BUDGET_DEVELOPMENT_TOOLING = 94500
const BUDGET_MARKETING = 38000
const BUDGET_TEAM = 167700

export async function GraphsRoleSpending() {
  const DOTUSD_RATE = 5

  const [content, newsletter, developmentTooling, marketing, team] =
    await Promise.all([
      getSpendingsContent(),
      getSpendingsNewsletter(),
      getSpendingsDevelopmentTooling(),
      getSpendingsMarketing(),
      getSpendingsTeam(),
    ])

  const chartData = [
    { role: "Content", ...content },
    { role: "Newsletter", ...newsletter },
    { role: "Development and Tooling", ...developmentTooling },
    { role: "Marketing", ...marketing },
    { role: "Team", ...team },
  ]

  // const chartData = await getSpendingsGroupedByRole()

  // const budgets: [number, Promise<Spending>, string, string][] = [
  //   [
  //     BUDGET_CONTENT,
  //     getSpendingsContent(DOTUSD_RATE),
  //     "content",
  //     "description content",
  //   ],
  //   [
  //     BUDGET_NEWSLETTER_FINDERS,
  //     getSpendingsNewsletter(),
  //     "newsletter + finders",
  //     "description newsletter + finders",
  //   ],
  //   [
  //     BUDGET_DEVELOPMENT_TOOLING,
  //     getSpendingsDevelopmentTooling(),
  //     "development + tooling",
  //     "description development + tooling",
  //   ],
  //   [
  //     BUDGET_MARKETING,
  //     getSpendingsMarketing(),
  //     "marketing",
  //     "description marketing",
  //   ],
  //   [BUDGET_TEAM, getSpendingsTeam(), "team", "description team"],
  //   [20000, getSpendingsNewsletter(), "newsletter", "description newsletter"],
  // ]

  return (
    <>
      {/* {budgets.map(([budget, spendingsQuery, title, description]) => (
        <GraphRoleSpendingDetail
          key={title}
          budget={budget}
          spendingsQuery={spendingsQuery}
          title={title}
          description={description}
        />
      ))} */}
      <GraphRoleSpendingBars chartData={chartData} />
    </>
  )
}
