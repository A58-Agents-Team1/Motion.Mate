import { useEffect, useState } from 'react';
import { getUserAvatar } from '../../services/users.service';

export const FriendAvatar = ({ username }) => {
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    const fetchAndSetAvatar = async () => {
      const url = await getUserAvatar(username);
      setAvatarUrl(url);
    };

    fetchAndSetAvatar();
  }, [username]);

  return <img src={avatarUrl} alt={`${username}'s avatar`} />;
};
