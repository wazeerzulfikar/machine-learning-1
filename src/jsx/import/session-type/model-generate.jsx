/**
 * model-generate.jsx: append 'model_generate' fieldset.
 *
 * @ModelGenerate, must be capitalized in order for reactjs to render it as a
 *     component. Otherwise, the variable is rendered as a dom node.
 *
 * Note: this script implements jsx (reactjs) syntax.
 */

import React from 'react';
import checkValidString from '../validator/valid-string.js';
import checkValidInt from '../validator/valid-int.js';
import Spinner from '../general/spinner.jsx';
import setSvButton from '../redux/action/page-action.jsx';

var ModelGenerate = React.createClass({
  // initial 'state properties'
    getInitialState: function() {
        return {
            value_session_id: '--Select--',
            value_model_type: '--Select--',
            ajax_done_options: null,
            ajax_done_error: null,
            ajax_fail_error: null,
            ajax_fail_status: null
        };
    },
  // update 'state properties'
    changeSessionId: function(event){
        var sessionId  = event.target.value;
        var modelType  = this.state.value_model_type;
        var kernelType = this.state.value_kernel_type;

        if (
            sessionId && sessionId != '--Select--' &&
            checkValidInt(sessionId)
        ) {
            this.setState({value_session_id: sessionId});

          // update redux store
            if (
                modelType != '--Select--' && kernelType != '--Select--' &&
                checkValidString(modelType) && checkValidString(kernelType)
            ) {
                var action = setSvButton({submit_button: {analysis: true}});
                this.props.dispatchSvButton(action);
            }
            else {
                var action = setSvButton({submit_button: {analysis: false}});
                this.props.dispatchSvButton(action);
            }
        }
        else {
            this.setState({value_session_id: '--Select--'});

          // update redux store
            var action = setSvButton({submit_button: {analysis: false}});
            this.props.dispatchSvButton(action);
        }
    },
    changeModelType: function(event){
        var sessionId  = this.state.value_session_id;
        var modelType  = event.target.value;
        var kernelType = this.state.value_kernel_type;

        if (
            modelType && modelType != '--Select--' &&
            checkValidString(modelType)
        ) {
            this.setState({value_model_type: event.target.value});

          // update redux store
            if (
                checkValidInt(sessionId) && kernelType != '--Select--' &&
                checkValidString(kernelType)
            ) {
                var action = setSvButton({submit_button: {analysis: true}});
                this.props.dispatchSvButton(action);
            }
            else {
                var action = setSvButton({submit_button: {analysis: false}});
                this.props.dispatchSvButton(action);
            }
        }
        else {
            this.setState({value_model_type: '--Select--'});

          // update redux store
            var action = setSvButton({submit_button: {analysis: false}});
            this.props.dispatchSvButton(action);
        }
    },
    changeKernelType: function(event) {
        var sessionId  = this.state.value_session_id;
        var modelType  = this.state.value_model_type;
        var kernelType = event.target.value;

        if (
            kernelType && kernelType != '--Select--' &&
            checkValidString(kernelType)
        ) {
            this.setState({value_kernel_type: event.target.value});

          // update redux store
            if (
                checkValidInt(sessionId) && modelType != '--Select--' &&
                checkValidString(modelType)
            ) {
                var action = setSvButton({submit_button: {analysis: true}});
                this.props.dispatchSvButton(action);
            }
            else {
                var action = setSvButton({submit_button: {analysis: false}});
                this.props.dispatchSvButton(action);
            }
        }
        else {
            this.setState({value_kernel_type: '--Select--'});

          // update redux store
            var action = setSvButton({submit_button: {analysis: false}});
            this.props.dispatchSvButton(action);
        }
    },
  // triggered when 'state properties' change
    render: function(){
        var options = this.state.ajax_done_options;

        if (this.state.display_spinner) {
            var AjaxSpinner = Spinner;
        }
        else {
            var AjaxSpinner = 'span';
        }

        return(
            <fieldset className='fieldset-session-generate'>
                <legend>Generate Model</legend>
                <fieldset className='fieldset-select-model'>
                    <legend>Configurations</legend>
                    <p>Select past session, model type, and kernel type</p>
                    <select
                        name='session_id'
                        autoComplete='off'
                        onChange={this.changeSessionId}
                        value={this.state.value_session_id}
                    >

                        <option value='' defaultValue>--Select--</option>

                        {/* array components require unique 'key' value */}
                        {options && options.map(function(value) {
                            return <option key={value.id} value={value.id}>
                                {value.id}: {value.title}
                            </option>;
                        })}

                    </select>

                    <select
                        name='model_type'
                        autoComplete='off'
                        onChange={this.changeModelType}
                        value={this.state.value_model_type}
                    >

                        <option value='' defaultValue>--Select--</option>
                        <option value='svm'>SVM</option>
                        <option value='svr'>SVR</option>

                    </select>

                    <select
                        name='sv_kernel_type'
                        autoComplete='off'
                        onChange={this.changeKernelType}
                        value={this.state.value_kernel_type}
                    >

                        <option value='' defaultValue>--Select--</option>
                        <option value='linear'>Linear</option>
                        <option value='poly'>Polynomial</option>
                        <option value='rbf'>RBF</option>
                        <option value='sigmoid'>Sigmoid</option>

                    </select>
                </fieldset>

                <AjaxSpinner />
            </fieldset>
        );
    },
  // call back: get session id(s) from server side, and append to form
    componentDidMount: function () {
      // ajax arguments
        var ajaxEndpoint = '/retrieve-session';
        var ajaxArguments = {
            'endpoint': ajaxEndpoint,
            'data': null
        };

      // boolean to show ajax spinner
        this.setState({display_spinner: true});

      // asynchronous callback: ajax 'done' promise
        ajaxCaller(function (asynchObject) {
        // Append to DOM
            if (asynchObject && asynchObject.error) {
                this.setState({ajax_done_error: asynchObject.error});
            } else if (asynchObject) {
                this.setState({ajax_done_options: asynchObject});
            }
        // boolean to hide ajax spinner
            this.setState({display_spinner: false});
        }.bind(this),
      // asynchronous callback: ajax 'fail' promise
        function (asynchStatus, asynchError) {
            if (asynchStatus) {
                this.setState({ajax_fail_status: asynchStatus});
                console.log('Error Status: ' + asynchStatus);
            }
            if (asynchError) {
                this.setState({ajax_fail_error: asynchError});
                console.log('Error Thrown: ' + asynchError);
            }
        // boolean to hide ajax spinner
            this.setState({display_spinner: false});
        }.bind(this),
      // pass ajax arguments
        ajaxArguments);
    },
    componentWillUnmount() {
      // update redux store
        var action = setSvButton({submit_button: {analysis: false}});
        this.props.dispatchSvButton(action);
    }
});

// indicate which class can be exported, and instantiated via 'require'
export default ModelGenerate
