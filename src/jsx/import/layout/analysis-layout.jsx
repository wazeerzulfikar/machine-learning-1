/**
 * analysis-layout.jsx: general analysis layout.
 *
 * Note: this script implements jsx (reactjs) syntax.
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import SupportVector from '../content/support-vector.jsx';

var AnalysisLayout = React.createClass({
    render: function() {
      // destructure react-router
        var {
            content,
            session_type_value
        } = this.props;

      // default value: content
        if (!content) {
            var content = null;
        }

      // default value: session value
        if (!session_type_value || !session_type_value.key) {
            var session_type_value = '--Select--';
        }

        return(
            <div className='analysis-container'>
                <SupportVector
                    sessionType={content}
                    sessionTypeValue={session_type_value}
                    submitSvButton={this.props.page.submit_button.analysis}
                />
            </div>
        );
    }
});

// indicate which class can be exported, and instantiated via 'require'
export default AnalysisLayout
