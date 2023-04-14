import { useParams } from 'react-router-dom';
import { VideoDashboard } from '../../components';

export const MeetingRoom = () => {
  const { meeting_id: meetingId } = useParams();

  document.title = `Meeting ${meetingId}`;

  return (
    <>
      <VideoDashboard />
    </>
  );
};
