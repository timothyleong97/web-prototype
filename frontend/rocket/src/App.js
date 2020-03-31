import React from 'react';
import './App.css';
import faker from 'faker';
import Comment from './components/Comment';
import YesNoCard from './components/YesNoCard'
const App = () => {
  return (
    <div className="ui container comments">
      <YesNoCard>
        <div>
          <h4>Warning!</h4>
          Are you sure you want to do this?
        </div>
      </YesNoCard>

      <YesNoCard>
        <Comment
          author="Sam"
          timeAgo="Today at 4:45PM"
          content="Nice blog post"
          avatar={faker.image.avatar()}
        />
      </YesNoCard>

      <YesNoCard>
        <Comment
          author="Alex"
          timeAgo="Today at 2:00AM"
          content="I like the subject"
          avatar={faker.image.avatar()}
        />
      </YesNoCard>
    </div>
  );
};


export default App;
