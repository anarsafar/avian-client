import Conversation from './ConversationCard';
import Sidebar from '../../common/Sidebar';

function Inbox(): JSX.Element {
  return (
    <Sidebar header="Messages" type="conversation">
      {() => (
        <>
          <Conversation />
          <Conversation />
          <Conversation />
          <Conversation />
          <Conversation />
          <Conversation />
          <Conversation />
          <Conversation />
          <Conversation />
          <Conversation />
          <Conversation />
          <Conversation />
          <Conversation />
          <Conversation />
          <Conversation />
        </>
      )}
    </Sidebar>
  );
}

export default Inbox;
