export const allTeamMembers = [
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
]

export default function handler(req, res) {
  res.status(200).json(allTeamMembers)
}