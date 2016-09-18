/**
 * user_menu.jsx: menu for logged-in, and anonymous users.
 *
 * Note: this script implements jsx (reactjs) syntax.
 */

var UserMenu = React.createClass({
  // display result
    render: function() {
        return(
            <nav className='main-navigation'>
                <a href='/login' className='btn btn-primary'>Sign in</a>
                <a href='/register' className='btn'>Sign up</a>
            </nav>
        );
    }
});

// render form
ReactDOM.render(<UserMenu/>, document.querySelector('.container'));