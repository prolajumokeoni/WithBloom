import { useContext } from 'react';
import { UserContext } from '../contexts/user.context'
import { Link } from 'react-router-dom';
import { signOutUser } from '../utils/firebase/firebase.utils';

const Navigation = () => {
	const { currentUser } = useContext(UserContext);

	return (
		<div>
		{currentUser? (<span onClick={signOutUser}>Sign out</span>) :
		(<Link to='/signin'>
			Sign In
		</Link>)
		}
		</div>
	)
}

export default Navigation;