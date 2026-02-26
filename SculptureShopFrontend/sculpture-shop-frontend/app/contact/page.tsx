"use client";

// ============================================
// Contact Page
// ============================================

import React, { useState } from "react";
import { Formik, Form } from "formik";
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend, FiCheck } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { TextInput, TextArea, Button } from "@/components";
import { useSelectedSculpturesStore } from "@/store";
import { contactFormSchema } from "@/utils/validations";
import { SHOP_INFO } from "@/utils/constants";
import { formatPrice, getWhatsAppUrl, generateSculptureInquiryMessage } from "@/utils/helpers";
import toast from "react-hot-toast";

interface ContactFormValues {
  customer_name: string;
  mobile_number: string;
  email: string;
  message: string;
}

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { selectedSculptures } = useSelectedSculpturesStore();

  const initialValues: ContactFormValues = {
    customer_name: "",
    mobile_number: "",
    email: "",
    message:
      selectedSculptures.length > 0
        ? `I'm interested in the following sculptures:\n${selectedSculptures.map((s) => `- ${s.name} (${formatPrice(s.price)})`).join("\n")}\n\nPlease provide more details.`
        : "",
  };

  const handleSubmit = async (
    values: ContactFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In production, call the API
      // await submitContactRequest({
      //   ...values,
      //   selected_sculpture_ids: selectedSculptures.map(s => s.id),
      // });

      setIsSubmitted(true);
      toast.success("Your message has been sent successfully!");
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappMessage =
    selectedSculptures.length > 0
      ? generateSculptureInquiryMessage(
          "Customer",
          "Mobile",
          selectedSculptures.map((s) => ({ id: s.id, name: s.name, price: s.price })),
        )
      : "Hello! I visited your website and have a question.";
  const whatsappUrl = getWhatsAppUrl(SHOP_INFO.whatsappNumber, whatsappMessage);

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiCheck className="text-green-600 text-3xl" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Message Sent!</h1>
            <p className="text-gray-600 mb-6">Thank you for contacting us. We will get back to you within 24 hours.</p>
            <p className="text-gray-600 mb-8">For faster response, you can also reach us on WhatsApp.</p>
            <div className="space-y-3">
              <Button href={whatsappUrl} external variant="whatsapp" fullWidth leftIcon={<FaWhatsapp />}>
                Chat on WhatsApp
              </Button>
              <Button href="/" variant="outline" fullWidth>
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions about our sculptures? Want to discuss a custom order? Get in touch with us and we&apos;ll be
            happy to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Send us a Message</h2>

              {selectedSculptures.length > 0 && (
                <div className="bg-amber-50 rounded-lg p-4 mb-6">
                  <p className="text-sm font-medium text-amber-800 mb-2">
                    Selected Sculptures ({selectedSculptures.length}):
                  </p>
                  <ul className="text-sm text-amber-700 space-y-1">
                    {selectedSculptures.map((sculpture) => (
                      <li key={sculpture.id}>
                        • {sculpture.name} - {formatPrice(sculpture.price)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Formik initialValues={initialValues} validationSchema={contactFormSchema} onSubmit={handleSubmit}>
                {({ isSubmitting }) => (
                  <Form>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <TextInput
                        label="Your Name"
                        name="customer_name"
                        type="text"
                        placeholder="Enter your name"
                        required
                      />
                      <TextInput
                        label="Mobile Number"
                        name="mobile_number"
                        type="tel"
                        placeholder="Enter 10-digit mobile number"
                        required
                      />
                    </div>
                    <TextInput
                      label="Email Address"
                      name="email"
                      type="email"
                      placeholder="Enter your email (optional)"
                    />
                    <TextArea
                      label="Message"
                      name="message"
                      placeholder="Tell us about your requirements..."
                      rows={6}
                    />
                    <div className="flex flex-col sm:flex-row gap-3 mt-6">
                      <Button type="submit" variant="primary" size="lg" isLoading={isSubmitting} leftIcon={<FiSend />}>
                        Send Message
                      </Button>
                      <Button href={whatsappUrl} external variant="whatsapp" size="lg" leftIcon={<FaWhatsapp />}>
                        WhatsApp Instead
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>

          {/* Contact Info Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Get in Touch</h2>

              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FiPhone className="text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Phone</p>
                    <a href={`tel:${SHOP_INFO.phone1}`} className="text-gray-600 hover:text-amber-600 block">
                      {SHOP_INFO.phone1}
                    </a>
                    <a href={`tel:${SHOP_INFO.phone2}`} className="text-gray-600 hover:text-amber-600 block">
                      {SHOP_INFO.phone2}
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaWhatsapp className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">WhatsApp</p>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-700"
                    >
                      Click to Chat
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FiMail className="text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Email</p>
                    <a href={`mailto:${SHOP_INFO.email}`} className="text-gray-600 hover:text-amber-600 break-all">
                      {SHOP_INFO.email}
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FiMapPin className="text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Location</p>
                    <a
                      href={SHOP_INFO.googleMapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-amber-600"
                    >
                      {SHOP_INFO.address}
                      <span className="block text-sm text-amber-600">View on Map →</span>
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FiClock className="text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Working Hours</p>
                    <p className="text-gray-600">{SHOP_INFO.workingHours}</p>
                  </div>
                </div>
              </div>

              {/* Map Embed Placeholder */}
              <div className="mt-6 pt-6 border-t">
                <a
                  href={SHOP_INFO.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gray-100 rounded-lg p-8 text-center hover:bg-gray-200 transition-colors"
                >
                  <FiMapPin className="text-4xl text-amber-600 mx-auto mb-2" />
                  <span className="text-gray-600 font-medium">View on Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
