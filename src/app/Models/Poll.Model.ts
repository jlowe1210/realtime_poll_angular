import Polloption from './Polloption.model';
import Poll_vote from './Poll_vote.model';
import User from './User.model';

interface Poll {
  id: string;
  User: User;
  tillExpire: number;
  name: string;
  expire_time: string;
  Polloptions: Polloption[];
  Poll_votes: Poll_vote[];
  url: string;
}

export default Poll;
