import { Box } from '@chakra-ui/react';
import Conversation from './Conversation';
import Sidebar from '../common/Sidebar';

const messageIcon = (
  <Box>
    <svg
      width="17"
      height="17"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.97338 2.4915L11.1126 1.36616C11.3501 1.13171 11.6722 1 12.008 1C12.3439 1 12.666 1.13171 12.9035 1.36616C13.1409 1.60062 13.2744 1.9186 13.2744 2.25016C13.2744 2.58173 13.1409 2.89971 12.9035 3.13416L5.73258 10.2135C5.37557 10.5657 4.93531 10.8246 4.45156 10.9668L2.63841 11.5002L3.17864 9.71016C3.32266 9.23259 3.58492 8.79795 3.94172 8.4455L9.97338 2.4915ZM9.97338 2.4915L11.7548 4.25016M10.7419 8.8335V12.0002C10.7419 12.398 10.5818 12.7795 10.2968 13.0608C10.0119 13.3421 9.62543 13.5002 9.22246 13.5002H2.13195C1.72898 13.5002 1.34251 13.3421 1.05757 13.0608C0.772628 12.7795 0.612549 12.398 0.612549 12.0002V5.00016C0.612549 4.60234 0.772628 4.22081 1.05757 3.9395C1.34251 3.6582 1.72898 3.50016 2.13195 3.50016H5.33956"
        stroke="#8E99F3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </Box>
);

function Inbox(): JSX.Element {
  return (
    <Sidebar header="Messages" sidebarIcon={messageIcon} type="conversation">
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
