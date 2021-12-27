/* This example requires Tailwind CSS v2.0+ */
import Head from 'next/head'
import Header from '../components/header'
import { PageTransition } from '../components/transitions'

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header title="Dashboard" />
      <main>    
        <PageTransition>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-4 sm:px-0">
              <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
            </div>
          </div>
        </PageTransition>    
      </main>
    </>
  )
}