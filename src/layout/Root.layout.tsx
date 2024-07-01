import React from 'react'

import Stats from '@/components/GradeStats/Stats.component'
import GradeTable from '../components/GradeTable/Table'
import Brief from '../components/Header/Brief.component'
import Title from '../components/Header/Title.component'
import { ModeToggle } from '../components/Navigation/ModeToggle.component'

const TanStackRouterDevtools = import.meta.env.PROD
  ? () => null
  : React.lazy(() =>
      import('@tanstack/router-devtools').then(res => ({
        default: res.TanStackRouterDevtools
      }))
    )

export function Root() {
  return (
    <div className="container mb-12">
      <nav className="flex justify-end py-8 mb-10">
        <ModeToggle />
      </nav>
      <div className="container border rounded-[0.5rem] bg-background max-w-screen-xl py-8 space-y-8">
        <header className="space-y-2">
          <Title />
          <Brief />
        </header>
        <main className="space-y-8">
          <Stats />
          <GradeTable />
        </main>
      </div>
      <TanStackRouterDevtools />
    </div>
  )
}
