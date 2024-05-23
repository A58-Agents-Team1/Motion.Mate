import PropTypes from 'prop-types';

export default function UserInfo({ userData }) {
  return (
    <>
      {userData?.username ? (
        <p>UserName: {userData?.username}</p>
      ) : (
        <p>UserName: Missing information</p>
      )}
      <p>Email: {userData?.email}</p>
      {userData?.firstName ? (
        <p>First Name: {userData?.firstName}</p>
      ) : (
        <p>First Name: Missing information</p>
      )}
      {userData?.lastName ? (
        <p>Last Name: {userData?.lastName}</p>
      ) : (
        <p>Last Name: Missing information</p>
      )}
      {userData?.phoneNumber && userData?.phoneNumber !== '' ? (
        <p>Phone: {userData?.phoneNumber}</p>
      ) : (
        <p>Phone: Missing information</p>
      )}
    </>
  );
}

UserInfo.propTypes = {
  userData: PropTypes.object,
};
