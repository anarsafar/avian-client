import Sidebar from '@components/common/Sidebar';
import Conversation from './ConversationCard';

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
