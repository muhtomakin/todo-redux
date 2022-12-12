import React from 'react'
import ContentFooter from './ContentFooter'
import TodoList from './TodoList'

const Content = () => {
  return (
    <>
        <section className='main'>
            <input className='toggle-all' type='checkbox'/>
            <label htmlfor='toggle-all'>Mark all as complete</label>

            <TodoList />
        </section>
        <ContentFooter />
    </>
  )
}

export default Content