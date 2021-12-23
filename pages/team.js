/* This example requires Tailwind CSS v2.0+ */
import Head from 'next/head'
import Header from '../components/header'
import TeamList from '../components/team-list'

export default function Team() {

  const people = [
    {
      name: 'Jane Cooper',
      title: 'Manager',
      role: 'Admin',
      email: 'janecooper@example.com',
      telephone: '+1-202-555-0170',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
      status: 'visible'
    },
    {
      name: 'Max Fischer',
      title: 'Student, Rushmore Academy',
      role: 'Student',
      email: 'max.fischer@rushmore.edu',
      telephone: '+1-555-555-5555',
      imageUrl:
        '/fischer.jpeg',
      status: 'visible'
    },
    {
      name: 'Steve Zissou',
      title: 'Captain, The Elefante',
      role: 'Captain',
      email: 'steve@theelefante.com',
      telephone: '+1-222-555-1111',
      imageUrl:
        '/zissou.jpeg',
      status: 'visible'
    },
    {
      name: 'John McClane',
      title: 'Detective, NYPD',
      role: 'Detective',
      email: 'jmcclane@nypd.gov',
      telephone: '+1-333-555-1111',
      imageUrl:
        '/mcclane.jpeg',
      status: 'visible'
    },  
    {
      name: 'Ender Wiggin',
      title: 'Student, Battle School',
      role: 'Student',
      email: 'ewiggin@battle.edu',
      telephone: '+1-333-555-1111',
      imageUrl:
        '/wiggin.jpeg',
      status: 'visible'
    },            
    // More people...
  ]


  return (
    <>
      <Head>
        <title>Team</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header title="Team" />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <TeamList people={people} filter={true} />
        </div>
      </main>
    </>
  )
}
