import { useEffect, useState } from 'react'
import './App.css'
import { type User } from './types.d';
import { UsersList } from './components/UsersList';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [showColors, setShowColors] = useState(false);
  const [sortByCountry, setSortByCountry] = useState(false);

  const toggleColors = () => setShowColors(!showColors);

  const toggleByCountry = () => setSortByCountry(!sortByCountry)

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=100")
      .then(res => res.json())
      .then(res => {
        setUsers(res.results)
      })
      .catch(err => {
        console.error(err);
      })

  }, [])

  const sortedUsers = sortByCountry ? [...users].sort((a, b) => {
    return a.location.country.localeCompare(b.location.country);
  }) : users;

  return (
    <>
      <header style={{ marginBottom: "50px" }}>
        <h1>Prueba Técnica</h1>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <button onClick={toggleColors}>Colorear Files</button>
          <button onClick={toggleByCountry}>
            {
              sortByCountry ? "Ordenar por País" : "No ordenar por País"
            }
          </button>
        </div>
      </header>

      <main>
        <UsersList users={sortedUsers} showColors={showColors} />
      </main>
    </>
  )
}

export default App
