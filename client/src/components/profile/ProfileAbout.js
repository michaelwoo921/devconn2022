import React, { Fragment } from 'react';

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name },
  },
}) => {
  console.log(skills[0]);
  return (
    <Fragment>
      <div className="profile-about bg-light p-2">
        {bio && (
          <Fragment>
            <h2 className="text-primary">{name}s Bio</h2>
            <p>{bio}</p>
            <div className="line"></div>
          </Fragment>
        )}

        <h2 className="text-primary">Skill Set</h2>
        <div className="skills">
          {skills &&
            skills.map((skill, index) => (
              <div key={index} className="p-1">
                <i className="fa fa-check"></i> {skill}
              </div>
            ))}
        </div>
      </div>
    </Fragment>
  );
};

export default ProfileAbout;
