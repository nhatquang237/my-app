import { Link, useMatch, useResolvedPath } from "react-router-dom"
import useAuth from '../hooks/useAuth.js';

export default function Navbar() {
  const {auth} = useAuth();
  return (
    <nav className="nav">
      <ul>
        <CustomLink to="/">Home</CustomLink>
        {!auth.token && <CustomLink to="/login">Login</CustomLink>}
        {!auth.token && <CustomLink to="/register">Sign Up</CustomLink>}
        {auth.token && <CustomLink to="/logout">Logout</CustomLink>}
      </ul>
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}