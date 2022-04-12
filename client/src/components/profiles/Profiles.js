import React, { useEffect, Fragment } from 'react';
import Spinner from '../layout/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { getProfiles } from '../../actions/profile';
import ProfileItem from './ProfileItem';

const Profiles = () => {
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfiles());
  }, []);

  if (profile.loading) {
    return <Spinner />;
  }

  return (
    <section className="container">
      <h1 className="large text-primary">Developers</h1>
      <p className="lead">
        <i className="fab fa-connectdevelop"></i>
        Browse and connect with developers
      </p>
      <div className="profiles">
        {profile.profiles.length > 0 ? (
          profile.profiles.map((profile) => (
            <ProfileItem key={profile._id} profile={profile} />
          ))
        ) : (
          <h4> No profiles found </h4>
        )}
      </div>
    </section>
  );
};

export default Profiles;
