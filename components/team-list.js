import React from 'react'
import { MailIcon, PhoneIcon } from '@heroicons/react/solid'
import { gsap } from 'gsap'
import { Flip } from 'gsap/dist/Flip'

gsap.registerPlugin(Flip);

function classNames(classes) {
  return classes.filter(Boolean).join(' ')
}

export default function TeamList({ people, filter }) {
  const listRef      = React.useRef()
  const flipSelector = gsap.utils.selector(listRef)
  const roles        = Array.from(new Set(people.map(person => person.role)))

  const [allActive, setAllActive] = React.useState(true)

  function layoutReducer(state, action) {
    switch(action.type) {
      /* 
        Add new items to the list that weren't there before
        and set the status to visible to prep the intro animation
      */
      case 'ADD_ITEMS':
        return {
          ...state,
          state: Flip.getState(flipSelector('.c-team-list_item')),
          items: people.filter(person => state.filters.includes(person.role))
                        .map(person => {
                          person.status = 'visible'

                          return person
                        })
        }
      /*
        Remove the items from the DOM, used as a cleanup for the FLIP animation
      */
      case 'REMOVE_ITEMS':
        return {
          ...state,
          items: state.items.filter(item => state.filters.includes(item.role)),
          state: Flip.getState(flipSelector('.c-team-list_item'))
        }              
      case 'UPDATE_STATE':
        return {
          ...state,
          state: Flip.getState(flipSelector('.c-team-list_item'))
        }
      case 'UPDATE_FILTERS':
        // Prep the items that will be removed by flagging them in advance
        const currentItems = state.items.map(item => {
          if( !action.filters.includes(item.role) ) {
            item.status = 'exiting'
          }
          return item
        })

        return {
          ...state,
          filters: [...action.filters],
          items: [...currentItems],
          state: Flip.getState(flipSelector('.c-team-list_item'))
        }
      default:
        throw new Error(`Unsupported type: ${action.type}`)
    }
  }

  const [layout, layoutDispatch] = React.useReducer(layoutReducer, {
    items: [...people],
    filters: [...roles]
  })

  const getFilterClasses = (isActive) => {
    const classes = ['py-1 px-3', 'block', 'rounded']

    if (isActive) {
      classes.push('bg-indigo-500', 'text-white')
    }
    else {
      classes.push('bg-white', 'text-black')
    }

    return classNames(classes)
  }

  const Filters = () => {

    const allToggle = () => {
      // If all filters aren't active, activate them all, otherwise do nothing
      if (!allActive) {
        layoutDispatch({type: 'UPDATE_FILTERS', filters: [...roles]})
        setAllActive(true)
      }
    }

    const handleClick = (role, isActive) => {
      const {filters}  = layout
      const newFilters = isActive ? filters.filter(filter => filter !== role) : [role, ...filters]

      layoutDispatch({
        type: 'UPDATE_FILTERS',
        filters: [...newFilters]
      })

      // Update the items if this filter is being turned on
      if( !isActive ) {
        layoutDispatch({type: 'ADD_ITEMS'})
      }

      // If all filters are selected, set allActive to true
      setAllActive(newFilters.length === roles.length)
    }

    return (
      <div className="mb-8 flex gap-6 items-center text-sm" aria-label="Filter Users by Role">
        <strong>Filter Users</strong>
        <ul role="list" className="flex gap-4">
          <li>
            <button
              type="button"
              aria-pressed={allActive == true}
              className={getFilterClasses(allActive)}
              onClick={allToggle}
            >
              All
            </button>
          </li>
          {roles.map((role, i) => {
            const isActive = layout.filters.includes(role)

            return (
              <li key={`role-${i}`}>
                <button
                  type="button"
                  aria-pressed={isActive}
                  className={getFilterClasses(isActive)}
                  onClick={() => handleClick(role, isActive)}
                >
                  {role}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  // We use this to ensure updates happen after DOM manipulation
  React.useLayoutEffect(() => {

    if( !layout.state ) return
    
    const timeline = Flip.from(layout.state, {
      absolute: true, 
      ease: "power1.inOut",
      targets: flipSelector('.c-team-list_item'),
      scale: true,
      simple: true,
      onEnter: elements => {
        return gsap.fromTo(elements, { 
          opacity: 0,
          scale: 0
        }, { 
          opacity: 1,
          scale: 1,
          delay: .4,
          duration: .2
        });
      },
      onLeave: elements => {
        return gsap.to(elements, { 
          opacity: 0, 
          scale: 0 
        });
      }
    })

    // Remove any items that are being hidden after the animation exits
    timeline.add(() => layoutDispatch({type: 'REMOVE_ITEMS'}));

  }, [layout.filters])  


  return (
    <>
      {filter === true ?
        <Filters />
        : null}
      <ul role="list" className="c-team-list grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" ref={listRef}>
        {layout.items?.map(person => (
          <li
            key={person.email}
            className={`c-team-list_item col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200 ${person?.status === 'exiting' ? 'hidden' : ''} `}
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
        ))}
      </ul>
    </>
  )
}