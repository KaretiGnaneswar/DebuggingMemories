import React from 'react';
import { Link } from 'react-router-dom';
import { teamMembers } from '../data/profileDummy';
import { Github, Linkedin, Twitter, Instagram, Mail, ExternalLink } from 'lucide-react';

const Team = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white/90 via-gray-50/95 to-blue-50/90 px-2 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8 md:mb-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-400 mb-2 sm:mb-4">
          Our Amazing Team
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
          Meet the talented individuals who make DebuggingMemories possible. 
          Each member brings unique skills and passion to create exceptional experiences.
        </p>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12">
        {teamMembers.map((member) => (
          <Link
            key={member.id}
            to={`/team/${member.id}`}
            className="group block"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 h-full transform hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl border border-gray-200/50">
              {/* Avatar Section */}
              <div className="relative mb-3 sm:mb-4 md:mb-6">
                <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden border-3 sm:border-4 border-blue-400/30 group-hover:border-blue-400/60 transition-colors duration-300">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 md:-bottom-3 md:-right-3 bg-blue-500 rounded-full p-1.5 sm:p-2 md:p-3 animate-pulse">
                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
                </div>
              </div>

              {/* Name and Role */}
              <div className="text-center mb-2 sm:mb-3 md:mb-4">
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-1 group-hover:text-blue-400 transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-blue-400 font-medium">
                  {member.role}
                </p>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 mb-3 sm:mb-4 md:mb-6 leading-relaxed">
                {member.description}
              </p>

              {/* Skills */}
              <div className="mb-3 sm:mb-4 md:mb-6">
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {member.skills.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 rounded-full text-xs sm:text-sm font-medium border border-blue-400/30"
                    >
                      {skill}
                    </span>
                  ))}
                  {member.skills.length > 3 && (
                    <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gray-100 text-gray-600 rounded-full text-xs sm:text-sm font-medium">
                      +{member.skills.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Social Links */}
              <div className="flex justify-center space-x-2 sm:space-x-3">
                <a
                  href={member.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 flex items-center justify-center"
                >
                  <Github className="w-3 h-3 sm:w-4 sm:h-4" />
                </a>
                <a
                  href={member.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                >
                  <Linkedin className="w-3 h-3 sm:w-4 sm:h-4" />
                </a>
                <a
                  href={member.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center"
                >
                  <Instagram className="w-3 h-3 sm:w-4 sm:h-4" />
                </a>
              </div>

              {/* View Profile Indicator */}
              <div className="text-center mt-4 sm:mt-6">
                <span className="text-xs sm:text-sm text-blue-400/60 group-hover:text-blue-400 transition-colors duration-300">
                  Click to view full profile →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer Note */}
      <div className="text-center text-xs sm:text-sm text-gray-500">
        <p>Click on any team member to view their detailed profile</p>
      </div>
    </div>
  );
};

export default Team;
