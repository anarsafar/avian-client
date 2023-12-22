import messageButton from '@assets/layout/message-button.svg';
import Conversation from './Conversation';
import Sidebar from '../common/Sidebar';

function Inbox(): JSX.Element {
  return (
    <Sidebar header="Messages" sidebarIcon={messageButton} type="conversation">
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
    </Sidebar>
  );
}

export default Inbox;
