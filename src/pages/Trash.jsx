import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { restoreContact, permanentlyDelete } from "../features/contact/contactSlice";
import Swal from "sweetalert2";

const Trash = () => {

    const trash = useSelector(state => state.contactReducer.trash);
    const dispatch = useDispatch();

    const safeTrash = (trash || []).filter(c => c && c.first);

    const initials = c =>
        c?.first ? (c.first[0] + (c.last?.[0] || '')).toUpperCase() : '';

    const fullName = c =>
        c?.first ? `${c.first} ${c.last || ''}` : 'Unknown';

    const COLORS = ['#1a73e8', '#ea4335', '#34a853', '#fbbc04', '#ab47bc', '#ef6c00', '#00838f', '#c62828', '#2e7d32', '#1565c0'];

    const colorFor = name =>
        name ? COLORS[(name.charCodeAt(0) + (name.charCodeAt(1) || 0)) % COLORS.length] : '#ccc';

    const Avatar = ({ contact, size = 40 }) => (
        <div
            className="avatar"
            style={{
                width: size,
                height: size,
                background: contact?.first ? colorFor(contact.first) : '#ccc',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Google Sans',sans-serif",
                fontWeight: 500,
                color: 'white',
                fontSize: size * .4
            }}
        >
            {initials(contact)}
        </div>
    );

    const grouped = useMemo(() => {
        const g = {};

        [...safeTrash]
            .sort((a, b) => fullName(a).localeCompare(fullName(b)))
            .forEach(c => {
                const k = c.last?.[0]?.toUpperCase() || '#';
                (g[k] = g[k] || []).push(c);
            });

        return g;
    }, [safeTrash]);

    if (!safeTrash.length) {
        return (
            <div className="empty-state">
                <i className="bi bi-trash"></i>
                <h3>Trash is empty</h3>
            </div>
        );
    }

    return (
        <div className="page-contacts">
            <div className="contacts-toolbar">
                <h1>Trash</h1>
                <span style={{ fontSize: 13 }}>
                    {safeTrash.length} deleted contacts
                </span>
            </div>

            {Object.keys(grouped).sort().map(letter => (
                <div className="alpha-section" key={letter}>
                    <div className="alpha-header">{letter}</div>

                    {grouped[letter].map(c => (
                        <div key={c.id} className="contact-row">

                            <Avatar contact={c} />

                            <div className="info">
                                <div className="name">{fullName(c)}</div>
                                <div className="sub">{c.email}</div>
                            </div>

                            <div className="row-actions">
                                <button className="icon-btn restore-btn" title="Restore" onClick={() => dispatch(restoreContact(c.id))}>
                                    <i className="bi bi-arrow-counterclockwise"></i>
                                </button>

                                <button
                                    className="icon-btn delete-btn"
                                    title="Delete permanently"
                                    onClick={() => {
                                        Swal.fire({
                                            title: "Are you sure?",
                                            text: "This contact will be permanently deleted!",
                                            icon: "warning",
                                            showCancelButton: true,
                                            confirmButtonColor: "#d33",
                                            confirmButtonText: "Yes, delete"
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                dispatch(permanentlyDelete(c.id));

                                                Swal.fire(
                                                    "Deleted!",
                                                    "Contact has been removed.",
                                                    "success"
                                                );
                                            }
                                        });
                                    }}>
                                    <i className="bi bi-trash"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Trash;