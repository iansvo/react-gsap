/* This example requires Tailwind CSS v2.0+ */
import Head from 'next/head'
import { useEffect } from 'react'
import Header from '../components/header'
import TeamList from '../components/team-list'
import { PageTransition } from '../components/transitions'
import { allTeamMembers } from './api/team/all'

export default function Team() {

  return (
    <>
      <Head>
        <title>Team</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header title="Team" />
      <main>
        <PageTransition>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <TeamList people={allTeamMembers} filter={true} />
          </div>
        </PageTransition>
      </main>
    </>
  )
}
