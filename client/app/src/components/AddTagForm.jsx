import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addTagToCardAction } from '../actions/cardActions';

let input;

class AddTagForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col s4">
        <input className="tag-input" type="text" placeholder="Add tag" ref={ node => {input = node}} />
      </div>
    );
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addTagToCard: addTagToCardAction,
  }, dispatch);
};

export default connect(null, mapDispatchToProps)(AddTagForm);