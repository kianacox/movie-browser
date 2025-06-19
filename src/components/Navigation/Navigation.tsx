import { NavLink } from "react-router-dom"
import "./Navigation.css"

export const Navigation: React.FC = () => {
  return (
    <nav className="navigation">
      <section className="navigation-content">
        <h1 className="navigation-title">Movie Browser</h1>
        <ul className="navigation-list">
          <li className="navigation-item">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "navigation-link-active" : ""
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li className="navigation-item">
            <NavLink
              to="/favourites"
              className={({ isActive }) =>
                isActive ? "navigation-link-active" : ""
              }
            >
              Favourites
            </NavLink>
          </li>
        </ul>
      </section>
    </nav>
  )
}
