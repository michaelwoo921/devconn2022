import React, { useEffect, Fragment } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';

const Profile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getProfileById(id));
  }, [dispatch]);

  if (profile.loading || !profile.profile) {
    return <Spinner />;
  }
  // console.log('*', auth.user._id, '**', profile.profile.user._id);
  return (
    <section className="container">
      <Link to="/profiles" className="btn btn-light">
        Back to Profiles
      </Link>

      {auth.isAuthenticated &&
        auth.loading === false &&
        !profile.loading &&
        auth.user._id === profile.profile.user._id && (
          <Link to="/edit-profile" className="btn btn-dark">
            Edit Profile
          </Link>
        )}
      <div className="profile-grid my-1">
        <ProfileTop profile={profile.profile} />
        <ProfileAbout profile={profile.profile} />
        <div className="profile-exp bg-white p-2">
          <h2 className="text-primary">Experience</h2>
          {profile.profile.experience.length > 0 ? (
            <Fragment>
              {profile.profile.experience.map((experience) => (
                <ProfileExperience
                  key={experience._id}
                  experience={experience}
                />
              ))}
            </Fragment>
          ) : (
            <h4> No experience credentials </h4>
          )}
        </div>

        <div className="profile-edu bg-white p-2">
          <h2 className="text-primary">Education</h2>
          {profile.profile.education.length > 0 ? (
            <Fragment>
              {profile.profile.education.map((education) => (
                <ProfileEducation key={education._id} education={education} />
              ))}
            </Fragment>
          ) : (
            <h4> No education credentials </h4>
          )}
        </div>
        {profile.profile.githubusername && (
          <ProfileGithub username={profile.profile.githubusername} />
        )}
      </div>
    </section>
  );
};

export default Profile;
