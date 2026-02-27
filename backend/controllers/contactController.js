import nodemailer from 'nodemailer';

// Create contact message
const createContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Email options
    const mailOptions = {
      from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `📬 New Contact Form - ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f4; }
                .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
                .content { padding: 30px; }
                .contact-details { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
                .footer { background: #333; color: white; padding: 20px; text-align: center; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🎁 Gift Delivery System</h1>
                    <p>New Customer Inquiry Received!</p>
                </div>
                <div class="content">
                    <h2>New Contact Form Submission 📬</h2>
                    
                    <div class="contact-details">
                        <h3>👤 Customer Details:</h3>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                        <p><strong>Received On:</strong> ${new Date().toLocaleDateString('en-IN')} at ${new Date().toLocaleTimeString('en-IN')}</p>
                    </div>
                    
                    <div class="contact-details">
                        <h3>📝 Message:</h3>
                        <p style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #667eea;">${message}</p>
                    </div>
                    
                    <p><strong>Action Required:</strong> Please respond to the customer inquiry promptly.</p>
                </div>
                <div class="footer">
                    <p><strong>Gift Delivery System - Admin Panel</strong></p>
                    <p>Customer Service Notification 🔔</p>
                </div>
            </div>
        </body>
        </html>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error sending message' });
  }
};

export { createContact };
