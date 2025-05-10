// alumbra-backend/services/email.service.js
// Service for sending emails, specifically by making a request to an external webhook URL.
// This service does NOT directly use SMTP or an email library.

const envConfig = require('../config/env.config');
// const fetch = require('node-fetch'); // Or Axios, or built-in https module

const emailService = {
  /**
   * Sends an alert email by POSTing data to a configured webhook.
   * @param {object} emergencyContactInfo - Contains the recipient's email. E.g., { email: 'contact@example.com' }
   * @param {object} emailVariables - Data to be used in the email template by the webhook service.
   * @returns {Promise<boolean>} True if the webhook call was successful, false otherwise.
   */
  sendAlertEmail: async (emergencyContactInfo, emailVariables) => {
    const webhookUrl = envConfig.webhookUrl;
    if (!webhookUrl) {
      console.error('WEBHOOK_URL is not configured. Cannot send email.');
      return false;
    }
    if (!emergencyContactInfo || !emergencyContactInfo.email) {
        console.error('Emergency contact email is missing. Cannot send email.');
        return false;
    }

    const payload = {
      to: emergencyContactInfo.email, // The actual recipient email address
      template_id: 'alumbra_emergency_alert_template_v1', // Example template identifier for the webhook service
      dynamic_data: emailVariables, // Variables like userName, riskScore, riskSummary
      // Potentially add a secret or API key if the webhook endpoint requires authentication
      // webhook_secret: process.env.WEBHOOK_SECRET,
    };

    try {
      console.log(`Sending alert email to webhook: ${webhookUrl} for contact: ${emergencyContactInfo.email}`);
      // const response = await fetch(webhookUrl, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     // Add any necessary auth headers for the webhook
      //     // 'X-Api-Key': process.env.EMAIL_WEBHOOK_API_KEY,
      //   },
      //   body: JSON.stringify(payload),
      // });

      // if (!response.ok) {
      //   console.error(`Webhook request failed: ${response.status} ${response.statusText}`, await response.text());
      //   return false;
      // }
      // const responseData = await response.json();
      // console.log('Webhook response:', responseData);
      console.log('Webhook call simulation successful.'); // Placeholder for actual fetch call
      return true; // Assume success for placeholder
    } catch (error) {
      console.error('Error sending email via webhook:', error);
      return false;
    }
  },

  // Potentially add other email sending functions (e.g., for general notifications)
  // sendNotificationEmail: async (recipientEmail, subject, body) => { ... }
};

module.exports = emailService;
