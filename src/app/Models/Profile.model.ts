import Poll from './Poll.Model';

interface Profile {
  id: string | undefined;
  email: string | undefined;
  username: string | undefined;
  Polls: Poll[] | undefined;
}

export default Profile;
