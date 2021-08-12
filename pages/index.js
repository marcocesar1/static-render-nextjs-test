import Link from 'next/link';

export default function Home({ users }) {

  return (
    <main>
        <h1>Lista Usuarios</h1>
        <ul>
            {
                users.map(user => (
                    <li key={user.id}>
                        <Link href={`/user/${encodeURIComponent(user.id)}`}>
                            <a>Name: { user.name }</a>
                        </Link>
                    </li>
                ))
            }
        </ul>
        <p>Welcome to my homepage!</p>
    </main>
  )
}

export async function getStaticProps(context) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users`)
    const users = await res.json()
  
    if (!users) {
      return {
        notFound: true,
      }
    }
  
    return {
        props: { 
            users 
        } // will be passed to the page component as props
    }
  }