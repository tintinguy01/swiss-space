"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaCheck,
  FaPaperPlane,
  FaFileDownload
} from "react-icons/fa";
import { toast } from '../../../components/ui/toast';
import emailjs from '@emailjs/browser';

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name: string;
  email: string;
  message: string;
}

export default function ContactCard() {
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validateForm = () => {
    let valid = true;
    const newErrors: FormErrors = {
      name: "",
      email: "",
      message: "",
    };

    // Validate name
    if (!formState.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    // Validate email
    if (!formState.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formState.email)) {
      newErrors.email = "Please enter a valid email";
      valid = false;
    }

    // Validate message
    if (!formState.message.trim()) {
      newErrors.message = "Message is required";
      valid = false;
    }

    setFormErrors(newErrors);
    return valid;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    
    // Map EmailJS field names to our state properties
    const fieldMap: {[key: string]: string} = {
      user_name: "name",
      user_email: "email",
      message: "message"
    };
    
    const stateProp = fieldMap[name] || name;
    
    setFormState((prev) => ({
      ...prev,
      [stateProp]: value,
    }));

    // Clear error when typing
    if (stateProp in formErrors && formErrors[stateProp as keyof FormErrors]) {
      setFormErrors((prev) => ({
        ...prev,
        [stateProp]: "",
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Use environment variables for EmailJS credentials
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
      
      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration is missing. Please check your environment variables.');
      }
      
      const result = await emailjs.sendForm(
        serviceId,
        templateId,
        e.currentTarget,
        publicKey
      );
      
      if (result.text === 'OK') {
        // Show success toast
        toast.success('Message Sent!', 'Your message has been sent successfully.');
        
        setSubmitted(true);
        // Reset form after successful submission
        setFormState({
          name: '',
          email: '',
          message: ''
        });
        
        // Reset submission status after a delay
        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setSubmitError(err.message);
        toast.error('Error Sending Message', err.message);
      } else {
        setSubmitError('An unexpected error occurred');
        toast.error('Error Sending Message', 'An unexpected error occurred');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadResume = () => {
    // You'll need to replace this with the actual path to your resume file
    const resumeUrl = '/Swiss-Resume-101.pdf';
    
    // Create a temporary link and trigger the download
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Swiss-Resume-101.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show success toast
    toast.success('Resume Downloaded', 'The resume has been downloaded successfully.');
  };

  const socialLinks = [
    {
      id: "email",
      icon: <FaEnvelope size={18} />,
      url: "mailto:tintinguy01@gmail.com",
      label: "Email",
      color: "#D44638",
    },
    {
      id: "github",
      icon: <FaGithub size={18} />,
      url: "https://github.com/tintinguy01",
      label: "GitHub",
      color: "#333333",
    },
    {
      id: "linkedin",
      icon: <FaLinkedin size={18} />,
      url: "https://www.linkedin.com/in/swiss-tangsatjatham-7821b3254/",
      label: "LinkedIn",
      color: "#0077B5",
    },
  ];

  const inputClasses =
    "w-full px-3 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-800 dark:text-white";

  return (
    <div className="flex flex-col w-full h-full">
      <motion.div
        className="text-center mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-inherit">Get In Touch</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Have a question or want to work together?
        </p>
      </motion.div>

      <div className="flex-1 flex flex-col md:flex-row gap-4 overflow-auto p-3">
        {/* Contact Form */}
        <div className="md:w-4/5 relative">
          {submitted ? (
            <motion.div
              className="flex flex-col items-center justify-center h-full text-center p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <FaCheck className="text-blue-600" size={24} />
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">
                Message Sent!
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Thank you for reaching out. I&apos;ll get back to you as soon as
                possible.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 h-full flex flex-col">
              <div>
                <div className="relative">
                  <motion.input
                    type="text"
                    name="user_name"
                    placeholder="Your Name"
                    value={formState.name}
                    onChange={handleChange}
                    className={`${inputClasses} ${formErrors.name ? "border-red-500 dark:border-red-500" : ""}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  />
                  <AnimatePresence>
                    {formErrors.name && (
                      <motion.p
                        className="text-xs text-red-500 mt-1"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        {formErrors.name}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div>
                <div className="relative">
                  <motion.input
                    type="email"
                    name="user_email"
                    placeholder="Your Email"
                    value={formState.email}
                    onChange={handleChange}
                    className={`${inputClasses} ${formErrors.email ? "border-red-500 dark:border-red-500" : ""}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  />
                  <AnimatePresence>
                    {formErrors.email && (
                      <motion.p
                        className="text-xs text-red-500 mt-1"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        {formErrors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="flex-grow">
                <div className="relative h-full">
                  <motion.textarea
                    name="message"
                    placeholder="Your Message"
                    value={formState.message}
                    onChange={handleChange}
                    className={`${inputClasses} h-36 md:h-44 resize-none ${formErrors.message ? "border-red-500 dark:border-red-500" : ""}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  />
                  <AnimatePresence>
                    {formErrors.message && (
                      <motion.p
                        className="text-xs text-red-500 mt-1"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        {formErrors.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="mt-auto space-y-3">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-primary rounded-lg flex items-center justify-center gap-2
                             hover:bg-primary/90 dark:hover:bg-primary/70 transition-all shadow-md
                             border-2 border-gray-200 dark:border-gray-700 hover:border-blue-600 dark:hover:border-blue-300
                             disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.15), 0 4px 6px -2px rgba(0, 0, 0, 0.1)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="font-medium">Send Message</span>
                  <FaPaperPlane
                    size={14}
                    className={`${isSubmitting ? "animate-ping" : "animate-none"}`}
                  />
                </motion.button>
              </div>

              <AnimatePresence>
                {submitError && (
                  <motion.div
                    className="p-2 bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-400 rounded-lg text-xs text-center"
                    initial={{ opacity: 0, y: 10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                  >
                    {submitError}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          )}
        </div>

        {/* Social Links */}
        <motion.div
          className="md:w-1/5 min-w-[180px] flex flex-col"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold mb-3 text-inherit">Connect With Me</h3>

          <div className="space-y-2">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-lg shadow-sm 
                           hover:shadow-md transition-all group border border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: `${link.color}20`,
                    color: link.color,
                  }}
                >
                  {link.icon}
                </div>
                <span className="font-medium text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {link.label}
                </span>
              </motion.a>
            ))}
          </div>

          <div className="mt-4 text-xs p-3 rounded-lg border border-gray-200 dark:border-gray-700">
            <p>
              I&apos;m currently available for freelance work and job
              opportunities.
            </p>
          </div>
          
          <motion.button 
            type="button" 
            onClick={handleDownloadResume}
            className="mt-4 py-2.5 rounded-lg flex items-center justify-center gap-2
                       hover:bg-gray-200 dark:hover:bg-gray-600 transition-all shadow-sm
                       border border-gray-300 dark:border-gray-600 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <span className="font-medium text-sm">Resume</span>
            <FaFileDownload size={12} />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
 