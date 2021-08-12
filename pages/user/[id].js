const User = ({ user }) => {

  console.log( user );
  const { name, username, email } = user;
  return (
    <div>
      <p>{ name }</p>
      <p>{ username }</p>
      <p>{ email }</p>
    </div>
  )
}

export async function getStaticPaths() {
  console.log('se llama!')
  // Call an external API endpoint to get posts
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  const users = await res.json()

  // Get the paths we want to pre-render based on posts
  const paths = users.map((user) => ({
    params: { id: user.id.toString() },
  }))

  console.log( paths )

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`)
  const post = await res.json()

  // Pass post data to the page via props
  return { props: { user: post } }
}

export default User;