import { RecipeList } from '../components/RecipeList.jsx'
import { CreateRecipe } from '../components/CreateRecipe.jsx'
import { RecipeFilter } from '../components/RecipeFilter.jsx'
import { RecipeSorting } from '../components/RecipeSorting.jsx'
import { useQuery } from '@tanstack/react-query'
import { getRecipes } from '../api/recipes.js'
import { useState, useEffect } from 'react'
import { Header } from '../components/Header.jsx'
import { Helmet } from 'react-helmet-async'

import { socket } from '../socket.js'
import { NotificationPopup } from '../components/NotificationPopup.jsx'

export function Blog() {
  // Use states of the BLog application ===================
  /* 
    Note:  The default states are the following:
    -- author, setAuthor: undefined
    -- sortBy, setSortby: created at date ['createdAt]
    -- sortOrder, setSortOrder: descending 
  */
  const [author, setAuthor] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('descending')

  const [notification, setNotification] = useState(null)

  // SOCKET.IO STUFF ================================================

  useEffect(() => {
    const handleNotification = (data) => {
      setNotification(data)
    }

    socket.on('receive_notification', handleNotification)

    // Cleanup function to remove the listener when the component unmounts
    return () => {
      socket.off('receive_notification', handleNotification)
    }
  }, [])

  const closeNotification = () => {
    setNotification(null)
  }

  // END SOCKET.IO STUFF =============================================

  // Create a usequery instance ===========================
  /* 
    Note:  Will use the getRecipes API to make 
    the call to get the recipes  
  */
  const recipesQuery = useQuery({
    queryKey: ['recipes', { author, sortBy, sortOrder }],
    queryFn: () => getRecipes({ author, sortBy, sortOrder }),
  })

  // Get the data from the query ============================
  const recipes = recipesQuery.data ?? []

  return (
    <div style={{ padding: 10 }}>
      <Helmet>
        <title>The Recipe Blog Home Page</title>
      </Helmet>
      <Header />
      <NotificationPopup
        message={notification?.message}
        type={notification?.type}
        link={notification?.link}
        onClose={closeNotification}
      />
      <CreateRecipe />
      <br />
      <hr />
      <b>Filter by:</b>
      <RecipeFilter
        field='author'
        value={author}
        onChange={(value) => setAuthor(value)}
      />
      <br />
      <hr />
      <RecipeSorting
        fields={['createdAt', 'updatedAt']}
        value={sortBy}
        onChange={(value) => setSortBy(value)}
        orderValue={sortOrder}
        onOrderChange={(orderValue) => setSortOrder(orderValue)}
      />
      <hr />
      <h2>Click on one of the recipes below to see more information.</h2>
      <div
        style={{
          maxHeight: '600px',
          maxWidth: '600px',
          overflowY: 'scroll',
          overflowX: 'scroll',
          border: '3px solid #ccc',
          padding: '50px',
        }}
      >
        <RecipeList recipes={recipes} />
      </div>
    </div>
  )
}
