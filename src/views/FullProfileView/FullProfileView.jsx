import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { fullFormatDate } from '../../helper/format-date';
import { getUserByUsername } from '../../services/users.service';
import { useEffect, useState } from 'react';
import Avatar from '../../components/Avatar/Avatar';
import UserInfo from '../../components/UserInfo/UserInfo';

export default function FullProfileView() {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      getUserByUsername(id).then((snapshot) => {
        setUser(snapshot.val());
      });
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  return (
    <div className='card card-side shadow-xl m-4 border border-gray-400 flex flex-row rounded-2xl'>
      <Avatar user={user} />
      <div className='container card-body text-left justify-between'>
        <div className='top-div text-center'>
          {user?.firstName && user?.lastName ? (
            <h2 className='font-bold mb-8 underline'>{`${user?.firstName} ${user?.lastName}`}</h2>
          ) : (
            <h2 className='font-bold mb-8 underline'>{user?.username}</h2>
          )}
          <UserInfo userData={user} />
          <p>Member Since: {fullFormatDate(user?.createdOn)}</p>
        </div>
        <div className='bottom-div card-actions justify-end mt-4'>
          <button onClick={() => navigate(-1)} className='btn btn-error'>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
