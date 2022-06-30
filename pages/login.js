import { getProviders, signIn } from 'next-auth/react'

const Login = ({ providers }) => {
  return (
    <div>
      <img className='w-52 mb-5' src='https://links.papareact.com/9xl' alt='logo imagem principal'/>
    </div>
  )
}

export default Login

export const getServerSideProps = async () => {
  const providers = await getProviders();

  return {
    props: {
      providers,
    }
  }
}