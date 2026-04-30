import { useSelector } from "react-redux";
import ContactLists from "./ContactLists";

const Favorites = ({ q }) => {
    const contacts = useSelector(state => state.contactReducer.contacts);

    const favoriteContacts = contacts.filter(c => c.favorite);

    if (!favoriteContacts.length) {
        return (
            <div className="empty-state">
                <i className="bi bi-star"></i>
                <h3>No favorite contacts</h3>
                <p>Mark contacts as favorite to see them here.</p>
            </div>
        );
    }

    return <ContactLists contacts={favoriteContacts} q={q} />;
};

export default Favorites;