import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
    const navItems = [
        { to: '/', icon: 'bi-people', label: 'Contacts' },
        { to: '/frequent', icon: 'bi-star', label: 'Favorites' }, // ✅ updated
        { to: '/directory', icon: 'bi-building', label: 'Directory' },
    ];

    const labelItems = [
        { to: '/label/friends', icon: 'bi-bookmark', label: 'Friends' },
        { to: '/label/work', icon: 'bi-briefcase', label: 'Work' },
        { to: '/label/family', icon: 'bi-house-heart', label: 'Family' },
    ];

    return (
        <nav className="sidebar">
            <Link to="/new" className="create-btn">
                <i className="bi bi-plus"></i> Create contact
            </Link>

            {navItems.map(it => (
                <NavLink
                    key={it.to}
                    to={it.to}
                    end
                    className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}
                >
                    <i className={`bi ${it.icon}`}></i>
                    <span>{it.label}</span>
                </NavLink>
            ))}

            <hr className="nav-divider" />

            <div className="nav-section-label">Labels</div>

            {labelItems.map(it => (
                <NavLink
                    key={it.to}
                    to={it.to}
                    className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}
                >
                    <i className={`bi ${it.icon}`}></i>
                    <span>{it.label}</span>
                </NavLink>
            ))}

            <hr className="nav-divider" />

            <NavLink
                to="/trash"
                className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}
            >
                <i className="bi bi-trash"></i>
                <span>Trash</span>
            </NavLink>

            <NavLink
                to="/merge"
                className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}
            >
                <i className="bi bi-intersect"></i>
                <span>Merge & fix</span>
            </NavLink>

            <NavLink
                to="/import"
                className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}
            >
                <i className="bi bi-upload"></i>
                <span>Import</span>
            </NavLink>

            <NavLink
                to="/export"
                className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}
            >
                <i className="bi bi-download"></i>
                <span>Export</span>
            </NavLink>
        </nav>
    );
};

export default Sidebar;