import React from 'react';
import { Phone, Linkedin, Github, GraduationCap, Calendar } from 'lucide-react';

const JoinerProfile = ({photo, name, course, passout, specialization, phone, linkedin, github}) => {



  return (
    <div className="max-w-sm  bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      {/* Header with photo and basic info */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
        <div className="flex items-center space-x-4">
          <img 
            src={photo} 
            alt={name}
            className="w-24 h-24 rounded-full border-3 border-white object-cover"
          />
          <div className="text-white">
            <h2 className="text-xl font-bold">{name}</h2>
            <div className="flex items-center space-x-1 text-blue-100">
              <GraduationCap className="w-4 h-4" />
              <span className="text-sm">{course}</span>
            </div>
            
            <div className="flex items-center space-x-1 text-blue-100">
              <Calendar className="w-4 h-4" />
              <span className="text-sm"> {passout} &bull; Batch</span>
            </div>
            <div className="flex mt-2 items-center space-x-1 text-blue-100">
              <span className="text-sm">{specialization}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact details */}
      <div className="px-6 py-4 space-y-3">
        <div className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors">
          <Phone className="w-4 h-4" />
          <span className="text-sm font-medium">{phone}</span>
        </div>
        
        <div className="flex items-center space-x-6 text-gray-700  cursor-pointer">
         <a target='_blank' href={linkedin}> <Linkedin className="w-6 h-6  hover:text-blue-600 transition-colors" /></a>
         <a target='_blank' href={github}><Github className="w-6 h-6  hover:text-blue-600 transition-colors" /></a>
        </div>
        
        
      </div>
    </div>
  );
};

export default JoinerProfile;

