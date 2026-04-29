import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteContact } from "../features/contact/contactSlice";

const ContactDetail = ({ contacts }) => {

    const dispatch = useDispatch();

    const COLORS = ['#1a73e8', '#ea4335', '#34a853', '#fbbc04', '#ab47bc', '#ef6c00', '#00838f', '#c62828', '#2e7d32', '#1565c0'];
    const colorFor = name => COLORS[(name.charCodeAt(0) + (name.charCodeAt(1) || 0)) % COLORS.length];

    const initials = c => (c.first[0] + c.last[0]).toUpperCase();
    const fullName = c => `${c.first} ${c.last}`;

    const { id } = useParams();
    const nav = useNavigate();
    const c = contacts.find(x => x.id === parseInt(id));
    if (!c) return <div className="empty-state"><i className="bi bi-person-x"></i><h3>Contact not found</h3></div>;

    return (
        <div className="detail-page">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
                <button className="icon-btn" onClick={() => nav(-1)} title="Back"><i className="bi bi-arrow-left"></i></button>
                <div style={{ flex: 1 }}></div>
                <Link to={`/edit/${c.id}`} className="icon-btn" title="Edit"><i className="bi bi-pencil"></i></Link>
                <button className="icon-btn" title="Favorite"><i className="bi bi-star"></i></button>
                <button className="icon-btn" title="More"><i className="bi bi-three-dots-vertical"></i></button>
            </div>

            <div className="detail-hero">
                <div className="avatar-lg" style={{ width: 96, height: 96, background: colorFor(c.first), borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, color: 'white', fontFamily: "'Google Sans',sans-serif" }}>
                    {initials(c)}
                </div>
                <div className="name-area">
                    <h2>{fullName(c)}</h2>
                    {c.company && <p>{c.company}</p>}
                    <div style={{ marginTop: 8, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        <span className="chip"><i className="bi bi-person"></i> {c.label}</span>
                    </div>
                </div>
            </div>

            <div className="detail-actions">
                <button className="detail-action-btn"><i className="bi bi-telephone"></i> Call</button>
                <button className="detail-action-btn"><i className="bi bi-envelope"></i> Email</button>
                <button className="detail-action-btn"><i className="bi bi-chat"></i> Message</button>
                <button className="detail-action-btn"><i className="bi bi-camera-video"></i> Video</button>
                <button
                    className="detail-action-btn"
                    onClick={() => {
                        dispatch(deleteContact(parseInt(id)));
                        nav('/');
                    }}
                >
                    <i className="bi bi-trash"></i> Delete
                </button>
                <button className="detail-action-btn"><i className="bi bi-three-dots"></i> More</button>
            </div>

            <hr style={{ borderColor: 'var(--outline)', margin: '24px 0' }} />

            <div className="detail-section">
                <div className="detail-section-title">Contact info</div>
                <div className="detail-field">
                    <i className="bi bi-telephone"></i>
                    <div className="detail-field-body">
                        <div className="detail-field-value">{c.phone}</div>
                        <div className="detail-field-label">{c.label}</div>
                    </div>
                </div>
                <div className="detail-field">
                    <i className="bi bi-envelope"></i>
                    <div className="detail-field-body">
                        <div className="detail-field-value">{c.email}</div>
                        <div className="detail-field-label">Personal</div>
                    </div>
                </div>
                {c.company && (
                    <div className="detail-field">
                        <i className="bi bi-building"></i>
                        <div className="detail-field-body">
                            <div className="detail-field-value">{c.company}</div>
                            <div className="detail-field-label">Company</div>
                        </div>
                    </div>
                )}
            </div>

            <div className="detail-section">
                <div className="detail-section-title">Other</div>
                <div className="detail-field">
                    <i className="bi bi-calendar3"></i>
                    <div className="detail-field-body">
                        <div className="detail-field-value">Add birthday</div>
                        <div className="detail-field-label">Birthday</div>
                    </div>
                </div>
                <div className="detail-field">
                    <i className="bi bi-geo-alt"></i>
                    <div className="detail-field-body">
                        <div className="detail-field-value">Add address</div>
                        <div className="detail-field-label">Address</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ContactDetail