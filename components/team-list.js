import React from 'react'
import { MailIcon, PhoneIcon } from '@heroicons/react/solid'
import { gsap } from 'gsap'
import { Flip } from 'gsap/dist/Flip'

gsap.registerPlugin(Flip);

function classNames(classes) {
  return classes.filter(Boolean).join(' ')
}

export default function TeamList({people, filter}) {

  const roles = Array.from( new Set(people.map(person => person.role)) )

  const [allActive, setAllActive]          = React.useState(true)
  const [activeFilters, setActiveFilters]  = React.useState([...roles])
  const [listItemState, setListItemState] = React.useState({})

  const getFilterClasses = (isActive) => {
    const classes   = ['py-1 px-3', 'block', 'rounded']

    if( isActive ) {
      classes.push('bg-indigo-500', 'text-white')
    }
    else {
      classes.push('bg-white', 'text-black')
    }

    return classNames(classes)
  }

  const Filters = () => {
    const filterRef     = React.useRef()
    const selector      = gsap.utils.selector(filterRef)
    const allToggle     = () => {
      // If all filters aren't active, activate them all, otherwise do nothing
      if( !allActive ) {
        setActiveFilters([...roles])
        setAllActive(true)
      }
    }

    const handleClick = (role, isActive) => {     
      setListItemState(Flip.getState(selector('.c-team-list_item')))

      if( isActive ) {
        setActiveFilters(prevFilters => prevFilters.filter((filterRole) => filterRole !== role))
      }
      else {
        setActiveFilters(prevFilters => [...prevFilters, role])
      }
    }

    React.useEffect(() => {
      setAllActive( activeFilters.length === roles.length )
      
      Flip.from(listItemState, {
        duration: 1,
        ease: "power1.inOut",
        absolute: true        
      })
      
    }, [activeFilters])

    return (
      <div className="mb-8 flex gap-6 items-center text-sm" aria-label="Filter Users by Role">
        <strong>Filter Users</strong> 
        <ul role="list" className="flex gap-4" ref={filterRef}> 
          <li>
            <button 
              type="button" 
              aria-pressed={ allActive == true }
              className={ getFilterClasses(allActive) }
              onClick={allToggle}
            >
              All
            </button>
          </li>        
          { roles.map((role) => {
            const isActive = activeFilters.includes(role)

            return (
              <li>
                <button 
                  type="button" 
                  aria-pressed={ isActive }
                  className={ getFilterClasses(isActive) }
                  onClick={() => handleClick(role, isActive) }
                >
                  { role }
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  
  return (
    <>
      { filter === true ? 
        <Filters />
      : null }
      <ul role="list" className="c-team-list grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {people.map((person) => activeFilters.includes(person.role) || allActive ? (       
            <li
              key={person.email}
              className={`c-team-list_item col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200 ${ !activeFilters.includes(person.role) && !allActive ? 'hidden' : ''}`}
            >
              <div className="flex-1 flex flex-col p-8">
                <img className="w-32 h-32 flex-shrink-0 mx-auto rounded-full block object-cover" src={person.imageUrl} alt="" />
                <h3 className="mt-6 text-gray-900 text-sm font-medium">{person.name}</h3>
                <dl className="mt-1 flex-grow flex flex-col justify-between">
                  <dt className="sr-only">Title</dt>
                  <dd className="text-gray-500 text-sm">{person.title}</dd>
                  <dt className="sr-only">Role</dt>
                  <dd className="mt-3">
                    <span className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                      {person.role}
                    </span>
                  </dd>
                </dl>
              </div>
              <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                  <div className="w-0 flex-1 flex">
                    <a
                      href={`mailto:${person.email}`}
                      className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                    >
                      <MailIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                      <span className="ml-3">Email</span>
                    </a>
                  </div>
                  <div className="-ml-px w-0 flex-1 flex">
                    <a
                      href={`tel:${person.telephone}`}
                      className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                    >
                      <PhoneIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                      <span className="ml-3">Call</span>
                    </a>
                  </div>
                </div>
              </div>
            </li>
        ) : null )}
      </ul>
    </>
  )
}