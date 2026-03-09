import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/common/SanPavicon.svg';
import { site } from '../data/siteContent';

function Nav() {
  return (
    <nav className="nav">
      <Link to="/" className="nav-brand">
        <Logo className="logo" />
        <div className="nav-brand-text">
          <span className="nav-brand-name">{site.name}</span>
          <span className="nav-brand-sub">{site.tagline}</span>
        </div>
      </Link>
      <div className="nav-links">
        {site.navLinks.map((link) =>
          link.to ? (
            <Link key={link.label} to={link.to}>{link.label}</Link>
          ) : (
            <a key={link.label} href={link.href}>{link.label}</a>
          )
        )}
      </div>
    </nav>
  );
}

export default Nav;
