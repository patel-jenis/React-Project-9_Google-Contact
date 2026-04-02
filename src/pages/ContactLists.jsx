import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

const ContactLists = ({ contacts, q }) => {
    const initials = c => (c.first[0] + c.last[0]).toUpperCase();
    const fullName = c => `${c.first} ${c.last}`;

    const Avatar = ({ contact, size = 40 }) => (
        <div className="avatar" style={{ width: size, height: size, background: colorFor(contact.first), borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Google Sans',sans-serif", fontWeight: 500, color: 'white', fontSize: size * .4, flexShrink: 0 }}>
            {initials(contact)}
        </div>
    );

    const COLORS = ['#1a73e8', '#ea4335', '#34a853', '#fbbc04', '#ab47bc', '#ef6c00', '#00838f', '#c62828', '#2e7d32', '#1565c0'];
    const colorFor = name => COLORS[(name.charCodeAt(0) + (name.charCodeAt(1) || 0)) % COLORS.length];

    const nav = useNavigate();
    const filtered = useMemo(() => {
        const s = q.toLowerCase();
        return contacts.filter(c => fullName(c).toLowerCase().includes(s) || c.email.toLowerCase().includes(s) || c.phone.includes(s));
    }, [contacts, q]);

    const grouped = useMemo(() => {
        const g = {};
        [...filtered].sort((a, b) => fullName(a).localeCompare(fullName(b))).forEach(c => {
            const k = c.last[0].toUpperCase();
            (g[k] = g[k] || []).push(c);
        });
        return g;
    }, [filtered]);

    if (!filtered.length) return (
        <div className="empty-state">
            <i className="bi bi-search"></i>
            <h3>No results for "{q}"</h3>
            <p>Try a different name, email, or phone number.</p>
        </div>
    );

    return (
        <div className="page-contacts">
            <div className="contacts-toolbar">
                <h1>Contacts</h1>
                <span style={{ fontSize: 13, color: 'var(--on-surface-variant)' }}>{filtered.length} contacts</span>
                <button className="sort-btn"><i className="bi bi-sort-alpha-down"></i> Name</button>
            </div>
            {Object.keys(grouped).sort().map(letter => (
                <div className="alpha-section" key={letter}>
                    <div className="alpha-header">{letter}</div>
                    {grouped[letter].map(c => (
                        <Link to={`/contact/${c.id}`} key={c.id} className="contact-row">
                            <Avatar contact={c} />
                            <div className="info">
                                <div className="name">{fullName(c)}</div>
                                <div className="sub">{c.email}</div>
                            </div>
                            <div className="row-actions">
                                <button className="icon-btn" title="Email" onClick={e => e.preventDefault()}><i className="bi bi-envelope"></i></button>
                                <button className="icon-btn" title="Call" onClick={e => e.preventDefault()}><i className="bi bi-telephone"></i></button>
                                <button className="icon-btn" title="More" onClick={e => e.preventDefault()}><i className="bi bi-three-dots-vertical"></i></button>
                            </div>
                        </Link>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default ContactLists