import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Github, Linkedin, Twitter, Instagram, ExternalLink } from 'lucide-react';
import { teamMembers } from '../data/profileDummy';
import DevelopedBy from '../components/DevelopedBy';

const TeamMember = () => {
  const { id } = useParams();
  const member = teamMembers.find(m => m.id === parseInt(id));

  if (!member) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-8">
        <div className="glass-effect rounded-xl sm:rounded-2xl p-6 sm:p-8 max-w-sm mx-auto w-full">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Team Member Not Found</h2>
          <p className="text-white/80 mb-6 text-sm sm:text-base">This team member doesn't exist or has been removed.</p>
          <Link to="/team" className="vibrant-button inline-block text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3">
            Back to Team
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white/90 via-gray-50/95 to-blue-50/90 px-1 sm:px-2 md:px-4 lg:px-6 animate-fade-in">
      <div className="bg-white/90 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-lg border border-gray-200/50 -mt-6 sm:-mt-4 md:-mt-2">
        {/* Header Section */}
        <div className="relative h-24 sm:h-32 md:h-48 lg:h-64 xl:h-80 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 mb-0">
          <div className="absolute inset-0 flex items-center justify-center px-2">
            <div className="w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 flex items-center justify-center">
              <div className="text-center">
                <div className="relative inline-block mb-1 sm:mb-2 md:mb-4 lg:mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-24 lg:w-28 lg:h-32 xl:w-32 xl:h-40 rounded-full overflow-hidden border-2 sm:border-3 md:border-4 border-blue-400/50 shadow-2xl">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 sm:-bottom-1.5 sm:-right-1.5 md:-bottom-2 md:-right-2 lg:-bottom-3 lg:-right-3 bg-blue-500 rounded-full p-1 sm:p-1.5 md:p-2 lg:p-3 animate-pulse">
                    <ExternalLink className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-white" />
                  </div>
                </div>
                <h1 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-white mb-1 sm:mb-1.5 md:mb-2">
                  {member.name}
                </h1>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-blue-400 font-medium">
                  {member.role}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 pt-2 sm:pt-3 md:pt-4 lg:pt-6 xl:pt-8">
          {/* Description */}
          <div className="mb-3 sm:mb-4 md:mb-6 lg:mb-8">
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-1 sm:mb-2 md:mb-3 lg:mb-4">About</h2>
            <p className="text-gray-600 leading-relaxed text-xs sm:text-sm md:text-base">
              {member.description}
            </p>
          </div>

          {/* Skills */}
          <div className="mb-3 sm:mb-4 md:mb-6 lg:mb-8">
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-1 sm:mb-2 md:mb-3 lg:mb-4">Skills & Expertise</h2>
            <div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2 lg:gap-3">
              {member.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-1.5 sm:px-2 md:px-3 lg:px-4 py-0.5 sm:py-1 md:py-1.5 lg:py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 rounded-full text-xs sm:text-sm md:text-base font-medium border border-blue-400/30"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-3 sm:mb-4 md:mb-6 lg:mb-8">
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-1 sm:mb-2 md:mb-3 lg:mb-4">Get in Touch</h2>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4">
              <a
                href={`mailto:${member.email}`}
                className="inline-flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 md:px-4 lg:px-6 py-1.5 sm:py-2 md:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 transform active:scale-95"
              >
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                <span className="text-xs sm:text-sm md:text-base">{member.email}</span>
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="mb-3 sm:mb-4 md:mb-6 lg:mb-8">
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-1 sm:mb-2 md:mb-3 lg:mb-4">Connect</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-1.5 sm:gap-2 md:gap-3 lg:gap-4">
              <a
                href={member.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-1 sm:space-x-1.5 md:space-x-2 px-1.5 sm:px-2 md:px-3 lg:px-4 py-1.5 sm:py-2 md:py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 transform active:scale-95"
              >
                <Github className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                <span className="text-xs sm:text-sm">GitHub</span>
              </a>
              <a
                href={member.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-1 sm:space-x-1.5 md:space-x-2 px-1.5 sm:px-2 md:px-3 lg:px-4 py-1.5 sm:py-2 md:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 transform active:scale-95"
              >
                <Linkedin className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                <span className="text-xs sm:text-sm">LinkedIn</span>
              </a>
              <a
                href={member.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-1 sm:space-x-1.5 md:space-x-2 px-1.5 sm:px-2 md:px-3 lg:px-4 py-1.5 sm:py-2 md:py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors duration-200 transform active:scale-95"
              >
                <Twitter className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                <span className="text-xs sm:text-sm">Twitter</span>
              </a>
              <a
                href={member.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-1 sm:space-x-1.5 md:space-x-2 px-1.5 sm:px-2 md:px-3 lg:px-4 py-1.5 sm:py-2 md:py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 transform active:scale-95"
              >
                <Instagram className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                <span className="text-xs sm:text-sm">Instagram</span>
              </a>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="text-center py-2 sm:py-3 md:py-4 lg:py-6 border-t border-gray-200">
            <Link
              to="/team"
              className="inline-flex items-center space-x-1 sm:space-x-1.5 md:space-x-2 text-blue-400 hover:text-blue-600 transition-colors duration-200 transform active:scale-95"
            >
              <span className="text-xs sm:text-sm md:text-base">View All Team Members</span>
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            </Link>
          </div>
        </div>
      </div>
      <DevelopedBy />
    </div>
  );
};

export default TeamMember;
