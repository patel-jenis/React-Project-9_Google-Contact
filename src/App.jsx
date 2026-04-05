import { useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import ContactLists from './pages/ContactLists';
import ContactDetail from './pages/ContactDetail';
import ContactForm from './pages/ContactForm';
import PlaceholderPage from './pages/PlaceholderPage';
import { useSelector } from 'react-redux';

const App = () => {
    const [q, setQ] = useState('');
    // const [contacts, setContacts] = useState(SEED);
    const contacts = useSelector((state) => state.contactReducer.contacts)

    return (
        <BrowserRouter>
            <TopBar q={q} setQ={setQ} />
            <div className='pt-64'></div>
            <div className="app-layout">
                <Sidebar />
                <main className="main">
                    <Routes>
                        <Route path="/" element={<ContactLists contacts={contacts} q={q} />} />
                        <Route path="/contact/:id" element={<ContactDetail contacts={contacts} />} />
                        <Route path="/new" element={<ContactForm contacts={contacts} />} />
                        <Route path="/edit/:id" element={<ContactForm contacts={contacts} edit />} />
                        <Route path="/frequent" element={<PlaceholderPage icon="bi-clock-history" title="Frequently contacted" desc="People you contact most will appear here." />} />
                        <Route path="/directory" element={<PlaceholderPage icon="bi-building" title="Directory" desc="Your organization's contacts will appear here." />} />
                        <Route path="/label/:name" element={<PlaceholderPage icon="bi-bookmark" title="Labels" desc="Contacts you've labeled will appear here." />} />
                        <Route path="/trash" element={<PlaceholderPage icon="bi-trash" title="Trash" desc="Deleted contacts stay here for 30 days." />} />
                        <Route path="/merge" element={<PlaceholderPage icon="bi-intersect" title="Merge & fix" desc="Duplicate contacts will appear here." />} />
                        <Route path="/import" element={<PlaceholderPage icon="bi-upload" title="Import contacts" desc="Upload a CSV or vCard file." />} />
                        <Route path="/export" element={<PlaceholderPage icon="bi-download" title="Export contacts" desc="Download your contacts as a CSV or vCard." />} />
                    </Routes>
                </main>
            </div>

            <Link to="/new" className="fab d-flex d-md-none" title="New contact">
                <i className="bi bi-plus-lg"></i>
            </Link>
        </BrowserRouter>
    )
}

export default App