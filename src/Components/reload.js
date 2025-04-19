import { Navigate } from 'react-router'
import { useParams } from 'react-router-dom'

export default function Redir()
{
  const { "*": path } = useParams()
  return <Navigate to={'/'.concat(path)} />
}