import React from 'react';

const YesNoCard = props => {
  return (
    <div className="ui card">
      <div className="content">{props.children}</div>
      <div className="extra content">
        <div className="ui two buttons">
          <div className="ui basic green button">Yes</div>
          <div className="ui basic red button">No</div>
        </div>
      </div>
    </div>
  );
};

export default YesNoCard;