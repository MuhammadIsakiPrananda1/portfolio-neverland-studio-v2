import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Briefcase, TrendingUp } from 'lucide-react';
import Button from '@components/atoms/Button';
import SectionTitle from '@components/molecules/SectionTitle';
import { PROJECTS_DATA } from '@config/projects';
import { Routes } from '@config/constants';
import { staggerContainer, staggerItem, slideUp } from '@utils/animations';

export default function Projects() {
  return (
    <div className="pt-32 pb-20">
      <div className="container-custom">
        {/* Hero Section - Modern */}
        <motion.div
          className="text-center mb-20"
          variants={slideUp}
          initial="hidden"
          animate="visible"
        >
          {/* Accent Line */}
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 mx-auto mb-8 rounded-full" />
          
          {/* Icon Badge */}
          <div className="inline-flex p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 mb-6">
            <Briefcase className="w-12 h-12 text-emerald-400" />
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white/90">Our</span>{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Success Stories
            </span>
          </h1>
          
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Discover how we've helped organizations across industries strengthen their security posture, 
            protect their digital assets, and achieve their business goals.
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { value: '500+', label: 'Projects Delivered' },
            { value: '98%', label: 'Client Satisfaction' },
            { value: '25+', label: 'Countries Served' },
            { value: '10+', label: 'Years Experience' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="relative rounded-xl p-6 text-center border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300 group"
              variants={staggerItem}
              whileHover={{ y: -4 }}
            >
              <div className="text-3xl font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                {stat.label}
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-emerald-500 to-blue-500 group-hover:w-3/4 transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>

        {/* Section Title */}
        <SectionTitle
          subtitle="Case Studies"
          title="Featured Projects"
          className="mb-12"
        />

        {/* Projects Grid */}
        <motion.div
          className="space-y-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {PROJECTS_DATA.map((project) => (
            <motion.div
              key={project.id}
              className="rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300 overflow-hidden"
              variants={staggerItem}
            >
              <div className="p-8 md:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Project Info */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Header */}
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 mb-3">
                        <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                          {project.industry}
                        </span>
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-white">
                        {project.title}
                      </h3>
                    </div>

                    {/* Challenge */}
                    <div>
                      <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                        <div className="w-1 h-4 bg-emerald-500 rounded-full" />
                        Challenge
                      </h4>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {project.challenge}
                      </p>
                    </div>

                    {/* Solution */}
                    <div>
                      <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                        <div className="w-1 h-4 bg-blue-500 rounded-full" />
                        Solution
                      </h4>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {project.solution}
                      </p>
                    </div>

                    {/* Results */}
                    <div>
                      <h4 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-emerald-400" />
                        Results & Impact
                      </h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {project.results.map((result, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-400 text-sm">
                            <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span>{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Technologies Sidebar */}
                  <div className="lg:border-l lg:border-white/5 lg:pl-8">
                    <h4 className="text-base font-bold text-white mb-4">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium border border-white/5 bg-white/[0.02] text-gray-300 hover:border-emerald-500/20 hover:bg-emerald-500/5 transition-all duration-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Project Meta */}
                    <div className="mt-8 pt-8 border-t border-white/5">
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Industry</span>
                          <span className="text-white font-medium">{project.industry}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Project Type</span>
                          <span className="text-white font-medium">Enterprise</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section - Ultra Clean */}
        <motion.div
          className="relative border border-white/5 rounded-2xl p-12 lg:p-16 text-center bg-gradient-to-b from-white/[0.02] to-transparent mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Top Accent */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
          
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5">
              <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-300 uppercase tracking-widest">Start Your Project</span>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold">
                <span className="text-white/90">Ready to Be Our</span>
                <br />
                <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                  Next Success Story?
                </span>
              </h2>
              <p className="text-base lg:text-lg text-gray-400 max-w-2xl mx-auto">
                Let's discuss how we can help you achieve your security goals and protect your business from digital threats.
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center gap-3 py-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/10" />
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-white/10" />
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link to={Routes.CONTACT}>
                <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Start a Project
                </Button>
              </Link>
              <Link to={Routes.HOME}>
                <Button variant="outline" size="lg" className="border-white/10 hover:border-emerald-500/30">
                  Explore Services
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
