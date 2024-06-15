import PropTypes from 'prop-types';
import InfoBite from '../Exercise/InfoBite';
import { AppContext } from '../../context/AppContext';
import { useContext } from 'react';

export default function UserInfo({ detailsProfileUserData }) {
  const { userData } = useContext(AppContext);

  const firstName = detailsProfileUserData?.firstName || '';
  const lastName = detailsProfileUserData?.lastName || '';

  const fullName = `${
    detailsProfileUserData?.firstName || detailsProfileUserData?.lastName
      ? `${firstName} ${lastName}`
      : 'N/A'
  }`;

  const friendsList = Object.keys(detailsProfileUserData?.friends || {});
  const friends = friendsList.includes(userData?.username) ? true : false;

  return (
    <>
      <div className='flex flex-col gap-2'>
        <InfoBite
          title={'Full Name'}
          content={fullName}
        />

        <InfoBite
          title={'Gender'}
          content={detailsProfileUserData?.gender || 'N/A'}
        />

        {friends && (
          <InfoBite
            title={'Email'}
            content={detailsProfileUserData?.email || 'N/A'}
          />
        )}
        {friends && (
          <InfoBite
            title={'Phone'}
            content={detailsProfileUserData?.phoneNumber || 'N/A'}
          />
        )}
        {friends && (
          <InfoBite
            title={'Age'}
            content={detailsProfileUserData?.age || 'N/A'}
          />
        )}
        {friends && (
          <InfoBite
            title={'Weight'}
            content={detailsProfileUserData?.weight || 'N/A'}
          />
        )}
        {friends && (
          <InfoBite
            title={'Height'}
            content={detailsProfileUserData?.height || 'N/A'}
          />
        )}
        {friends && (
          <InfoBite
            title={'Activity Level'}
            content={detailsProfileUserData?.activityLevel || 'N/A'}
          />
        )}
      </div>
    </>
  );
}

UserInfo.propTypes = {
  detailsProfileUserData: PropTypes.object,
};
