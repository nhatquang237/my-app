import { Link, useMatch, useResolvedPath } from "react-router-dom"
import useAuth from '../hooks/useAuth.js';

export default function Navbar() {
  const {auth} = useAuth();
  return (
    <nav className="nav">
      <ul>
        <CustomLink to="/">Trang chủ</CustomLink>
        <CustomLink to="/login">Đăng nhập</CustomLink>
        <CustomLink to="/register">Đăng ký</CustomLink>
        {auth.token && <CustomLink to="/logout">Đăng xuất</CustomLink>}
        {/* {!auth.token && <CustomLink to="/login">Đăng nhập</CustomLink>}
        {!auth.token && <CustomLink to="/register">Đăng ký</CustomLink>} */}
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