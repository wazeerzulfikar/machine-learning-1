/**
 * logout-action.jsx: send logout status to the redux store.
 *
 * Note: this script implements jsx (reactjs) syntax.
 *
 */

function setLogoutState() {
    return {
        type: 'LOGGED-OUT',
        name: 'anonymous'
    };
}

// indicate which class can be exported, and instantiated via 'require'
export default setLogoutState
