'use client';

import { FloatingChatbot } from '@/components/floating-chatbot';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, MapPin, GraduationCap, Briefcase, Code, Heart, Sparkles } from 'lucide-react';
import Link from 'next/link';
import digitalTwinData from '../digitaltwin.json';
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  const { personal, education, experience, skills, projects } = digitalTwinData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        
        {/* Hero Section */}
        <motion.section 
          className="text-center mb-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="mb-6"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="relative inline-block mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <h1 className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {personal.name}
              </h1>
              <motion.div
                className="absolute -top-4 -right-4"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles className="h-8 w-8 text-yellow-500" />
              </motion.div>
            </motion.div>
            <motion.p 
              className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-4 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {personal.title}
            </motion.p>
            <motion.div 
              className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <MapPin className="h-5 w-5" />
              <span className="text-lg">{personal.location}</span>
            </motion.div>
          </motion.div>

          <motion.p 
            className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {personal.summary}
          </motion.p>

          {/* Contact Links */}
          <motion.div 
            className="flex items-center justify-center gap-4 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link href={personal.contact.github} target="_blank">
              <Button variant="outline" size="lg" className="group hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all duration-300">
                <Github className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                GitHub
              </Button>
            </Link>
            <Link href={personal.contact.linkedin} target="_blank">
              <Button variant="outline" size="lg" className="group hover:bg-blue-600 hover:text-white transition-all duration-300">
                <Linkedin className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                LinkedIn
              </Button>
            </Link>
            <Link href={`mailto:${personal.contact.email.split('/')[0]}`}>
              <Button variant="outline" size="lg" className="group hover:bg-red-500 hover:text-white transition-all duration-300">
                <Mail className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                Email
              </Button>
            </Link>
          </motion.div>
        </motion.section>

        {/* About Section */}
        <motion.section 
          className="mb-20"
          {...fadeInUp}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-8 md:p-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-2xl border-2 hover:shadow-3xl transition-all duration-300 hover:scale-[1.02]">
            <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.5 }}
              >
                <Heart className="h-8 w-8 text-red-500" />
              </motion.div>
              About Me
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="font-semibold text-xl mb-4">Hobbies & Interests</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {personal.personality_traits?.hobbies?.map((hobby, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <Badge variant="secondary" className="text-sm py-1 px-3">{hobby}</Badge>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4 space-y-3 text-base text-gray-700 dark:text-gray-300">
                  <p className="flex items-center gap-2">
                    <span className="text-2xl">🍔</span>
                    <span><strong>Favorite Food:</strong> {personal.personality_traits?.favorite_food}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-2xl">🎨</span>
                    <span><strong>Favorite Color:</strong> {personal.personality_traits?.favorite_color}</span>
                  </p>
                </div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="font-semibold text-xl mb-4">Elevator Pitch</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">{personal.elevator_pitch}</p>
              </motion.div>
            </div>
          </Card>
        </motion.section>

        {/* Education */}
        <motion.section 
          className="mb-20"
          {...fadeInUp}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-8 md:p-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-2xl border-2 hover:shadow-3xl transition-all duration-300 hover:scale-[1.02]">
            <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <GraduationCap className="h-8 w-8 text-blue-600" />
              </motion.div>
              Education
            </h2>
            <motion.div
              whileHover={{ x: 10 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-semibold text-blue-600">{education.degree}</h3>
              <p className="text-xl text-gray-700 dark:text-gray-300 mt-2">{education.university}</p>
              <p className="text-base text-gray-600 dark:text-gray-400 mb-6">Expected Graduation: {education.graduation_year}</p>
              <div>
                <h4 className="font-semibold text-lg mb-4">Relevant Coursework:</h4>
                <div className="flex flex-wrap gap-3 mt-4">
                  {education.relevant_coursework.map((course, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: idx * 0.05, type: "spring" }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Badge variant="outline" className="text-sm py-2 px-4">
                        {typeof course === 'string' ? course : course.course}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </Card>
        </motion.section>

        {/* Experience */}
        <motion.section 
          className="mb-20"
          {...fadeInUp}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-8 md:p-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-2xl border-2 hover:shadow-3xl transition-all duration-300">
            <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Briefcase className="h-8 w-8 text-green-600" />
              </motion.div>
              Experience
            </h2>
            <motion.div 
              className="space-y-10"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {experience.map((exp, idx) => (
                <motion.div 
                  key={idx} 
                  className="border-l-4 border-blue-600 pl-8 relative hover:border-green-600 transition-colors duration-300"
                  variants={fadeInUp}
                  whileHover={{ x: 10, scale: 1.02 }}
                >
                  <div className="absolute -left-3 top-0 w-6 h-6 bg-blue-600 rounded-full border-4 border-white dark:border-gray-800"></div>
                  <h3 className="text-2xl font-semibold text-blue-600">{exp.title}</h3>
                  <p className="text-xl text-gray-700 dark:text-gray-300 mt-1">{exp.company}</p>
                  <p className="text-base text-gray-600 dark:text-gray-400 mb-4">{exp.duration}</p>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 text-lg leading-relaxed">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.technical_skills_used.map((skill, sidx) => (
                      <motion.div
                        key={sidx}
                        whileHover={{ scale: 1.15, rotate: 3 }}
                      >
                        <Badge variant="secondary" className="text-sm py-1 px-3">{skill}</Badge>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </Card>
        </motion.section>

        {/* Technical Skills */}
        <motion.section 
          className="mb-20"
          {...fadeInUp}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-8 md:p-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-2xl border-2 hover:shadow-3xl transition-all duration-300">
            <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Code className="h-8 w-8 text-purple-600" />
              </motion.div>
              Technical Skills
            </h2>
            <div className="space-y-8">
              <motion.div
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="font-semibold text-xl mb-4">Programming Languages</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {skills.programming_languages.map((lang, idx) => (
                    <motion.div 
                      key={idx} 
                      className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 p-4 rounded-xl shadow-md hover:shadow-xl transition-all"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ scale: 1.08, y: -5 }}
                    >
                      <p className="font-bold text-lg text-blue-600">{lang.language}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{lang.proficiency} • {lang.years} years</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="font-semibold text-xl mb-4">Frameworks & Tools</h3>
                <div className="flex flex-wrap gap-3">
                  {(skills.frameworks_libraries || []).map((tool: string | { name: string }, idx: number) => (
                    <motion.div
                      key={idx}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: idx * 0.03 }}
                      whileHover={{ scale: 1.15, rotate: 2 }}
                    >
                      <Badge variant="outline" className="text-sm py-2 px-4">
                        {typeof tool === 'string' ? tool : tool.name}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="font-semibold text-xl mb-4">Databases</h3>
                <div className="flex flex-wrap gap-3">
                  {skills.databases.map((db: string | { name: string }, idx: number) => (
                    <motion.div
                      key={idx}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ scale: 1.15, rotate: -2 }}
                    >
                      <Badge variant="outline" className="text-sm py-2 px-4">
                        {typeof db === 'string' ? db : db.name}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="font-semibold text-xl mb-4">Soft Skills</h3>
                <div className="flex flex-wrap gap-3">
                  {skills.soft_skills.map((skill: string | { skill: string }, idx: number) => (
                    <motion.div
                      key={idx}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: idx * 0.04 }}
                      whileHover={{ scale: 1.15 }}
                    >
                      <Badge variant="secondary" className="text-sm py-2 px-4">
                        {typeof skill === 'string' ? skill : skill.skill}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </Card>
        </motion.section>

        {/* Projects */}
        <motion.section 
          className="mb-20"
          {...fadeInUp}
          transition={{ delay: 0.6 }}
        >
          <Card className="p-8 md:p-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-2xl border-2 hover:shadow-3xl transition-all duration-300">
            <h2 className="text-4xl font-bold mb-8">Featured Projects</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                >
                  <Card className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 shadow-lg h-full hover:shadow-2xl transition-all duration-300">
                    <h3 className="text-2xl font-semibold mb-3 text-blue-600">{project.name}</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4 text-base leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, tidx) => (
                        <motion.div
                          key={tidx}
                          whileHover={{ scale: 1.1 }}
                        >
                          <Badge variant="outline" className="text-xs">{tech}</Badge>
                        </motion.div>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      {project.github_url && (
                        <Link href={project.github_url} target="_blank">
                          <Button variant="outline" size="sm" className="group hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900">
                            <Github className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                            Code
                          </Button>
                        </Link>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.section>

      </div>

      {/* Floating Chatbot */}
      <FloatingChatbot />
    </div>
  );
}
